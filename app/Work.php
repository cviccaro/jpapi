<?php
namespace App;

use App\Client;
use App\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Work extends Model {

	protected $fillable = ["uri", "title", "body", "client", "image"];

	protected $appends = ['gallery'];

	protected $dates = [];

	public static $rules = [
		"uri" => "required",
		"title" => "required",
		"body" => "required",
		"client" => "required",
	];

	protected $table = 'work';

	public function getImageAttribute() {
		if ($this->attributes['image'] !== NULL) {
			return Image::find($this->attributes['image'])->getUrl();
		}
		return $this->attributes['image'];
	}

	public function getClientAttribute() {
		return Client::where('id', $this->attributes['client'])->first();
	}

	public static function createUri($title) {
		$stripped = str_replace('_', '-', preg_replace("/[^a-z0-9\_\-\s]+/i", "", $title));
		$hypenated = strtolower(implode('-', explode(' ', $stripped)));
		return $hypenated;
	}

	public function getGalleryAttribute() {
		return WorkImage::where('work_id', $this->id)->get();
	}
}
