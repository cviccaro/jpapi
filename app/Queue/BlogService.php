<?php

namespace App\Queue;

use App\Blog;
use App\BlogCategory;
use App\Image;
use Faker\Factory;

use File;

class BlogService {
    public function fire($job, $data) {
    	\Log::info('Processing blog:' . print_r($data, true));

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
                    'parent' => NULL,
                ]);
            }
            $category_id = $blog_category->id;
        }

        // Process image from field
        $image = null;
        if (isset($data['image']['url'])) {
            $image = $this->makeImage($data['image']['url']);
        } else {
            $image = $this->makeImage();
        }

        // Process body for images to fetch
        $body = $data['body']['value'];
        if (!empty($body)) {
            $matches = [];
            $pattern = '/<img.*src=[\'\"]([^\'\"]*)[\'\"]/';
            preg_match_all($pattern, $body, $matches);
            if (!empty($matches)) {
                foreach ($matches[1] as $url) {
                    if (!empty($url)) {

                        if (substr($url, 0, 6) == '/sites') {
                            $url = 'http://www.jpenterprises.com' . $url;
                        }

                        $url = str_replace('jpecatalogs', 'jpenterprises', $url);
                        $image = $this->makeImage($url);
                    }
                }
                $body = preg_replace_callback($pattern, function ($m) {
                    return str_replace($m[1], '{{' . basename($m[1]) . '}}', $m[0]);
                }, $body);
            }
        }

        $uri = Blog::createUri($data['title']);

        $authors = array('Jane Doe', 'John Doe');

        Blog::create([
            'title' => $data['title'],
            'uri' => $uri,
            'description' => $data['body']['summary'],
            'body' => $body,
            'category' => $category_id,
            'author' => $authors[rand(0, 1)],
            'image' => $image ? $image->id : null,
            'site' => rand(1, 3),
            'created_at' => $data['created_at'],
            'updated_at' => $data['updated_at'],
        ]);
        $job->delete();
    }

    public function makeImage($url = false) {
        $uploads_destination = 'app/public/images/blogs';
        $destination = storage_path($uploads_destination);
        if (!File::exists($destination)) {
        	File::makeDirectory($destination);
        }

        if ($url) {
            $original_name = basename($url);
            $data = file_get_contents($url);

            $filename = Image::availableFilename($original_name, $destination);
            $filepath = $destination . '/' . $filename;

            File::put($filepath, $data);

            $extension = File::extension($filepath);
            $mimetype = File::mimeType($filepath);
            $size = File::size($filepath);
        } else {
        	$faker = \Faker\Factory::create();

        	$filepath = $faker->image($destination, 340, 206);

            $filepath = str_replace("\\", "/", $filepath);
            $filename = $original_name = basename($filepath);

            $extension = File::extension($filepath);
            $mimetype = File::mimeType($filepath);
            $size = File::size($filepath);
        }

        $image = Image::create([
            'path' => $uploads_destination,
            'name' => $filename,
            'alias' => $original_name,
            'extension' => $extension,
            'mimetype' => $mimetype,
            'size' => $size,
        ]);

        return $image;
    }
}
