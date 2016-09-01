<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContactFormSubmission extends Model
{
	protected $table = 'submissions';

	protected $fillable = ['first_name', 'last_name', 'company', 'email', 'phone', 'contact_time', 'comments', 'division', 'ip'];
}
