<?php 
namespace App\Http\Controllers;

use App\Blog;
use App\BlogCategory;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogsController extends Controller {

	const MODEL = "App\Blog";

	use RESTActions;
	use ImageActions;

	public function getCategories() {
		$categories = DB::select('select id, name from blog_categories');
		return array_reduce($categories, function($carry, $item) {
			$carry[$item->id] = $item->name;
			return $carry;
		}, []);
	}
	public function all(Request $request) {
		$take = $request->input('take', 99999);
		$skip = $request->input('skip', 0);
		$blog_count = Blog::all()->count();
		$blogs = Blog::orderBy('created_at', 'desc')->take($take)->skip($skip)->get();
		return $this->respond('done', [
			'blogs' => $blogs,
			'remaining' => max(0, $blog_count - $take - $skip)
		]);
	}
	public function recent(Request $request) {
		$take = $request->input('take', 3);
		$skip = $request->input('skip', 0);
		$blog_count = Blog::all()->count();
		$blogs = Blog::orderBy('created_at', 'desc')->take($take)->skip($skip)->get();
		return $this->respond('done', [
			'blogs' => $blogs,
			'remaining' => max(0, $blog_count - $take - $skip)
		]);
	}
	/**
	 * Overrides RESTActions::add().
	 */
	public function add(Request $request) {
		$m = self::MODEL;
		$this->validate($request, $m::$rules);

		$data = $request->all();

		$this->processImage($request, $data);
		$this->processCategory($request, $data);

		unset($data['site']);

		$blog = Blog::create($data);

		return $this->respond('done', $blog);
	}

	public function processCategory(Request $request, &$data) {
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

		if(is_null($model)){
			return $this->respond('not_found');
		}

		$data = $request->all();

		unset($data['site']);

		$this->processImage($request, $data);
		$this->processCategory($request, $data);

		$model->update($data);
		return $this->respond('done', $model);
	}

	public function getFromIdentifier(Request $request, $string) {
		$m = self::MODEL;

		$model = $m::where('identifier', $string)->first();
		if(is_null($model)){
			return 'OMFG';
		}
		return $this->respond('done', $model);
	}


}
