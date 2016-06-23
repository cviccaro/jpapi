<?php
namespace App\Console\Commands;

use App\Blog;
use App\Image;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\URL;

class DebugBlogCommand extends Command {

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'debug:blog';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run test functions on a blog';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
      $_SERVER['HTTP_HOST'] = 'http://omg';
      $blog = Blog::where('id', 1)->first();

      $blog->body = preg_replace_callback('/{{[^}]*}}/', function($matches) {
        $path = 'resources/assets/images/' . str_replace(['{{','}}'], ['', ''], $matches[0]);
        $img = Image::where('path', $path)->first();
        return URL::to('images/' . basename($img['path']));
      }, $blog->body);

      $this->info($blog->body);
      $this->info($blog->image);
      $this->info(print_r($_SERVER, TRUE));
      //$this->info(print_r($img, true));
      // if (!empty($matches)) {
      //   foreach($matches[1] as $url) {
      //       if (!empty($url)) {
      //           $this->info(basename($url));
      //       }
      //   }
      // }
    }

}