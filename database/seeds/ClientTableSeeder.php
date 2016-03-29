<?php

use App\Client;
use App\Image;
use Illuminate\Database\Seeder;

class ClientTableSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		DB::table('clients')->truncate();

		$clients = array(
			array(
				'name' => 'Adobe',
				'short_name' => 'Adobe',
				'featured' => TRUE,
			),
			array(
				'name' => 'Cicci Dance Studio',
				'short_name' => 'Cicci',
				'featured' => TRUE,
			),
			array(
				'name' => 'Cisco Systems',
				'short_name' => 'Cisco',
				'featured' => TRUE,
			),
			array(
				'name' => 'Fisher Scientific',
				'short_name' => 'Fisher Scientific',
				'featured' => TRUE,
			),
			array(
				'name' => 'Galls',
				'short_name' => 'Galls',
				'featured' => FALSE,
			),
			array(
				'name' => 'Henry Schein',
				'short_name' => 'Henry Schein',
				'featured' => TRUE,
			),
			array(
				'name' => 'Kennametal',
				'short_name' => 'Kennametal',
				'featured' => TRUE,
			),
			array(
				'name' => 'Kobold',
				'short_name' => 'Kobold',
				'featured' => TRUE,
			),
			array(
				'name' => 'LA Turbine',
				'short_name' => 'LA Turbine',
				'featured' => TRUE,
			),
			array(
				'name' => 'NetworkKing',
				'short_name' => 'NetworkKing',
				'featured' => TRUE,
			),
			array(
				'name' => 'Thomas and Betts',
				'short_name' => 'Thomas and Betts',
				'featured' => TRUE,
			),
			array(
				'name' => 'Quantum',
				'short_name' => 'Quantum',
				'featured' => TRUE,
			),
			array(
				'name' => 'WESCO',
				'short_name' => 'WESCO',
				'featured' => TRUE,
			),
		);

		foreach ($clients as $client) {
			$image_path = app()->basePath() . '/resources/assets/images/clients/' . $client['short_name'] . '.png';

			if (file_exists($image_path)) {
				$image = Image::create([
					'path' => $image_path,
				]);
				$client['image'] = $image->id;

			}

			Client::create($client);
		}

	}
}
