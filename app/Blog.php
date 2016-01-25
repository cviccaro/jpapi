<?php 
namespace App;

use App\BlogCategory;
use App\Image;
use App\Site;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Blog extends Model {

	protected $fillable = ["title", "description", "body", "category", "image", "site", "created_at", "updated_at"];

	protected $dates = [];

	public static $rules = [
		"title" => "required",
	];

	public function getCategoryAttribute() {
		return BlogCategory::where('id', $this->attributes['category'])->first();
	}
	public function getImageAttribute() {
		if ($this->attributes['image'] !== NULL) {
			return URL::to('images/' . basename(Image::where('id', $this->attributes['image'])->first()->path));
		}
		return $this->attributes['image'];
	}

	public function getBodyAttribute() {
		$body = $this->attributes['body'];
		$body = preg_replace_callback('/{{[^}]*}}/', function($matches) {
		  $path = 'resources/assets/images/' . str_replace(['{{','}}'], ['', ''], $matches[0]);
		  $img = Image::where('path', $path)->first();
		  return URL::to('images/' . basename($img['path']));
		}, $body);
		return $body;
	}

	public function getSiteAttribute() {
		return Site::where('id', $this->attributes['site'])->first()->name;
	}
}
