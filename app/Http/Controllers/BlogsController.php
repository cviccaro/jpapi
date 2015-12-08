<?php 
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class BlogsController extends Controller {

	const MODEL = "App\Blog";

	use RESTActions;

	public function getCategories() {
		$categories = DB::select('select id, name from blog_categories');
		return array_reduce($categories, function($carry, $item) {
			$carry[$item->id] = $item->name;
			return $carry;
		}, []);
	}

}
