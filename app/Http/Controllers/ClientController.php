<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientController extends Controller
{

    const MODEL = "App\Client";

    use RESTActions;
    use ImageActions;

    /**
     * Overrides RESTActions::add().
     */
    public function add(Request $request)
    {
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

        if (is_null($model)) {
            return $this->respond('not_found');
        }

        $data = $request->all();

        $this->processImage($request, $data);

        $model->update($data);
        return $this->respond('done', $model);
    }

    public function featured(Request $request)
    {
        $m = self::MODEL;

        $models = $m::featured();

        return $this->respond('done', $models);
    }

    public function options(Request $request)
    {
        $m = self::MODEL;

        $list = $m::select('id', 'name')->get();
        return $this->respond('done', $list);
    }
}
