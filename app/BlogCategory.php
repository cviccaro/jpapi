<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model {

	protected $fillable = ["name", "description", "parent"];

	protected $dates = [];

	public static $rules = [
		"name" => "required",
	];
}
