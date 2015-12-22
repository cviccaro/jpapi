<?php

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\File\File;

class ImageController extends Controller {
	public function get($path) {
		$file_path = '../resources/assets/images/' . $path;
		try {
			$file = new File($file_path);
			return response(file_get_contents($file_path), 200, ['Content-Type' => $file->getMimeType()]);
		}
		catch (Exception $e) {
			abort(404);
		}
	}
	public function upload(Request $request) {
		$image_dir = 'resources/assets/images';
		$destination = base_path() . '/' . $image_dir;

		if ($request->hasFile('file')) {
			$file = $request->file('file');
			if ($image = Image::createFromUploaded($file)) {
				return response([
					'filename' => basename($image['path']),
					'url' => URL::to('images/' . basename($image['path']))
				]);
			}
			else {
				return response([
					'error' => 'file_move_failed'
				]);
			}
		}
		return response([
			'error' => 'no_file'
		]);
	}
}