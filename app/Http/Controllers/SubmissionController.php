<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\ContactFormSubmission;

use Mail;

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

        // Send the user an email
        Mail::send('emails.contact-form-user', ['submission' => $submission], function($m) use ($submission) {
            $m->from('no-reply@jpenterprises.com', 'JP Enterprises');
            $m->to($submission->email, $submission->first_name . ' ' . $submission->last_name)->subject('A copy of your recent submission to JP Enterprises.');
        });

        // Send administrative emails
        $emails = [
            'pbrierly@jpenterprises.com',
            'mgrando@jpenterprises.com',
            'sfleishauer@jpenterprises.com',
            'sgebhart@jpenterprises.com'
        ];
        
        foreach($emails as $email) {
            Mail::send('emails.contact-form-admin', ['submission' => $submission], function ($m) use ($email) {
                $m->from('no-reply@jpenterprises.com', 'JP Enterprises');
                $m->to($email, $email)->subject('A new submission to the contact form has been received');
            });
        }

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

        return response(['success' => FALSE]);
    }
}
