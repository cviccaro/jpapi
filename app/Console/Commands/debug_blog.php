<?php
namespace App\Console\Commands;

use App\Blog;
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
      $blog = Blog::find(1);
      $matches = [];
      $pattern = '/<img[\s\w]?src=[\'|\"]([^\'|\"]*)[\'|\"]/';
      preg_match_all($pattern, $blog->body, $matches);
  
      $replaced = preg_replace_callback($pattern, function($matches) {
        $this->info('Matches: ' . print_r($matches, true));
        return str_replace($matches[1], '/images/' . basename($matches[1]), $matches[0]);
      }, $blog->body);
      $this->info($replaced);
      // if (!empty($matches)) {
      //   foreach($matches[1] as $url) {
      //       if (!empty($url)) {
      //           $this->info(basename($url));
      //       }
      //   }
      // }
    }

}