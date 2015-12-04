<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;

class Key extends Model {

	protected $fillable = ["domain", "key"];

	public static $rules = [
		"domain" => "required",
		"key" => "required",
	];
}
