<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model {

	protected $fillable = ["title", "description", "body"];

	protected $dates = [];

	public static $rules = [
		"title" => "required",
	];
}
