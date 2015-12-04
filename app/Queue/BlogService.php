<?php

namespace App\Queue;

use App\Blog;
use App\Image;

class BlogService {
	public function fire($job, $data) {

		// Process image from field
		$image = null;
		if (isset($data['image'])) {
			$image = makeImage($data['image']);
		}

		// Process body for images to fetch
		$body = $data['body']['value'];
		if (!empty($body)) {
			$matches = [];
			$pattern = '/<img[\s\w]?src=[\'|\"]([^\'|\"]*)[\'|\"]/';
			preg_match_all($pattern, $body, $matches);
			if (!empty($matches)) {
				foreach($matches[1] as $url) {
					if (!empty($url)) {
						if (substr($url, 0, 6) == '/sites') {
							$url = 'http://www.jpenterprises.com' . $url;
						}
						makeImage([
							'filename' => basename($url),
							'url' => $url,
						]);
					}
				}
				$body = preg_replace_callback($pattern, function($m) {
				  return str_replace($m[1], '/images/' . basename($m[1]), $m[0]);
				}, $body);
			}
		}
		Blog::create([
			'title' => $data['title'],
			'description' => $data['body']['summary'],
			'body' => $body,
			'category' => $data['category']['name'],
			'image' => $image,
			'created_at' => $data['created_at'],
			'updated_at' => $data['updated_at']
		]);
		$job->delete();
	}
}

function makeImage($image) {
	$data = file_get_contents($image['url']);

	$dir = 'resources/assets/images';
	$path = $dir . '/' . $image['filename'];
	$realpath = realpath($dir) . '/' . $image['filename'];

	file_put_contents($realpath, $data);

	$img = Image::create([
		'path' => $path
	]);

	return $img->id;
}