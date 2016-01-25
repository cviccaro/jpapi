<?php

namespace App\Queue;

use App\Blog;
use App\BlogCategory;
use App\Image;
use Faker\Factory;

class BlogService {

	public function fire($job, $data) {
		$factory = \Faker\Factory::create();

		// Process category
		$category = $data['category'];
		$category_id = NULL;
		if (!empty($category) && isset($category['name'])) {
			$category_name = $category['name'];
			$blog_category = BlogCategory::where('name', $category_name)->first();
			if (!$blog_category) {
				$blog_category = BlogCategory::create([
					'name' => $category_name,
					'description' => $category['description'],
					'parent' => NULL
				]);	
			}
			$category_id = $blog_category->id;
		}

		// Process image from field
		$image = null;
		if (isset($data['image'])) {
			$image = $this->makeImage($data['image']);
		}
		else {
			$image_path = $factory->image('resources/assets/images', 340, 206);
			$image = Image::create([
			    'path' => $image_path
			]);
			$image = $image->id;
		}

		// Process body for images to fetch
		$body = $data['body']['value'];
		if (!empty($body)) {
			$matches = [];
			$pattern = '/<img.*src=[\'\"]([^\'\"]*)[\'\"]/';
			preg_match_all($pattern, $body, $matches);
			if (!empty($matches)) {
				foreach($matches[1] as $url) {
					if (!empty($url)) {
						if (substr($url, 0, 6) == '/sites') {
							$url = 'http://www.jpenterprises.com' . $url;
						}
						$url = str_replace('jpecatalogs', 'jpenterprises', $url);
						$this->makeImage([
							'filename' => basename($url),
							'url' => $url,
						]);
					}
				}
				$body = preg_replace_callback($pattern, function($m) {
				  return str_replace($m[1], '{{' . basename($m[1]) . '}}', $m[0]);
				}, $body);
			}
		}
		Blog::create([
			'title' => $data['title'],
			'description' => $data['body']['summary'],
			'body' => $body,
			'category' => $category_id,
			'image' => $image,
			'site' => rand(1,3),
			'created_at' => $data['created_at'],
			'updated_at' => $data['updated_at']
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
