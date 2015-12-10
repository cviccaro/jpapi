<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Client extends Model {

	protected $fillable = ["name", "short_name"];

	protected $dates = [];

	public static $rules = [
		"name" => "required",
		"short_name" => "required"
	];
}
