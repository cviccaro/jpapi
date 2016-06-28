<?php

namespace App\Http\Controllers;

use App\Image;
use App\Work;
use App\WorkImage;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class WorkController extends Controller
{

    const MODEL = "App\Work";

    use RESTActions;

    public function recent(Request $request)
    {
        $m = self::MODEL;

        $skip = $request->input('skip', 0);

        $count = $m::all()->count();

        $work = $m::orderBy('created_at', 'desc')->take(6)->skip($skip)->get();

        return $this->respond('done', [
            'work' => $work,
            'remaining' => max(0, $count - 6 - $skip),
            'total' => $count,
        ]);
    }

    public function getFromUri(Request $request, $string)
    {
        $m = self::MODEL;

        $model = $m::where('uri', $string)->first();
        if (is_null($model)) {
            return $this->respond('not_found');
        }
        return $this->respond('done', $model);
    }

    public function paged(Request $request)
    {
        $created_at = 0;

        $current_page = $request->input('current_page', 1) - 1;
        $length = $request->input('length', 15);
        $order_by = $request->input('order_by', 'updated_at');
        $descending = $request->input('descending', 'true') === 'true';

        $work = Work::where('created_at', '>', $created_at)
            ->get();

        $work = $work->sortBy(function ($work) use ($order_by) {
            switch ($order_by) {
                case 'updated_at':
                case 'created_at':
                    return \Carbon\Carbon::parse($work->{$order_by})->timestamp;
                    break;
                default:
                    return $work->{$order_by};
            }
        }, SORT_REGULAR, $descending);

        $count = $work->count();

        $paged = $work->slice($current_page * $length, $length)->all();
        $paginator = new Paginator($paged, $count, $length);
        //$paginator = Paginator::make($paged, $count, $length);

        $json = $paginator->toArray();
        $json['current_page'] = $current_page + 1;
        $json['from'] = $current_page * $length;
        $json['to'] = ($json['from']) + $length;

        if ($count !== 0 && $json['from'] === 0) {
            $json['from'] = 1;
        }
        $data = [];
        foreach ($json['data'] as $datum) {
            $data[] = $datum;
        }
        $json['data'] = $data;

        return $this->respond('done', $json);
    }

    public function put(Request $request, $id)
    {
        $m = self::MODEL;
        $this->validate($request, $m::$rules);
        $model = $m::find($id);
        if (is_null($model)) {
            return $this->respond('not_found');
        }

        $data = $request->all();

        $current_gallery_ids = \App\Work::find(18)->gallery->pluck('id')->toArray();

        if ($request->has('client')) {
            $client_id = intval($request->get('client')['id']);
            $data['client'] = $client_id;
        }

        if ($request->has('image_new')) {
            $imageNew = $request->input('image_new');
            $base64_string = $imageNew['base64'];
            $filename = $imageNew['name'];
            if ($image = Image::createFromBase64($filename, $base64_string)) {
                $data['image'] = $image->id;
                unset($data['image_new']);
            }
        } else {
            unset($data['image']);
        }

        if ($request->has('gallery')) {
            // Reduce gallery in request to list of ids
            $gallery = array_reduce($data['gallery'], function ($carry, $item) {
                if ($item['id'] !== 'new') {
                    $carry[] = $item['id'];
                }
                return $carry;
            }, []);
                     
            $to_delete = array_filter($current_gallery_ids, function ($id) use ($gallery) {
                return !in_array($id, $gallery);
            });

            if ($to_delete) {
                WorkImage::whereIn('id', $to_delete)->delete();
            }
            // $gallery = array_reduce($data['gallery'], function ($carry, $item) {
            //     if (!isset($item['isNew']) || $item['isNew'] !== true) {
            //         $carry[] = $item['id'];
            //     } else if (in_array($item['id'], $current_gallery_ids)) {

            //     }
            //     return $carry;
            // }, []);
            // $data['gallery'] = $gallery;
        }

        if ($request->has('gallery_new')) {
            $gallery_new = $request->get('gallery_new');
            foreach ($gallery_new as $file) {
                \Log::info('Adding gallery new item: ' . $file['name']);
                $base64_string = $file['image_url'];
                $filename = $file['name'];
                if ($image = Image::createFromBase64($filename, $base64_string)) {
                    WorkImage::create(['work_id' => $id, 'image_id' => $image->id]);
                    \Log::info('Created new image at ID ' . $image->id . ' and added to gallery.');
                } else {
                    \Log::info('Image creation failed.');
                }
            }
        }

        $model->update($data);
        return $this->respond('done', $m::find($id));
    }

    public function create(Request $request)
    {
        
        $m = self::MODEL;
        // $this->validate($request, $m::$rules);

        $data = $request->all();

        if ($request->has('client')) {
            $client_id = intval($request->get('client')['id']);
            $data['client'] = $client_id;
        }

        if ($request->has('image_new')) {
            $imageNew = $request->input('image_new');
            $base64_string = $imageNew['base64'];
            $filename = $imageNew['name'];
            if ($image = Image::createFromBase64($filename, $base64_string)) {
                $data['image'] = $image->id;
                unset($data['image_new']);
            }
        } else {
            unset($data['image']);
        }

        // $gallery = [];
        // if ($request->has('gallery')) {
        //     $gallery = array_reduce($data['gallery'], function ($carry, $item) {
        //         $carry[] = $item['id'];
        //         return $carry;
        //     }, []);
        // }

        $model = $m::create($data);

        if ($request->has('gallery_new')) {
            $gallery_new = $request->get('gallery_new');
            foreach ($gallery_new as $file) {
                \Log::info('Adding gallery new item: ' . $file['name']);
                $base64_string = $file['base64'];
                $filename = $file['name'];
                if ($image = Image::createFromBase64($filename, $base64_string)) {
                    WorkImage::create(['work_id' => $id, 'image_id' => $image->id]);
                    \Log::info('Created new image at ID ' . $image->id . ' and added to gallery.');
                } else {
                    \Log::info('Image creation failed.');
                }
            }
        }

        return $this->respond('done', $model);
    }
}
