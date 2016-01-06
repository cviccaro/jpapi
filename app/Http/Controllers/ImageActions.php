<?php 

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;

trait ImageActions {

	public function processImage(Request $request, &$data) {
		if ($request->has('imageNew')) {
			$imageNew = $request->input('imageNew');
			$base64_string = $imageNew['$ngfDataUrl'];
			$filename = $imageNew['$ngfName'];
			if ($image = Image::createFromBase64($filename, $base64_string)) {
				$data['image'] = $image->id;
				unset($data['imageNew']);
			}
		}
		else {
			unset($data['image']);
		}
	}
}