<?php namespace App\Http\Controllers;

use App\Division;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class DivisionController extends Controller
{
    const MODEL = 'App\Division';

    const PAGED_WITH = ['image', 'blogs', 'projects'];

    use RESTActions;
    use Pageable;

    /**
     * Display the divisions in a format consumable
     * by HTMLOptionElements
     *
     * @return Response
     */
    public function options(Request $request)
    {
        $list = Division::select('id', 'name')->get()->map(function ($division) {
            return ['label' => $division->name, 'value' => $division->id];
        });
        return $this->respond('done', $list);
    }

    /**
     * Get a division
     *
     * @return Response
     */
    public function get($id)
    {
        $m = self::MODEL;
        $model = $m::with('blogs', 'projects', 'image')->find($id);
        if (is_null($model)) {
            return $this->respond('not_found');
        }
        return $this->respond('done', $model);
    }

    /**
     * Paged
     *
     * @param  Request
     * @return Response
     */
    public function paged(Request $request)
    {
        $m = self::MODEL;

        $created_at = 0;

        $current_page = $request->input('current_page', 1) - 1;
        $length = $request->input('length', 15);
        $order_by = $request->input('order_by', 'name');
        $descending = $request->input('descending', 'false') === 'true';

        if (self::PAGED_WITH !== null) {
            $models = forward_static_call_array(array($m, 'with'), self::PAGED_WITH);
            $models = $models->get();
        } else {
            $models = $m::all();
        }

        $models = $models->sortBy(function ($model) use ($order_by) {
            switch ($order_by) {
                case 'updated_at':
                case 'created_at':
                    return \Carbon\Carbon::parse($model->{$order_by})->timestamp;
                    break;
                default:
                    return $model->{$order_by};
            }
        }, SORT_REGULAR, $descending);

        $count = $models->count();

        $paged = $models->slice($current_page * $length, $length)->all();
        $paginator = new Paginator($paged, $count, $length);
        //$paginator = Paginator::make($paged, $count, $length);

        $json = $paginator->toArray();
        $json['current_page'] = $current_page + 1;
        $json['from'] = $current_page * $length;
        $json['to'] = ($json['from']) + $length;

        if ($count !== 0 && $json['from'] === 0) {
            $json['from'] = 1;
        }

        $json['data'] = array_values($json['data']);
        foreach ($json['data'] as &$item) {
            $item['blogs'] = count($item['blogs']);
            $item['projects'] = count($item['projects']);
        }

        return $this->respond('done', $json);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @param Request $request
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $destination = path_join(['app', 'public', 'images', 'divisions']);

        $division = Division::findOrFail($id);

        $collect = ['name', 'description'];
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $division->{$attribute} = $request->get($attribute);
            }
        }

        if ($request->has('image') && $request->get('image') === '__deleted') {
            $division->image()->dissociate();
        } elseif ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();

            $image = Image::createFromUpload($file, $destination, $filename);

            $division->image()->associate($image);
        }

        $division->save();

        return $this->get($id);
    }
}
