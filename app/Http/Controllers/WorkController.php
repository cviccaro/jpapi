<?php 

namespace App\Http\Controllers;

use App\Work;
use Illuminate\Http\Request;

class WorkController extends Controller {

	const MODEL = "App\Work";

	use RESTActions;

	public function recent(Request $request) {
		$skip = $request->input('skip', 0);
		$count = Work::all()->count();
		$work = Work::orderBy('created_at', 'desc')->take(6)->skip($skip)->get();
		return $this->respond('done', [
			'work' => $work,
			'remaining' => max(0, $count - 6 - $skip),
			'total' => $count
		]);
	}

}
