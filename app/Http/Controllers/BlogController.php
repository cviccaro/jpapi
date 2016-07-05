<?php namespace App\Http\Controllers;

use App\Blog;
use App\Division;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Image;
use App\Tag;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class BlogController extends Controller
{
    use RESTActions;

    /**
     * Create a new blog
     *
     * @return Response
     */
    public function store(Request $request)
    {
        \Log::info('Received request to create blog: ' . print_r($request->toArray(), true));

        $destination = path_join(['app', 'public', 'images', 'blogs']);

        $blog = new Blog();

        $collect = ['title', 'summary', 'body', 'author'];
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $blog->{$attribute} = $request->get($attribute);
            }
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();

            $image = Image::createFromUpload($file, $destination, $filename);

            $blog->image()->associate($image);
        }

        $blog->save();

        // if ($request->has('images')) {
        //  $images = $request->get('images');
        //  $files = $request->allFiles();

        //  \Log::info('Saving new gallery images.');

        //  foreach($images as $idx => $image) {
        //      \Log::info('Processing gallery image ' . print_r($image, true));

        //      if (isset($files['images'][$idx])) {
        //          $file = $files['images'][$idx]['_file'];
        //          $filename = $file->getClientOriginalName();
        //          $image = Image::createFromUpload($file, $destination, $filename);

        //          \Log::info('Saving new image to gallery with weight ' . ($idx * 5));
        //          $project->images()->save($image, ['weight' => $idx * 5]);
        //      }
        //  }

        //  \Log::info('Saved new gallery images.');
        // }

        return $this->get($blog->id);

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
        \Log::info('Received request to update blog ' . $id . ': ' . print_r($request->toArray(), true));


        $destination = path_join(['app', 'public', 'images', 'blogs']);

        $blog = Blog::findOrFail($id);

        $collect = ['title', 'summary', 'body', 'author'];
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $blog->{$attribute} = $request->get($attribute);
            }
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();

            $image = Image::createFromUpload($file, $destination, $filename);

            $blog->image()->associate($image);
        }

        if ($request->has('tags')) {
            $ids_clean = $blog->tags->map(function($tag) { return $tag->id; })->toArray();
            $ids_dirty = [];

            \Log::info('Saving updated blog tags vs clean IDs ' . implode(', ', $ids_clean));

            $tags = $request->get('tags');

            foreach ($tags as $idx => $tag) {
                if (isset($tag['id'])) {
                    \Log::info('Updating tag ' . $tag['id'] . ' to weight ' . ($idx * 5));
                    $ids_dirty[] = $tag['id'];

                    if (in_array($tag['id'], $ids_clean)) {
                        $blog->tags()->updateExistingPivot($tag['id'], ['weight' => $idx * 5]);
                    } else {
                        $blog->tags()->save(Tag::find($tag['id']), ['weight' => $idx * 5]);
                    }
                }
            }

            \Log::info('Updated blog tags. Dirty IDs: ' . implode(', ', $ids_dirty));

            foreach ($ids_clean as $clean_id) {
                if (!in_array($clean_id, $ids_dirty)) {
                    \Log::info('Detaching tag ' . $clean_id . ' from blog ' . $id);
                    $blog->tags()->detach($clean_id);
                }
            }
        }

        if ($request->has('divisions')) {
            $ids_clean = $blog->divisions->map(function($div) { return $div->id; })->toArray();
            $ids_dirty = [];

            \Log::info('Saving updated blog divisions vs clean divisions ' . implode(', ', $ids_clean));

            $divisions = $request->get('divisions');

            foreach ($divisions as $idx => $division) {
                if (isset($division['id'])) {
                    \Log::info('Updating division ' . $division['id'] . ' to weight ' . ($idx * 5));
                    $ids_dirty[] = $division['id'];

                    if (in_array($division['id'], $ids_clean)) {
                        $blog->divisions()->updateExistingPivot($division['id'], ['weight' => $idx * 5]);
                    } else {
                        $blog->divisions()->save(Division::find($division['id']), ['weight' => $idx * 5]);
                    }
                }
            }

            \Log::info('Updated blog divisions. Dirty IDs: ' . implode(', ', $ids_dirty));

            foreach ($ids_clean as $clean_id) {
                if (!in_array($clean_id, $ids_dirty)) {
                    \Log::info('Detaching division ' . $clean_id . ' from blog ' . $id);
                    $blog->divisions()->detach($clean_id);
                }
            }
        }

        $blog->save();

        return $this->get($id);

        // if ($request->has('images')) {
        //  $images = $request->get('images');
        //  $files = $request->allFiles();

        //  $ids_clean = $project->images->map(function($img) { return $img->id; })->toArray();
        //  $ids_dirty = [];

        //  \Log::info('Updating gallery images.  Clean IDs: ' . implode(', ', $ids_clean));

        //  foreach($images as $idx => $image) {

        //      \Log::info('Processing gallery image ' . print_r($image, true));
        //      if (isset($image['id'])) {
        //          $ids_dirty[] = $image['id'];
        //      }

        //      if (isset($files['images'][$idx])) {
        //          $file = $files['images'][$idx]['_file'];
        //          $filename = $file->getClientOriginalName();
        //          $image = Image::createFromUpload($file, $destination, $filename);

        //          \Log::info('Saving new image to gallery with weight ' . ($idx * 5));
        //          $project->images()->save($image, ['weight' => $idx * 5]);
        //      } else {
        //          \Log::info('Updating image ' . $image['id'] . ' to weight ' . ($idx * 5));
        //          $project->images()->updateExistingPivot($image['id'], ['weight' => $idx * 5]);
        //      }
        //  }

        //  \Log::info('Updated gallery images.  Dirty IDs: ' . implode(', ', $ids_dirty));

        //  foreach($ids_clean as $clean_id) {
        //      if (!in_array($clean_id, $ids_dirty)) {
        //          \Log::info('Detaching image ' . $clean_id . ' from project ' . $id);
        //          $project->images()->detach($clean_id);
        //      }
        //  }
        // }

        $blog->save();

        return $this->get($id);
    }

    /**
     * Get a single blog
     *
     * @param $id [integer]
     * @return Response
     */
    public function get($id) {
        $blog = Blog::with('divisions', 'image', 'images', 'tags')->find($id);

        if(is_null($blog)){
            return $this->respond('not_found');
        }

        $json = $blog->toArray();
        $json['images'] = $blog->sortPivot('images')->values()->toArray();
        $json['tags'] = $blog->sortPivot('tags')->values()->toArray();
        $json['divisions'] = $blog->sortPivot('divisions')->values()->toArray();

        return $this->respond('done', $json);
    }
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
        $blog_count = Blog::all()->count();
        $blogs = Blog::orderBy('created_at', 'desc')->take($take)->skip($skip)->get();
        return $this->respond('done', [
            'blogs' => $blogs,
            'remaining' => max(0, $blog_count - $take - $skip),
        ]);
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
        $length = $request->input('length', 15);
        $order_by = $request->input('order_by', 'updated_at');
        $descending = $request->input('descending', 'true') === 'true';

        $blogs = Blog::with('divisions', 'image', 'images', 'tags')->get();

        $blogs = $blogs->sortBy(function ($blog) use ($order_by) {
            switch ($order_by) {
                case 'updated_at':
                case 'created_at':
                    return \Carbon\Carbon::parse($blog->{$order_by})->timestamp;
                    break;
                default:
                    return $blog->{$order_by};
            }
        }, SORT_REGULAR, $descending);

        $count = $blogs->count();

        $paged = $blogs->slice($current_page * $length, $length)->all();
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
     * Recent
     *
     * @param  Request
     * @return Response
     */
    public function recent(Request $request)
    {
        $take = $request->input('take', 3);
        $skip = $request->input('skip', 0);

        $blogs = Blog::orderBy('created_at', 'desc');
        $blog_count = Blog::all()->count();
        if ($request->has('site')) {
            $site = Site::where('name', $request->input('site'))->first();
            $blogs = $blogs->where('site', $site->id);
            $blog_count = Blog::all()->where('site', $site->name)->count();
        }
        $blogs = $blogs
            ->take($take)
            ->skip($skip)
            ->get();

        return $this->respond('done', [
            'blogs' => $blogs,
            'remaining' => max(0, $blog_count - $take - $skip),
        ]);
    }

}
