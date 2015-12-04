<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model {

	protected $fillable = ["path"];

	protected $dates = [];

	public static $rules = [
		"path" => "required",
	];
}
