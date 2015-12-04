<?php
namespace App\Console\Commands;

use App\Blog;
use App\Image;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;

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
      $img = Image::where('path', 'asdasdasd')->first();
      if (!$img) {
        $this->info('no image for path asdasdasd');
      }
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