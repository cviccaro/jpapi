<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Tag;
use Illuminate\Http\Request;

class TagController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$tags = Tag::orderBy('id', 'desc')->paginate(10);

		return view('tags.index', compact('tags'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return view('tags.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request)
	{
		$tag = new Tag();

		$tag->name = $request->input("name");
        $tag->description = $request->input("description");
        $tag->parent = $request->input("parent");

		$tag->save();

		return redirect()->route('tags.index')->with('message', 'Item created successfully.');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$tag = Tag::findOrFail($id);

		return view('tags.show', compact('tag'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$tag = Tag::findOrFail($id);

		return view('tags.edit', compact('tag'));
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
		$tag = Tag::findOrFail($id);

		$tag->name = $request->input("name");
        $tag->description = $request->input("description");
        $tag->parent = $request->input("parent");

		$tag->save();

		return redirect()->route('tags.index')->with('message', 'Item updated successfully.');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$tag = Tag::findOrFail($id);
		$tag->delete();

		return redirect()->route('tags.index')->with('message', 'Item deleted successfully.');
	}

}
