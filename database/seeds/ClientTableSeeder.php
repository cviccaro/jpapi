<?php

use App\Client;
use Illuminate\Database\Seeder;

class ClientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clients')->truncate();

        Client::create([
        	'name' => 'Adobe',
        	'short_name' => 'Adobe',
    	]);

        Client::create([
        	'name' => 'Cicci Dance Studio',
        	'short_name' => 'Cicci',
    	]);

        Client::create([
        	'name' => 'Cisco Systems',
        	'short_name' => 'Cisco',
    	]);

        Client::create([
        	'name' => 'Galls',
        	'short_name' => 'Galls',
    	]);

    	Client::create([
        	'name' => 'Kennametal',
        	'short_name' => 'Kennametal',
    	]);

    	Client::create([
        	'name' => 'Thomas & Betts',
        	'short_name' => 'Thomas & Betts',
    	]);

    }
}
