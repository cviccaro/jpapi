<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

use App\Image;

class CleanAssetsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clean:assets';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean out any unmanaged assets';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $dirs = File::directories(storage_path('app/public/images'));
        $images = Image::all();
        $trashed = 0;
        
        foreach ($dirs as $dir) {
            $files = \File::allFiles($dir);
            foreach ($files as $file) {
                $filename = $file->getFileName();
                $relative_parent_path = str_replace('/', '\\', str_replace(storage_path() . '/', '', $file->getPath()));
                $filtered = $images->filter(function ($image) use ($filename, $relative_parent_path) {
                    return $image->path === $relative_parent_path && $image->filename === $filename;
                });
                if ($filtered->count() === 0) {
                    $this->info('Removing orphaned file that is no longer managed in managed image table: ' . $file->getPathname());
                    File::delete($file->getRealPath());
                    $trashed++;
                }
            }
        }
        if ($trashed) {
            $this->info('Finished cleaning assets.  Deleted ' . $trashed . ' files.');
        } else {
            $this->info('Assets already clean!  No files deleted.');
        }
    }
}
