<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$staff = Staff::orderBy('id', 'desc')->paginate(10);

		return view('staff.index', compact('staff'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return view('staff.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function store(Request $request)
	{
		$staff = new Staff();

		$staff->first_name = $request->input("first_name");
        $staff->last_name = $request->input("last_name");
        $staff->title = $request->input("title");
        $staff->email = $request->input("email");
        $staff->phone = $request->input("phone");
        $staff->image_id = $request->input("image_id");
        $staff->linkedin = $request->input("linkedin");

		$staff->save();

		return redirect()->route('staff.index')->with('message', 'Item created successfully.');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$staff = Staff::findOrFail($id);

		return view('staff.show', compact('staff'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$staff = Staff::findOrFail($id);

		return view('staff.edit', compact('staff'));
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
		$staff = Staff::findOrFail($id);

		$staff->first_name = $request->input("first_name");
        $staff->last_name = $request->input("last_name");
        $staff->title = $request->input("title");
        $staff->email = $request->input("email");
        $staff->phone = $request->input("phone");
        $staff->image_id = $request->input("image_id");
        $staff->linkedin = $request->input("linkedin");

		$staff->save();

		return redirect()->route('staff.index')->with('message', 'Item updated successfully.');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$staff = Staff::findOrFail($id);
		$staff->delete();

		return redirect()->route('staff.index')->with('message', 'Item deleted successfully.');
	}

}
