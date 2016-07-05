<?php

namespace App\Queue;

use App\Blog;
use App\BlogCategory;
use App\Image;
use App\Tag;
use App\Division;
use Faker\Factory;
use File;

class BlogQueue {
    public function fire($job, $data) {
    	\Log::info('Processing blog:' . print_r($data, true));

        // Process body for images to fetch
        $body = $data['body']['value'];

        $body_images = [];
        if ( !empty($body) ) {
            $matches = [];
            $pattern = '/<img.*src=[\'\"]([^\'\"]*)[\'\"]/';

            preg_match_all($pattern, $body, $matches);

            if (!empty($matches)) {
                foreach ($matches[1] as $url) {
                    if (!empty($url)) {
                        if (substr($url, 0, 6) === '/sites') {
                            // Most likely an image at sites/default/files,
                            // Drupal's storage directory

                            $url = 'http://www.jpenterprises.com' . $url;
                        }

                        $url = str_replace('jpecatalogs', 'jpenterprises', $url);
                        $body_images[] = $this->makeImage($url);
                    }
                }

                $body = preg_replace_callback($pattern, function ($m) {
                    return str_replace($m[1], '{{' . basename($m[1]) . '}}', $m[0]);
                }, $body);
            }
        }

        $blog = Blog::create([
            'title' => $data['title'],
            'description' => $data['body']['summary'],
            'body' => $body,
            'author' => 'Fake Author',
            'created_at' => $data['created_at'],
            'updated_at' => $data['updated_at'],
        ]);

        // Create an image from the json data if set,
        // else generate one with Faker.
        $image_url = isset($data['image']['url']) ? $data['image']['url'] : false;
        $image = $this->makeImage($image_url);

        $blog->image()->associate($image)->save();

        // Create a tag with the blog category
        if ( isset($data['category']['name']) ) {
            $tag = Tag::create([
                'name' => $data['category']['name'],
                'description' => $data['category']['description']
            ]);

            $blog->tags()->attach($tag);
        }

        // If we extract images from the body,
        // attach them now.
        if ( !empty($body_images) ) {
            $blog->images()->saveMany($body_images);
        }

        // Attach a site randomly
        $division = Division::find(rand(1,3));
        $blog->divisions()->attach($division);

        $job->delete();
    }

    public function makeImage($url = false) {
        $uploads_destination = path_join(['app', 'public', 'images', 'blogs']);

        if ( $url ) {
            return Image::createFromUrl($url, $uploads_destination);
        }

        $faker = \Faker\Factory::create();
        $filepath = $faker->image(storage_path($uploads_destination), 340, 206);

        return Image::createFromPath($filepath, $uploads_destination);
    }
}
