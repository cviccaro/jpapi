<?php

use Illuminate\Database\Seeder;
use App\Blog;

class BlogTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

    	DB::table('blogs')->truncate();

    	$factory = Faker\Factory::create();
    	$n = 1;
        while ($n++ <= 50) {
        	$blog = new Blog();
        	$blog->title = $factory->sentence;
        	$blog->description = $factory->paragraph;
        	$blog->body = $factory->realText();
        	$blog->save();
        }
    }
}
