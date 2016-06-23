<?php
namespace App\Http\Controllers;

use App\Blog;
use App\Site;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use Illuminate\Support\Facades\DB;

class BlogsController extends Controller
{

    const MODEL = "App\Blog";

    use RESTActions;
    use ImageActions;

    public function getCategories()
    {
        $categories = DB::select('select id, name from blog_categories');
        return array_reduce($categories, function ($carry, $item) {
            $carry[$item->id] = $item->name;
            return $carry;
        }, []);
    }
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

    public function paged(Request $request)
    {
        $created_at = 0;

        $current_page = $request->input('current_page', 1) - 1;
        $length = $request->input('length', 15);
        $order_by = $request->input('order_by', 'created_at');
        $order_by_direction = $request->input('order_by_direction', 'desc');
        $descending = $order_by_direction === 'desc';

        $blogs = Blog::where('created_at', '>', $created_at)
            ->get();

        $blogs = $blogs->sortBy(function ($blog) use ($order_by) {
            switch ($order_by) {
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
    /**
     * Overrides RESTActions::add().
     */
    public function add(Request $request)
    {
        $m = self::MODEL;
        $this->validate($request, $m::$rules);

        $data = $request->all();

        $this->processImage($request, $data);
        $this->processCategory($request, $data);

        unset($data['site']);

        $blog = Blog::create($data);

        return $this->respond('done', $blog);
    }

    public function processCategory(Request $request, &$data)
    {
        if ($request->has('category')) {
            $category = $request->input('category');
            $data['category'] = $category['id'];
        }
    }

    /**
     * Overrides RESTActions::put().
     */
    public function put(Request $request, $id)
    {
        $m = self::MODEL;
        $this->validate($request, $m::$rules);
        $model = $m::find($id);

        if (is_null($model)) {
            return $this->respond('not_found');
        }

        $data = $request->all();

        unset($data['site']);

        $this->processImage($request, $data);
        $this->processCategory($request, $data);

        $model->update($data);
        return $this->respond('done', $model);
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

    public function getRelated(Request $request, $id)
    {
        $m = self::MODEL;
        $model = $m::find($id);
        if (is_null($model)) {
            return $this->respond('not_found');
        }
        $max = $request->input('max', 3);
        $site = Site::where('name', $model->site)->first();
        $models = Blog::where('id', '!=', $id)->where('site', $site->id)->take($max)->get();
        return $this->respond('done', $models);
    }
}
