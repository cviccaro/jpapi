<?php 
namespace App;

use App\Client;
use App\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Work extends Model {

	protected $fillable = ["title", "body", "client", "image"];

	protected $dates = [];

	public static $rules = [
		"title" => "required",
		"body" => "required",
		"client" => "required"
	];

	protected $table = 'work';

	public function getImageAttribute() {
		if ($this->attributes['image'] !== NULL) {
			return URL::to('images/' . basename(Image::where('id', $this->attributes['image'])->first()->path));
		}
		return $this->attributes['image'];
	}

	public function getClientAttribute() {
		return Client::where('id', $this->attributes['client'])->first()->name;
	}
}
