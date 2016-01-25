<?php

namespace App\Queue;

use App\Staff;
use App\Image;

class StaffService {
	public function fire($job, $data) {
		$full_name = explode(' ', $data['full_name']);
		$first_name = array_shift($full_name);
		$last_name = implode(' ', $full_name);
		$email = $data['email'];
		$linkedin = isset($data['linkedin']['url']) ? $data['linkedin']['url'] : null;
		$occupation = $data['occupation'];

		// Process image from field
		$image = null;
		// if (isset($data['image'])) {
		// 	$image = $this->makeImage($data['image']);
		// }
		// else {
		$image = $this->makeImage(['filename' => 'staff-placeholder-' . rand(1,5) . '_0.jpg']);
		// }

		$staff = Staff::create([
			'first_name' => $first_name,
			'last_name' => $last_name,
			'email' => $email,
			'linkedin' => $linkedin,
			'occupation' => $occupation,
			'image' => $image
		]);
		$job->delete();
	}
	public function makeImage($image) {
		$dir = 'resources/assets/images';
		$path = $dir . '/' . $image['filename'];
		$realpath = realpath($dir) . '/' . $image['filename'];

		$make = false;
		if (!file_exists($realpath)) {
			$make = true;
		}
		else if ($first = Image::where('path', $path)->first()) {
			$img = $first;
		}
		else {
			$make = true;
		}

		if ($make) {
			$data = file_get_contents($image['url']);

			file_put_contents($realpath, $data);

			$img = Image::create([
				'path' => $path
			]);
		}

		return $img->id;
	}
}