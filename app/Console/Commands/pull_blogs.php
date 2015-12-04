<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;

class PullBlogsCommand extends Command {

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'pull:blogs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run my command.';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        DB::table('blogs')->truncate();
        $this->info('Emptying the blogs table');

        DB::table('jobs')->truncate();
        DB::table('images')->truncate();     

        $blogs = (array)json_decode(file_get_contents('http://www.jpenterprises.com/jp_export/blogs'));
        $this->info('Just downloaded ' . count($blogs) . ' blogs');

        $this->info('Pushing to BlogService Queue');
        foreach($blogs as $blog) {
            Queue::push('App\Queue\BlogService', $blog);
        }
        $this->info(count($blogs) . ' jobs created in BlogService Queue.  Run php artisan queue:work --daemon to import all blogs.');
    }

}