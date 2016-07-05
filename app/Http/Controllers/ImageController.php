<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Image;
use Illuminate\Http\Request;

class ImageController extends Controller {

	use RESTActions;

	public function getClientImage(Request $request, $path) {
	    return $this->get($request, 'clients/' . $path);
	}

	public function getPublic(Request $request, $model, $name)
	{
	    $filepath = storage_path('app/public/images/' . $model . '/' . $name);

	    if ( !\File::exists($filepath) ) abort(404);

	    $file = \File::get($filepath);
	    $type = \File::mimeType($filepath);

	    $response = \Response::make($file, 200);
	    $response->header('Content-Type', $type);

	    return $response;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$images = Image::orderBy('id', 'desc')->paginate(10);

		return view('images.index', compact('images'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return view('images.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request)
	{
		$image = new Image();

		$image->path = $request->input("path");
        $image->filename = $request->input("filename");
        $image->alias = $request->input("alias");
        $image->mimetype = $request->input("mimetype");
        $image->extension = $request->input("extension");
        $image->size = $request->input("size");
        $image->last_modified = $request->input("last_modified");

		$image->save();

		return redirect()->route('images.index')->with('message', 'Item created successfully.');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$image = Image::findOrFail($id);

		return view('images.show', compact('image'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$image = Image::findOrFail($id);

		return view('images.edit', compact('image'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @param Request $request
	 * @return Response
	 */
	public function update(Request $request, $id)
	{
		$image = Image::findOrFail($id);

		$image->path = $request->input("path");
        $image->filename = $request->input("filename");
        $image->alias = $request->input("alias");
        $image->mimetype = $request->input("mimetype");
        $image->extension = $request->input("extension");
        $image->size = $request->input("size");
        $image->last_modified = $request->input("last_modified");

		$image->save();

		return redirect()->route('images.index')->with('message', 'Item updated successfully.');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$image = Image::findOrFail($id);
		$image->delete();

		return redirect()->route('images.index')->with('message', 'Item deleted successfully.');
	}

}
