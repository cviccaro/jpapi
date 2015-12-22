<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Image extends Model {

	protected $fillable = ["path"];

	protected $dates = [];

	public static $rules = [
		"path" => "required",
	];

	public function scopeNamed($query, $name) {
		return $query->where('path', 'LIKE', '%'.$name.'%')->get();
	}

	public static function createFromUploaded(UploadedFile $file) {
		$image_dir = 'resources/assets/images';
		$destination = base_path() . '/' . $image_dir;

		$filename = $file->getClientOriginalName();
		if (static::named($filename)->first() !== NULL) {
			$name_parts = explode('.',$filename);
			$extension = array_pop($name_parts);
			$continue = true;
			$i = 0;
			while ($continue) {
				$candidate_name = implode('.', $name_parts) . '_' . $i++ . '.' . $extension;
				if (static::named($candidate_name)->first() === NULL) {
					$continue = false;
					$filename = $candidate_name;
				}
			}
		}

		if ($moved = $file->move($destination, $filename)) {
			return static::create([
				'path' => $image_dir . '/' . $filename
			]);
		}

		return FALSE;
	}
}
