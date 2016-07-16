<?php namespace App\Http\Controllers;

use App\Client;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Image;
use App\Project;
use App\Division;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class ProjectController extends Controller
{
    const MODEL = "App\Project";

    use RESTActions;

    /**
     * All
     *
     * @param  Request
     * @return Response
     */
    public function all(Request $request)
    {
        $take = $request->input('take', 99999);
        $skip = $request->input('skip', 0);
        $count = Project::count();
        $projects = Project::with('client', 'divisions', 'image', 'images', 'tags')->orderBy('created_at', 'desc')->take($take)->skip($skip)->get();
        return $this->respond('done', [
            'projects' => $projects,
            'remaining' => max(0, $count - $take - $skip),
        ]);
    }

    /**
     * Create a new project
     *
     * @return Response
     */
    public function store(Request $request)
    {
        \Log::info('Received request to create work');

        $destination = path_join(['app', 'public', 'images', 'projects']);

        $project = new Project();

        $files = $request->allFiles();
        $collect = ['title', 'description'];
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $project->{$attribute} = $request->get($attribute);
            }
        }

        if ($request->has('client_id')) {
            $client = Client::findOrFail($request->get('client_id'));

            $project->client()->associate($client);
        }

        if ($request->has('image') && isset($files['image']['_file'])) {
            $managedFile = $request->get('image');
            $file = $files['image']['_file'];

            $image = Image::createFromUpload($file, $destination, $managedFile);
            $project->image()->associate($image);
        }

        $project->save();

        if ($request->has('images')) {
            $images = $request->get('images');

            \Log::info('Saving new gallery images.');

            foreach ($images as $idx => $image) {
                \Log::info('Processing gallery image ' . $idx);

                if (isset($files['images'][$idx])) {
                    $managedFile = $files['images'][$idx];
                    $file = $managedFile['_file'];

                    unset($managedFile['_file']);

                    $image = Image::createFromUpload($file, $destination, $managedFile);

                    \Log::info('Saving new image to gallery with weight ' . ($idx * 5));
                    $project->images()->save($image, ['weight' => $idx * 5]);
                }
            }

            \Log::info('Saved new gallery images.');
        }

        if ($request->has('divisions')) {
            \Log::info('Saving new project divisions');

            $divisions = $request->get('divisions');

            foreach ($divisions as $idx => $division) {
                if (isset($division['id'])) {
                    \Log::info('Saving new project with division ' . $division['id'] . ' with weight ' . ($idx * 5));
                    $project->divisions()->save(Division::find($division['id']), ['weight' => $idx * 5]);
                }
            }
        }

        return $this->get($project->id);

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
        \Log::info('Received request to update work ' . $id);

        $destination = path_join(['app', 'public', 'images', 'projects']);

        $project = Project::findOrFail($id);

        $files = $request->allFiles();
        $collect = ['title', 'description'];
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $project->{$attribute} = $request->get($attribute);
            }
        }

        if ($request->has('client_id')) {
            $client = Client::findOrFail($request->get('client_id'));

            $project->client()->associate($client);
        }

        if ($request->get('image') === '') {
            $project->image()->dissociate();
        } elseif ($request->has('image')) {
            $managedFile = $request->get('image');
            if (isset($files['image']['_file'])) {
                $file = $files['image']['_file'];

                $image = Image::createFromUpload($file, $destination, $managedFile);
                $project->image()->associate($image);
            } else {
                Image::find($project->image->id)->update($managedFile);
            }
        }

        if ($request->has('images')) {
            $images = $request->get('images');

            $ids_clean = $project->images->map(function($img) { return $img->id; })->toArray();
            $ids_dirty = [];

            foreach ($images as $idx => $image) {

                \Log::info('Processing gallery image ' . $idx);
                if (isset($image['id'])) {
                    $ids_dirty[] = $image['id'];
                }

                if (isset($files['images'][$idx])) {
                    $managedFile = $files['images'][$idx];
                    $file = $managedFile['_file'];

                    unset($managedFile['_file']);

                    $image = Image::createFromUpload($file, $destination, $managedFile);

                    \Log::info('Saving new image to gallery with weight ' . ($idx * 5));
                    $project->images()->save($image, ['weight' => $idx * 5]);
                } else {
                    \Log::info('Updating image ' . $image['id'] . ' to weight ' . ($idx * 5));
                    $project->images()->updateExistingPivot($image['id'], ['weight' => $idx * 5]);
                }
            }

            \Log::info('Updated gallery images.');

            foreach ($ids_clean as $clean_id) {
                if (!in_array($clean_id, $ids_dirty)) {
                    \Log::info('Detaching image ' . $clean_id . ' from project ' . $id);
                    $project->images()->detach($clean_id);
                }
            }
        }

        if ($request->has('divisions')) {
            $ids_clean = $project->divisions->map(function($div) { return $div->id; })->toArray();
            $ids_dirty = [];

            \Log::info('Saving updated project divisions');

            $divisions = $request->get('divisions');

            foreach ($divisions as $idx => $division) {
                if (isset($division['id'])) {
                    \Log::info('Updating division ' . $division['id'] . ' to weight ' . ($idx * 5));
                    $ids_dirty[] = $division['id'];

                    if (in_array($division['id'], $ids_clean)) {
                        $project->divisions()->updateExistingPivot($division['id'], ['weight' => $idx * 5]);
                    } else {
                        $project->divisions()->save(Division::find($division['id']), ['weight' => $idx * 5]);
                    }
                }
            }

            foreach ($ids_clean as $clean_id) {
                if (!in_array($clean_id, $ids_dirty)) {
                    \Log::info('Detaching division ' . $clean_id . ' from project ' . $id);
                    $project->divisions()->detach($clean_id);
                }
            }
        }

        $project->save();

        return $this->get($id);
    }

    /**
     * Get a single Project
     *
     * @param  $id integer
     * @return Response
     */
    public function get($id)
    {
        $project = Project::with('client', 'divisions', 'image', 'images', 'tags')->find($id);

        if (is_null($project)) {
            return $this->respond('not_found');
        }

        $json = $project->toArray();
        $json['images'] = $project->sortPivot('images')->values()->toArray();

        return $this->respond('done', $json);
    }

    /**
     * Get From Slug
     *
     * @param  $slug string
     * @return Response
     */
    public function getFromSlug($slug)
    {
        $projects = Project::select('id', 'title')->get()->filter(function ($project) use ($slug) {
            return $project->uri === $slug;
        });

        if ($projects->isEmpty()) abort(404);

        return $this->get($projects->first()->id);
    }


    /**
     * Paged
     *
     * @param  Request
     * @return Response
     */
    public function paged(Request $request)
    {
        $current_page = $request->input('current_page', 1) - 1;
        $length = $request->input('length', 15);
        $order_by = $request->input('order_by', 'updated_at');
        $descending = $request->input('descending', 'true') === 'true';

        $projects = Project::with('client', 'divisions', 'image', 'images', 'tags')->get();

        $projects = $projects->sortBy(function ($project) use ($order_by) {
            switch ($order_by) {
                case 'updated_at':
                case 'created_at':
                    return \Carbon\Carbon::parse($project->{$order_by})->timestamp;
                    break;
                default:
                    return $project->{$order_by};
            }
        }, SORT_REGULAR, $descending);

        $count = $projects->count();

        $paged = $projects->slice($current_page * $length, $length)->all();
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

    /**
     * Recent
     *
     * @param  Request
     * @return Response
     */
    public function recent(Request $request)
    {
        $take = $request->input('take', 3);
        $skip = $request->input('skip', 0);

        $projects = Project::with('client', 'divisions', 'image', 'images', 'tags')->orderBy('created_at', 'desc');
        $count = Project::count();
        if ($request->has('division')) {
            $division = Division::where('name', $request->input('division'))->first();
            $projects = $projects->whereHas('divisions', function ($query) use ($division) {
                $query->where('name', $division->name);
            });
            $count = $projects->count();
        }
        $projects = $projects
            ->take($take)
            ->skip($skip)
            ->get();

        return $this->respond('done', [
            'projects' => $projects,
            'remaining' => max(0, $count - $take - $skip),
            'total' => $count
        ]);
    }
}
