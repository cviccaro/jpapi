<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\ContactFormSubmission;

class SubmissionController extends Controller
{
    public function submit(Request $request)
    {
    	$fillable = ['first_name', 'last_name', 'company', 'email', 'phone', 'contact_time', 'comments', 'division'];

    	$submission = new ContactFormSubmission();

    	foreach ($fillable as $key) {
    		if ($request->has($key)) {
    			$submission->{$key} = $request->get($key);
    		}
    	}

    	$submission->ip = $request->ip();

    	$saved = $submission->save();

    	return response(['success' => $saved]);
    }
}
