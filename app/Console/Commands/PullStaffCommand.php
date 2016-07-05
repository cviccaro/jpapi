<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;

class PullStaffCommand extends Command {

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'pull:staff';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import staff from jpenterprises.com';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        DB::table('staff')->truncate();
//        DB::table('jobs')->truncate();

        $this->info('Emptying the staff table');

        $staff = (array)json_decode(file_get_contents('http://www.jpenterprises.com/jp_export/biography'));
        $this->info('Just downloaded ' . count($staff) . ' staff');

        $this->info('Pushing to StaffQueue');
        foreach($staff as $person) {
            Queue::push('App\Queue\StaffQueue', $person);
        }
        $this->info(count($staff) . ' jobs created in StaffQueue.  Run php artisan queue:work');
    }

}