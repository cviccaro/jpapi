<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Client;
use App\Image;
use Illuminate\Http\Request;

use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class ClientController extends Controller
{
    const MODEL = "App\Client";

    use RESTActions;

    /**
     * Display the clients in a format consumable
     * by HTMLOptionElements
     *
     * @return Response
     */
    public function options(Request $request)
    {
        $list = Client::select('id', 'name')->get()->map(function($client) {
            return ['label' => $client->name, 'value' => $client->id];
        });
        return $this->respond('done', $list);
    }

    public function featured(Request $request)
    {
        $models = Client::where('featured', true)->get();

        return $this->respond('done', $models);
    }

    /**
     * Paged
     *
     * @param  Request
     * @return Response
     */
    public function paged(Request $request)
    {
        $created_at = 0;

        $current_page = $request->input('current_page', 1) - 1;
        $length = $request->input('length', 50);
        $order_by = $request->input('order_by', 'name');
        $descending = $request->input('descending', 'false') === 'true';

        $models = Client::with('image', 'projects')->get();

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
        $data = [];
        foreach ($json['data'] as $datum) {
            $data[] = $datum;
        }
        $json['data'] = $data;

        return $this->respond('done', $json);
    }

    /**
     * Create a new client
     *
     * @return Response
     */
    public function store(Request $request)
    {
        \Log::info('Received request to create client: ' . print_r($request->toArray(), true));

        $destination = path_join(['app', 'public', 'images', 'clients']);

        $client = new Client();

        $collect = ['name', 'alias', 'description', 'featured'];
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $client->{$attribute} = $request->get($attribute);
            }
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();

            $image = Image::createFromUpload($file, $destination, $filename);

            $client->image()->associate($image);
        }

        $client->save();

        return $this->get($client->id);
    }

    /**
     * Update a client
     *
     * @return Response
     */
    public function update(Request $request, $id)
    {
        \Log::info('Received request to update client ' . $id . ' ' . print_r($request->toArray(), true));

        $destination = path_join(['app', 'public', 'images', 'clients']);

        $client = Client::findOrFail($id);

        $collect = ['name', 'alias', 'description', 'featured'];
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $client->{$attribute} = $request->get($attribute);
            }
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();

            $image = Image::createFromUpload($file, $destination, $filename);

            $client->image()->associate($image);
        } elseif ($request->has('image_remove') && $request->get('image_remove') === 'true') {
            $client->image()->dissociate();
        }

        $client->save();

        return $this->get($client->id);
    }

    /**
     * Destroy a client
     *
     * @return Response
     */
}
