<?php namespace App\Http\Controllers;

use App\Blog;
use App\Division;
use App\Image;
use App\Tag;
use App\Staff;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class BlogController extends Controller
{
    use RESTActions;

    const MODEL = 'App\Blog';

    /**
     * All
     */
    public function all(Request $request)
    {
        $take = $request->input('take', 99999);
        $skip = $request->input('skip', 0);
        $count = Blog::count();
        $blogs = Blog::with('divisions', 'image', 'images', 'tags', 'splash')->orderBy('created_at', 'desc')->take($take)->skip($skip)->get();
        return $this->respond('done', [
            'blogs' => $blogs,
            'remaining' => max(0, $count - $take - $skip),
        ]);
    }

    /**
     * Create a new blog
     */
    public function store(Request $request)
    {
        \Log::info('Received request to create blog');

        $destination = path_join(['app', 'public', 'images', 'blogs']);

        $blog = new Blog();

        $collect = ['title', 'summary', 'body'];
        $files = $request->allFiles();
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $blog->{$attribute} = $request->get($attribute);
            }
        }

        $blog->save();

        if ($request->has('author_id')) {
            $author = Staff::find($request->get('author_id'));

            if ($author) {
                $blog->author()->associate($author);
            }
        }

        $images = ['image', 'splash'];

        foreach($images as $image_key) {
            if ($request->has($image_key) && isset($files[$image_key]['_file'])) {
                $managedFile = $request->get($image_key);
                $file = $files[$image_key]['_file'];

                $image = Image::createFromUpload($file, $destination, $managedFile);
                $blog->{$image_key}()->associate($image);
            }
        }

        if ($request->has('tags')) {
            \Log::info('Saving new blog tags and divisions');

            $tags = $request->get('tags');

            foreach ($tags as $idx => $tag) {
                if (isset($tag['id'])) {
                    \Log::info('Updating newblog with tag ' . $tag['id'] . ' with weight ' . ($idx * 5));
                    $blog->tags()->save(Tag::find($tag['id']), ['weight' => $idx * 5]);
                }
            }
        }

        if ($request->has('divisions')) {
            \Log::info('Saving new blog divisions');

            $divisions = $request->get('divisions');

            foreach ($divisions as $idx => $division) {
                if (isset($division['id'])) {
                    \Log::info('Saving new blog with division ' . $division['id'] . ' with weight ' . ($idx * 5));
                    $blog->divisions()->save(Division::find($division['id']), ['weight' => $idx * 5]);
                }
            }
        }

        return $this->get($blog->id);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     */
    public function update(Request $request, $id)
    {
        \Log::info('Received request to update blog ' . $id);

        $destination = path_join(['app', 'public', 'images', 'blogs']);

        $blog = Blog::findOrFail($id);

        $collect = ['title', 'summary', 'body'];
        $files = $request->allFiles();
        foreach ($collect as $attribute) {
            if ($request->has($attribute)) {
                $blog->{$attribute} = $request->get($attribute);
            }
        }

        if ($request->has('author_id') && $request->get('author_id') !== $blog->author_id) {
            $author = Staff::find($request->get('author_id'));

            if ($author) {
                $blog->author()->associate($author);
            }
        }

        $images = ['image', 'splash'];

        foreach($images as $image_key) {
            if ($request->get($image_key) === '') {
                $blog->{$image_key}()->dissociate();
            } elseif ($request->has($image_key)) {
                $managedFile = $request->get($image_key);
                if (isset($files[$image_key]['_file'])) {
                    $file = $files[$image_key]['_file'];

                    $image = Image::createFromUpload($file, $destination, $managedFile);
                    $blog->{$image_key}()->associate($image);
                } else {
                    Image::find($blog->{$image_key}->id)->update($managedFile);
                }
            }
        }

        if ($request->has('tags')) {
            $ids_clean = $blog->tags->map(function($tag) { return $tag->id; })->toArray();
            $ids_dirty = [];

            \Log::info('Saving updated blog tags');

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

            \Log::info('Saving updated blog divisions vs clean divisions ');

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

            \Log::info('Updated blog divisions.');

            foreach ($ids_clean as $clean_id) {
                if (!in_array($clean_id, $ids_dirty)) {
                    \Log::info('Detaching division ' . $clean_id . ' from blog ' . $id);
                    $blog->divisions()->detach($clean_id);
                }
            }
        }

        $blog->save();

        return $this->get($id);
    }

    /**
     * Get a single blog
     *
     * @param $id
     */
    public function get($id)
    {
        $blog = Blog::with('divisions', 'image', 'images', 'tags', 'splash', 'author')->find($id);

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
     * Get From Slug
     *
     * @param $slug
     */
    public function getFromSlug($slug)
    {
        $blogs = Blog::select('id', 'title')->get()->filter(function ($blog) use ($slug) {
            return $blog->uri === $slug;
        });

        if ($blogs->isEmpty()) abort(404);

        return $this->get($blogs->first()->id);
    }

    /**
     * Paged
     */
    public function paged(Request $request)
    {
        $created_at = 0;

        $current_page = $request->input('current_page', 1) - 1;
        $length = $request->input('length', 15);
        $order_by = $request->input('order_by', 'updated_at');
        $descending = $request->input('descending', 'true') === 'true';

        $blogs = Blog::with('divisions', 'image', 'images', 'tags', 'splash', 'author')->get();

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
     */
    public function recent(Request $request)
    {
        $take = $request->input('take', 3);
        $skip = $request->input('skip', 0);

        $blogs = Blog::with('divisions', 'image', 'images', 'tags', 'splash', 'author')->orderBy('created_at', 'desc');
        $count = Blog::count();
        if ($request->has('division')) {
            $division = Division::where('name', $request->input('division'))->first();
            $blogs = $blogs->whereHas('divisions', function($query) use ($division) {
                $query->where('name', $division->name);
            });
            $count = $blogs->count();
        }
        $blogs = $blogs
            ->take($take)
            ->skip($skip)
            ->get();

        return $this->respond('done', [
            'blogs' => $blogs,
            'remaining' => max(0, $count - $take - $skip),
            'total' => $count
        ]);
    }

    /**
     * Related
     *
     * @param $id
     */
    public function related(Request $request, $id)
    {
        $take = $request->input('take', 3);
        $skip = $request->input('skip', 0);

        $division_id = Blog::find($id)->divisions()->first()->id;

        $blogs = Blog::with('divisions', 'image', 'images', 'tags', 'splash', 'author')
                        ->where('id', '!=', $id)
                        ->whereHas('divisions', function($query) use ($division_id) {
                            $query->where('id', $division_id);
                        })
                        ->orderBy('created_at', 'desc')
                        ->take($take)
                        ->skip($skip)
                        ->get();

        return $this->respond('done', $blogs);
    }

    /**
     * Metadata about the blogs stored in DB
     */
    public function metadata(Request $request) {
        $m = self::MODEL;

        $metadata = [];

        $metadata['count'] = $m::count();
        $metadata['newest'] = $m::orderBy('created_at', 'DESC')->first();
        $metadata['most_used_tag'] = Tag::mostUsed(self::MODEL)->name;
        $metadata['most_used_division'] = Division::mostUsed(self::MODEL)->name;
        $metadata['update'] = $m::orderBy('updated_at', 'desc')->take(1)->get()->first()->updated_at->getTimestamp();

        return $this->respond('done', $metadata);
    }
}
