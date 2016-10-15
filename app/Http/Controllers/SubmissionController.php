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

    public function validateRecaptcha(Request $request)
    {
        if ($request->has('response')) {
            $captchaResponse = $request->input('response');

            $client = new \GuzzleHttp\Client();

            $form = [
                'response' => $captchaResponse,
                'secret' => env('RECAPTCHA_SECRET_KEY'),
                'remoteip' => $_SERVER['REMOTE_ADDR']
            ];

            \Log::info('ReCAPTCHA # Requesting Google validate this user response' . print_r($form, true));

            $res = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', ['form_params' => $form]);

            \Log::info('ReCAPTCHA # Response from Google\'s validation of user response : ' . $res->getBody());

            if (app()->environment() == 'local') {
                \Debugbar::disable();
            }

            return response($res->getBody(), $res->getStatusCode());
        }

        return response('No response to validate in request', 400);
    }
}
