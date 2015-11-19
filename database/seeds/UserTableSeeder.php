<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        User::create([
        	'name' => 'jpapi_admin',
        	'email' => 'cviccaro@jpenterprises.com',
        	'password' => Hash::make('ipapj')
    	]);
    }
}
