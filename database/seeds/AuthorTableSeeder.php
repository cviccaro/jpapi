<?php

use Illuminate\Database\Seeder;
use App\Author;
use App\Blog;
use App\Image;

class AuthorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In neque leo, ullamcorper vel arcu ac, euismod mattis ex. Morbi sollicitudin pellentesque faucibus. Sed id rhoncus nisl. Nulla facilisi. Nulla id mollis orci, at gravida orci. Duis erat felis, porttitor eu fringilla hendrerit, dapibus vitae purus.';

      $author = Author::create([
      	'first_name' => 'Fake',
      	'last_name' => 'Author',
      	'bio' => $bio
    	]);

    	$image_path = resource_path('assets/images/author-placeholder.jpg');
    	$image_destination = path_join(['app', 'public', 'images', 'authors']);

			$image = Image::createFromUrl($image_path, $image_destination);

			$author->image()->associate($image);

			$author->save();

			$blogs = Blog::all();

			foreach($blogs as $blog) {
				$blog->author()->associate($author);
				$blog->save();
			}
    }
}
