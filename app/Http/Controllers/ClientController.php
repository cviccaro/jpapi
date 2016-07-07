<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Client;
use Illuminate\Http\Request;

class ClientController extends Controller {

	const MODEL = "App\Client";

	use RESTActions;

	/**
	 * Display the clients in a format consumable
	 * by HTMLOptionElements
	 *
	 * @return Response
	 */
	public function options(Request $request)
	{
	    $list = Client::select('id', 'name')->get();
	    return $this->respond('done', $list);
	}

	public function featured(Request $request)
	{
	    $models = Client::where('featured', true)->get();

	    return $this->respond('done', $models);
	}

}
