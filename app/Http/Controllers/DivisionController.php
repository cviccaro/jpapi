<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Division;
use Illuminate\Http\Request;

class DivisionController extends Controller {

    use RESTActions;

    /**
     * Display the divisions in a format consumable
     * by HTMLOptionElements
     *
     * @return Response
     */
    public function options(Request $request)
    {
        $list = Division::select('id', 'name')->get();
        return $this->respond('done', $list);
    }
}
