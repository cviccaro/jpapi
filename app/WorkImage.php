<?php
namespace App;

use App\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class WorkImage extends Model {

	protected $fillable = ["work_id", "image_id"];

	protected $appends = ['image_url'];

	protected $dates = ["created_at", "updated_at"];

	protected $table = 'work_images';

	public function getImageUrlAttribute() {
		$img = Image::where('id', $this->image_id)->first();
		return URL::to('images/' . basename($img['path']));
	}
}
