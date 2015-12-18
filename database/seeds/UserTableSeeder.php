<?php

use Illuminate\Database\Seeder;
use App\User;

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
        User::create([
            'name' => 'sgebhart',
            'email' => 'sgebhart@jpenterprises.com',
            'password' => Hash::make('3Lu3d4T2')
        ]);
        User::create([
            'name' => 'jmaiers',
            'email' => 'jmaiers@jpenterprises.com',
            'password' => Hash::make('YE8yshwX')
        ]);
        User::create([
            'name' => 'pgarvey',
            'email' => 'pgarvey@jpenterprises.com',
            'password' => Hash::make('EYnHRc93')
        ]);
    }
}
