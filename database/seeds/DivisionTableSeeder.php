<?php

use Illuminate\Database\Seeder;

use App\Division;

class DivisionTableSeeder extends Seeder {

    public function run()
    {
        if (DB::table('divisions')->count()) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table('divisions')->truncate();
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        Division::create([
            'name' => 'creative',
            'display_name' => 'Creative'
        ]);
        Division::create([
            'name' => 'interactive',
            'display_name' => 'Interactive'
        ]);
        Division::create([
            'name' => 'publishing',
            'display_name' => 'Publishing'
        ]);
        Division::create([
            'name' => 'mdm',
            'display_name' => 'MDM'
        ]);
    }

}