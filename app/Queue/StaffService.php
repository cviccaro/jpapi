<?php

namespace App\Queue;

use App\Staff;
use App\Image;

class StaffService {
    public function fire($job, $data) {
        $full_name = explode(' ', $data['full_name']);
        $first_name = array_shift($full_name);
        $last_name = implode(' ', $full_name);
        $email = $data['email'];
        $linkedin = isset($data['linkedin']['url']) ? $data['linkedin']['url'] : null;
        $occupation = $data['occupation'];

        // Process image from field
        $image = null;
        // if (isset($data['image'])) {
        //  $image = $this->makeImage($data['image']);
        // }
        // else {
        $filename = 'staff-placeholder-' . rand(1, 3) . '_0.jpg';
        $image = $this->makeImage(resource_path('assets/images/' . $filename));
        // }

        $staff = Staff::create([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'linkedin' => $linkedin,
            'occupation' => $occupation,
            'image' => $image ? $image->id  : null
        ]);
        $job->delete();
    }

    public function makeImage($url = false)
    {
        $uploads_destination = 'app/public/images/staff';
        $destination = storage_path($uploads_destination);
        if (!\File::exists($destination)) {
            \File::makeDirectory($destination);
        }

        if ($url) {
            $original_name = basename($url);
            $data = file_get_contents($url);

            $filename = Image::availableFilename($original_name, $destination);
            $filepath = $destination . '/' . $filename;

            \File::put($filepath, $data);

            $extension = \File::extension($filepath);
            $mimetype = \File::mimeType($filepath);
            $size = \File::size($filepath);
        } else {
            $faker = \Faker\Factory::create();

            $filepath = $faker->image($destination, 340, 206);

            $filepath = str_replace("\\", "/", $filepath);
            $filename = $original_name = basename($filepath);

            $extension = \File::extension($filepath);
            $mimetype = \File::mimeType($filepath);
            $size = \File::size($filepath);
        }

        $image = Image::create([
            'path' => $uploads_destination,
            'name' => $filename,
            'alias' => $original_name,
            'extension' => $extension,
            'mimetype' => $mimetype,
            'size' => $size,
        ]);

        return $image;
    }
}