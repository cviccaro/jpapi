<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class SubmissionController extends Controller
{
    public function submit(Request $request) {
    	return response($request->all());
    }
}
