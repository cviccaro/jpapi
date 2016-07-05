<?php

namespace App\Queue;

use App\Staff;
use App\Image;

class StaffQueue {
    public function fire($job, $data) {
        \Log::info('Creating staff from data: ' . print_r($data, true));
        // Create staff from data
        $full_name = explode(' ', $data['full_name']);
        $first_name = array_shift($full_name);
        $last_name = implode(' ', $full_name);
        $email = $data['email'];
        $linkedin = isset($data['linkedin']['url']) ? $data['linkedin']['url'] : null;
        $occupation = $data['occupation'];

        $staff = Staff::create([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'linkedin' => $linkedin,
            'occupation' => $occupation,
        ]);

        // Create image
        $uploads_destination = path_join(['app', 'public', 'images', 'staff']);
        $destination = storage_path($uploads_destination);

        $image_path = resource_path(path_join(['assets', 'images', 'staff-placeholder-' . rand(1, 3) . '_0.jpg']));
        $image = Image::createFromPath($image_path, $uploads_destination);

        // Associate
        $staff->image()->associate($image)->save();

        $job->delete();
    }
}