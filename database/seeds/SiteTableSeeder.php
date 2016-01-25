<?php

use App\Site;
use Illuminate\Database\Seeder;

class SiteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sites')->truncate();

        Site::create([
            'name' => 'creative',
        ]);
        Site::create([
            'name' => 'interactive',
        ]);
        Site::create([
            'name' => 'publishing',
        ]);

    }
}
