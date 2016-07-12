<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    use RESTActions;

    /**
     * Display the clients in a format consumable
     * by HTMLOptionElements
     *
     * @return Response
     */
    public function options(Request $request)
    {
        $list = Tag::select('id', 'name')->get()->map(function ($tag) {
            return ['label' => $tag->name, 'value' => $tag->id];
        });
        return $this->respond('done', $list);
    }
}
