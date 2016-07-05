<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        Model::unguard();

        $this->call('UserTableSeeder');
        $this->call('ClientTableSeeder');
        //$this->call('BlogTableSeeder');
        $this->call('DivisionTableSeeder');
        $this->call('ProjectTableSeeder');

        Model::reguard();
    }
}
