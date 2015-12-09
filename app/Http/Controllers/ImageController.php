<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
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
}