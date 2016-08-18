<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller {
	use RESTActions;

	const MODEL = 'App\Staff';

	public function all(Request $request) {
		return Staff::orderBy('last_name', 'ASC')->get();
	}
}
