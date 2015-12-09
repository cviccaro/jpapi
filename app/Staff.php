<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Staff extends Model {

	protected $fillable = ["first_name", "last_name", "occupation", "linkedin", "email", "phone", "image"];

	protected $dates = [];

	public static $rules = [
		"first_name" => "required",
		"last_name" => "required"
	];
	
	public function getImageAttribute() {
		if ($this->attributes['image'] !== NULL) {
			return URL::to('images/' . basename(Image::where('id', $this->attributes['image'])->first()->path));
		}
		return $this->attributes['image'];
	}
}
