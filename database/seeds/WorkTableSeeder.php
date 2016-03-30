<?php

use App\Client;
use App\Image;
use App\Work;
use App\WorkImage;
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
		DB::statement('SET FOREIGN_KEY_CHECKS=0;');
		DB::table('work_images')->truncate();
		DB::table('work')->truncate();
		DB::statement('SET FOREIGN_KEY_CHECKS=1;');

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
			$image_ids = array();
			for ($i = 0; $i < 3; $i++) {
				$image_path = $factory->image('resources/assets/images', 1731, 500);
				$image = Image::create([
					'path' => $image_path,
				]);
				$image_ids[] = $image->id;
			}

			$thumb_path = $factory->image('resources/assets/images', 340, 206);
			$thumb = Image::create([
				'path' => $thumb_path,
			]);

			$uri = Work::createUri($title);

			$body = implode("<br />", $factory->paragraphs());

			$work = Work::create([
				'uri' => $uri,
				'title' => $title,
				'body' => $body,
				'client' => Client::where('short_name', $client)->first()->id,
				'image' => $thumb->id,
			]);

			foreach ($image_ids as $image_id) {
				WorkImage::create([
					'image_id' => $image_id,
					'work_id' => $work->id,
				]);
			}
		}
	}
}
