<?php

use App\Client;
use App\Image;
use App\Work;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkTableSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		DB::table('work')->truncate();

		$factory = Faker\Factory::create();

		$seeds = array(
			'Innovations Catalog' => 'Kennametal',
			'2014 Print Contest' => 'Adobe',
			'TANDBERG Misc. Product Collateral' => 'Cisco',
			'Showtime Catalog' => 'Cicci',
			'Cable Tie Installation Tool Packaging' => 'Thomas and Betts',
			'Sample Project 1' => 'Kennametal',
			'Sample Project 2' => 'Adobe',
			'Sample Project 3' => 'Cisco',
			'Sample Project 4' => 'Cicci',
			'Sample Project 5' => 'Fisher Scientific',
			'Sample Project 6' => 'Henry Schein',
			'Sample Project 7' => 'Kobold',
			'Sample Project 8' => 'LA Turbine',
			'Sample Project 9' => 'NetworkKing',
			'Sample Project 10' => 'Quantum',
			'Sample Project 11' => 'WESCO',
			'Sample Project 12' => 'Adobe',
			'Sample Project 13' => 'Cisco',
		);

		foreach ($seeds as $title => $client) {
			$image_path = $factory->image('resources/assets/images', 340, 206);
			$image = Image::create([
				'path' => $image_path,
			]);

			$uri = Work::createUri($title);

			$body = implode("<br />", $factory->paragraphs());

			Work::create([
				'uri' => $uri,
				'title' => $title,
				'body' => $body,
				'client' => Client::where('short_name', $client)->first()->id,
				'image' => $image->id,
			]);
		}
	}
}
