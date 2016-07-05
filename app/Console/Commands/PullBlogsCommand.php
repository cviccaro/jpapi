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
        $blogs = (array)json_decode(file_get_contents('http://www.jpenterprises.com/jp_export/blog'));
        $this->info('Retrieved ' . count($blogs) . ' blogs');

        $this->info('Pushing to BlogQueue');
        foreach($blogs as $blog) {
            Queue::push('App\Queue\BlogQueue', $blog);
        }

        $this->info(count($blogs) . ' jobs created.  Run php artisan queue:work.');
    }

}