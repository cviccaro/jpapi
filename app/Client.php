<?php
namespace App;

use App\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Client extends Model {

	protected $fillable = ["name", "short_name", "image", "featured"];

	protected $dates = [];

	public static $rules = [
		"name" => "required",
		"short_name" => "required",
	];

	public function getImageAttribute() {
		if ($this->attributes['image'] !== NULL) {
			return URL::to('images/clients/' . basename(Image::where('id', $this->attributes['image'])->first()->path));
		}
		return $this->attributes['image'];
	}

	public function scopeFeatured($query) {
		return $query->where('featured', TRUE)->get();
	}
}
