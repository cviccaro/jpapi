<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkImage extends Model {

	protected $fillable = ["work_id", "image_id"];

	protected $dates = ["created_at", "updated_at"];

	protected $table = 'work_images';
}
