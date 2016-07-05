<?php

use Illuminate\Database\Seeder;

use App\Client;
use App\Image;

class ClientTableSeeder extends Seeder {

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('clients')->truncate();
        DB::table('images')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $image_current_location = resource_path(path_join(['assets', 'images', 'clients']));
        $image_destination = path_join(['app', 'public', 'images', 'clients']);

        $clients = [
            [
                'name' => 'Adobe',
                'alias' => 'Adobe',
                'featured' => TRUE,
            ],
            [
                'name' => 'Cicci Dance Studio',
                'alias' => 'Cicci',
                'featured' => TRUE,
            ],
            [
                'name' => 'Cisco Systems',
                'alias' => 'Cisco',
                'featured' => TRUE,
            ],
            [
                'name' => 'Fisher Scientific',
                'alias' => 'Fisher Scientific',
                'featured' => TRUE,
            ],
            [
                'name' => 'Galls',
                'alias' => 'Galls',
                'featured' => FALSE,
            ],
            [
                'name' => 'Henry Schein',
                'alias' => 'Henry Schein',
                'featured' => TRUE,
            ],
            [
                'name' => 'Kennametal',
                'alias' => 'Kennametal',
                'featured' => TRUE,
            ],
            [
                'name' => 'Kobold',
                'alias' => 'Kobold',
                'featured' => TRUE,
            ],
            [
                'name' => 'LA Turbine',
                'alias' => 'LA Turbine',
                'featured' => TRUE,
            ],
            [
                'name' => 'NetworkKing',
                'alias' => 'NetworkKing',
                'featured' => TRUE,
            ],
            [
                'name' => 'Thomas and Betts',
                'alias' => 'Thomas and Betts',
                'featured' => TRUE,
            ],
            [
                'name' => 'Quantum',
                'alias' => 'Quantum',
                'featured' => TRUE,
            ],
            [
                'name' => 'WESCO',
                'alias' => 'WESCO',
                'featured' => TRUE,
            ],
        ];

        foreach ($clients as $data) {
            $client = Client::create($data);

            $image_path = path_join([$image_current_location, $data['alias'] . '.png']);

            if (file_exists($image_path)) {
                $image = Image::createFromUrl($image_path, $image_destination);

                $client->image()->associate($image)->save();
            }
        }
    }

}