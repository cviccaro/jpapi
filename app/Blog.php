<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model {

	protected $fillable = ["title", "description", "body", "category", "image", "created_at", "updated_at"];

	protected $dates = [];

	public static $rules = [
		"title" => "required",
	];
}
