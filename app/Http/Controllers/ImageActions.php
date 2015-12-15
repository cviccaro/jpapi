<?php 

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;

trait ImageActions {

	public function processImage(Request $request, $data) {
		if ($request->has('imageNew')) {
			$imageNew = $request->input('imageNew');
			$base64_string = $imageNew['$ngfDataUrl'];
			$filename = $imageNew['$ngfName'];

			$img_data = explode(',', $base64_string);
			$dir = 'resources/assets/images';
			$realpath = realpath(base_path() . '/' . $dir) . '/' . $filename;
			$path = $dir . '/' . $filename;

			file_put_contents($realpath, base64_decode($img_data[1]));
			$img = Image::create([
				'path' => $path
			]);
			$data['image'] = $img->id;
			unset($data['imageNew']);
		}
		else {
			unset($data['image']);
		}
	}

}