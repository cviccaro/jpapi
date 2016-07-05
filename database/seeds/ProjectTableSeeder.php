<?php
use Illuminate\Database\Seeder;
use Faker\Factory;

use App\Client;
use App\Image;
use App\Project;

class ProjectTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('projects')->truncate();
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

        $uploads_destination = path_join(['app', 'public', 'images', 'projects']);
        $destination = storage_path($uploads_destination);

        if ( !File::exists($destination) ) {
            File::makeDirectory($destination);
        }

        foreach ($seeds as $title => $client_alias) {
            $project = Project::create([
                'title' => $title,
                'description' => implode("<br />", $factory->paragraphs()),
            ]);

            $thumb_path = $factory->image($destination, 340, 206);
            $thumb = Image::createFromPath($thumb_path, $uploads_destination);
            $project->image()->associate($thumb)->save();

            $client = Client::where('alias', $client_alias)->first();
            $project->client()->associate($client)->save();

            for ($i = 0; $i < 3; $i++) {
                $image_path = $factory->image($destination, 1731, 500);
                $image = Image::createFromPath($image_path, $uploads_destination);
                $project->images()->save($image, ['weight' => $i * 5]);
            }
        }
    }
}
