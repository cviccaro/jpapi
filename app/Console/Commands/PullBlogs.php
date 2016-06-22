<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;
use Symfony\Component\Console\Input\InputOption;

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
    protected $description = 'Import blogs from jpenterprises.com';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {   
        $truncate = $this->option('truncate') || FALSE;
        
        DB::table('blogs')->truncate();
        $this->info('Emptying the blogs table');

        if ($truncate) {
            DB::table('jobs')->truncate();
            $this->info('Emptying the jobs table');
            DB::table('images')->truncate();
            $this->info('Emptying the images table');
        }

        $blogs = (array)json_decode(file_get_contents('http://www.jpenterprises.com/jp_export/blog'));
        $this->info('Just downloaded ' . count($blogs) . ' blogs');

        $this->info('Pushing to BlogService Queue');
        foreach($blogs as $blog) {
            Queue::push('App\Queue\BlogService', $blog);
        }
        $this->info(count($blogs) . ' jobs created in BlogService Queue.  Run php artisan queue:work --daemon to import all blogs.');
    }

    public function getOptions() {
        return [
            ['truncate', 'truncate', InputOption::VALUE_NONE, 'Truncate the jobs and images table?']
        ];
    }

}