<?php namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;


class StaffController extends Controller {

	const MODEL = "App\Staff";

	use RESTActions;
	use ImageActions;

	/**
	 * Overrides RESTActions::add().
	 */
	public function add(Request $request) {
		$m = self::MODEL;
		$this->validate($request, $m::$rules);

		$data = $request->all();

		$this->processImage($request, $data);

		$staff = $m::create($data);

		return $this->respond('done', $staff);
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

		$this->processImage($request, $data);

		$model->update($data);
		return $this->respond('done', $model);
	}
}
