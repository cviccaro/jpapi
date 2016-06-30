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

    private $uploads_destination = 'app/public/images/work';

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
        $json['to'] = $length > $count ? $count : ($json['from'] + $length);

        if ($count !== 0 && $json['from'] === 0) {
            $json['from'] = 1;
        }
        $json['data'] = array_values($json['data']);
        return $this->respond('done', $json);
    }

    public function update(Request $request, $id)
    {
        \Log::info('Received request to update work : ' . print_r($request->toArray(), true));

        $m = self::MODEL;

        $model = $m::find($id);

        if (!$model) abort(400);

        $uploads_destination = $this->uploads_destination;
        $destination =storage_path($uploads_destination);

        $data = $request->except(['image', 'uri', 'id', 'created_at', 'updated_at']);

        if ($request->has('client')) {
            $data['client'] = intval($request->get('client'));
        }

        if ($request->hasFile('image_new')) {
            $files = $request->file('image_new');
            \Log::info('REQUEST --- IMAGE_NEW: ' . print_r($files, true));

            $destination = storage_path($uploads_destination);
            $i = 0;
            foreach ($files as $file) {
                $mimetype = $file->getMimeType();
                $size = $file->getSize();
                $tempName = basename($file->__toString());
                $original_name = $file->getClientOriginalName();
                $extension = $file->guessExtension();

                $candidate_filename = Image::availableFilename($original_name, $destination);

                $file->move($destination, $candidate_filename);

                $image = Image::create([
                    'path' => $uploads_destination,
                    'name' => $candidate_filename,
                    'alias' => $original_name,
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                ]);

                $data['image'] = $image->id;

                \Log::info('COVER Image created at ' . $destination . '/' . $candidate_filename . ' with data : ' . print_r([
                    'path' => $uploads_destination,
                    'name' => $candidate_filename,
                    'alias' => $original_name,
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                ], true));
            }
        }

        unset($data['gallery']);

        $should_delete = 0;
        $deleted = 0;

        $added = 0;
        if ($request->hasFile('gallery_new')) {
            $files = $request->file('gallery_new');
            \Log::info('REQUEST --- GALLERY_NEW: ' . print_r($files, true));

            $i = 0;

            $gallery = $request->get('gallery');

            foreach ($files as $k => $file) {
                // @todo: autogenerate waight from order of filelist?
                $weight = $gallery[$i]['weight'];

                \Log::info('File ' . $k . ' Weight ' . $weight);

                $mimetype = $file->getMimeType();
                $size = $file->getSize();
                $tempName = basename($file->__toString());
                $original_name = $file->getClientOriginalName();
                $extension = $file->guessExtension();

                $candidate_filename = Image::availableFilename($original_name, $destination);

                $file->move($destination, $candidate_filename);

                $image = Image::create([
                    'path' => $uploads_destination,
                    'name' => $candidate_filename,
                    'alias' => $original_name,
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                ]);

                \Log::info('GALLERY Image created at ' . $destination . '/' . $candidate_filename . ' with data : ' . print_r([
                    'path' => $uploads_destination,
                    'name' => $candidate_filename,
                    'alias' => $original_name,
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                ], true));

                $workimage = WorkImage::create([
                    'image_id' => $image->id,
                    'work_id' => $model->id,
                    'weight' => $weight
                ]);

                \Log::info('Added WorkImage with weight ' . $weight .' as ID ' . $workimage->id . ' on Work ' . $model->id . ' with Image ' . $image->id);
                $added++;

                $i++;
            }
        }

        $model->update($data);

        \Log::info('Updated work model with ID ' . $model->id . '.  Deleted ' . $deleted . ' (Should have deleted ' . $should_delete . ') images from gallery.  Added ' . $added . ' images to gallery.');
        return $this->respond('done', $m::find($id));
       
    }

    public function create(Request $request)
    {
        \Log::info('Received request to create work : ' . print_r($request->toArray(), true));
        $m = self::MODEL;

        $uploads_destination = $this->uploads_destination;
        $destination =storage_path($uploads_destination);

        $data = $request->all();

        if ($request->has('client')) {
            $data['client'] = intval($request->get('client'));
        }

        if ($request->hasFile('image_new')) {
            $files = $request->file('image_new');
            \Log::info('REQUEST --- IMAGE_NEW: ' . print_r($files, true));

            $destination = storage_path($uploads_destination);
            $i = 0;
            foreach ($files as $file) {
                $mimetype = $file->getMimeType();
                $size = $file->getSize();
                $tempName = basename($file->__toString());
                $original_name = $file->getClientOriginalName();
                $extension = $file->guessExtension();

                $candidate_filename = Image::availableFilename($original_name, $destination);

                $file->move($destination, $candidate_filename);

                $image = Image::create([
                    'path' => $uploads_destination,
                    'name' => $candidate_filename,
                    'alias' => $original_name,
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                ]);

                $data['image'] = $image->id;

                \Log::info('COVER Image created at ' . $destination . '/' . $candidate_filename . ' with data : ' . print_r([
                    'path' => $uploads_destination,
                    'name' => $candidate_filename,
                    'alias' => $original_name,
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                ], true));
            }
        }

        // $gallery = [];
        // if ($request->has('gallery')) {
        //     $gallery = array_reduce($data['gallery'], function ($carry, $item) {
        //         $carry[] = $item['id'];
        //         return $carry;
        //     }, []);
        // }
        \Log::info('Committing new work item with form data: ' . print_r($data, true));
        $model = $m::create($data);

        $added = 0;
        if ($request->hasFile('gallery_new')) {
            $files = $request->file('gallery_new');
            \Log::info('REQUEST --- GALLERY_NEW: ' . print_r($files, true));

            $i = 0;

            $gallery = $request->get('gallery');

            foreach ($files as $k => $file) {

                // @todo: autogenerate waight from order of filelist?
                //
                $weight = $gallery[$i]['weight'];
                \Log::info('File ' . $k . ' Weight ' . $weight);

                $mimetype = $file->getMimeType();
                $size = $file->getSize();
                $tempName = basename($file->__toString());
                $original_name = $file->getClientOriginalName();
                $extension = $file->guessExtension();

                $candidate_filename = Image::availableFilename($original_name, $destination);

                $file->move($destination, $candidate_filename);

                $image = Image::create([
                    'path' => $uploads_destination,
                    'name' => $candidate_filename,
                    'alias' => $original_name,
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                ]);

                \Log::info('GALLERY Image created at ' . $destination . '/' . $candidate_filename . ' with data : ' . print_r([
                    'path' => $uploads_destination,
                    'name' => $candidate_filename,
                    'alias' => $original_name,
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                ], true));

                $workimage = WorkImage::create([
                    'image_id' => $image->id,
                    'work_id' => $model->id,
                    'weight' => $weight
                ]);

                \Log::info('Added WorkImage with weight ' . $weight .' as ID ' . $workimage->id . ' on Work ' . $model->id . ' with Image ' . $image->id);
                $added++;

                $i++;
            }
        }

        \Log::info('Created work model with ID ' . $model->id . '.  Added ' . $added . ' images to gallery.');

        return $this->respond('done', $model);
    }
}
