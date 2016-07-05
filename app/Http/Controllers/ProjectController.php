<?php namespace App\Http\Controllers;

use App\Client;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Image;
use App\Project;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class ProjectController extends Controller {

	const MODEL = "App\Project";

	use RESTActions;

	/**
	 * Create a new project
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		\Log::info('Received request to create work: ' . print_r($request->toArray(), true));

		$destination = path_join(['app', 'public', 'images', 'projects']);

		$project = new Project();

		if ($request->has('title')) {
			$project->title = $request->get('title');
		}
		if ($request->has('description')) {
			$project->description = $request->get('description');
		}

		if ($request->has('client_id')) {
			$client = Client::findOrFail($request->get('client_id'));

			$project->client()->associate($client);
		}

		if ($request->hasFile('image')) {
			$file = $request->file('image');
			$filename = $file->getClientOriginalName();

			$image = Image::createFromUpload($file, $destination, $filename);

			$project->image()->associate($image);
		}

		$project->save();

		if ($request->has('images')) {
			$images = $request->get('images');
			$files = $request->allFiles();

			\Log::info('Saving new gallery images.');

			foreach($images as $idx => $image) {
				\Log::info('Processing gallery image ' . print_r($image, true));

				if (isset($files['images'][$idx])) {
					$file = $files['images'][$idx]['_file'];
					$filename = $file->getClientOriginalName();
					$image = Image::createFromUpload($file, $destination, $filename);

					\Log::info('Saving new image to gallery with weight ' . ($idx * 5));
					$project->images()->save($image, ['weight' => $idx * 5]);
				}
			}

			\Log::info('Saved new gallery images.');
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
		\Log::info('Received request to update work ' . $id . ': ' . print_r($request->toArray(), true));

		$destination = path_join(['app', 'public', 'images', 'projects']);

		$project = Project::findOrFail($id);

		if ($request->has('title')) {
			$project->title = $request->get('title');
		}
		if ($request->has('description')) {
			$project->description = $request->get('description');
		}

		if ($request->has('client_id')) {
			$client = Client::findOrFail($request->get('client_id'));

			$project->client()->associate($client);
		}

		if ($request->hasFile('image')) {
			$file = $request->file('image');
			$filename = $file->getClientOriginalName();

			$image = Image::createFromUpload($file, $destination, $filename);

			$project->image()->associate($image);
		}

		if ($request->has('images')) {
			$images = $request->get('images');
			$files = $request->allFiles();

			$ids_clean = $project->images->map(function($img) { return $img->id; })->toArray();
			$ids_dirty = [];

			\Log::info('Updating gallery images.  Clean IDs: ' . implode(', ', $ids_clean));

			foreach($images as $idx => $image) {

				\Log::info('Processing gallery image ' . print_r($image, true));
				if (isset($image['id'])) {
					$ids_dirty[] = $image['id'];
				}

				if (isset($files['images'][$idx])) {
					$file = $files['images'][$idx]['_file'];
					$filename = $file->getClientOriginalName();
					$image = Image::createFromUpload($file, $destination, $filename);

					\Log::info('Saving new image to gallery with weight ' . ($idx * 5));
					$project->images()->save($image, ['weight' => $idx * 5]);
				} else {
					\Log::info('Updating image ' . $image['id'] . ' to weight ' . ($idx * 5));
					$project->images()->updateExistingPivot($image['id'], ['weight' => $idx * 5]);
				}
			}

			\Log::info('Updated gallery images.  Dirty IDs: ' . implode(', ', $ids_dirty));

			foreach($ids_clean as $clean_id) {
				if (!in_array($clean_id, $ids_dirty)) {
					\Log::info('Detaching image ' . $clean_id . ' from project ' . $id);
					$project->images()->detach($clean_id);
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
	public function get($id) {
		$project = Project::with('client', 'divisions', 'image', 'images', 'tags')->find($id);

		if(is_null($project)){
			return $this->respond('not_found');
		}

		$json = $project->toArray();
		$json['images'] = $project->sortImages()->values()->toArray();

		return $this->respond('done', $json);
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
}
