<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Image extends Model {

    protected $fillable = ["path", "name", "alias", "last_modified", "size"];

    protected $dates = [];

    public static $rules = [
        // "path" => "required",
        "name" => "required"
    ];

    public function scopeNamed($query, $name) {
        return $query->where('path', 'LIKE', '%'.$name.'%')->get();
    }

    // public static function createFromUploaded(UploadedFile $file) {
    //     $image_dir = 'resources/assets/images';
    //     $destination = base_path() . '/' . $image_dir;

    //     $filename = $file->getClientOriginalName();
    //     if (static::named($filename)->first() !== NULL) {
    //         $filename = static::findCandidateFilename($filename);
    //     }

    //     if ($moved = $file->move($destination, $filename)) {
    //         return static::create([
    //             'path' => $image_dir . '/' . $filename
    //         ]);
    //     }

    //     return FALSE;
    // }

    // public static function createFromBase64($filename, $base64_string) {
    //     $filename = static::findCandidateFilename($filename);

    //     $img_data = explode(',', $base64_string);
    //     $dir = 'resources/assets/images';
    //     $realpath = realpath(base_path() . '/' . $dir) . '/' . $filename;
    //     $path = $dir . '/' . $filename;

    //     $base64 = count($img_data) > 1 ? $img_data[1] : $base64_string;

    //     if (file_put_contents($realpath, base64_decode($base64))) {
    //         return static::create([
    //             'path' => $path
    //         ]);
    //     }
    //     return FALSE;
    // }

    // public static function findCandidateFilename($filename) {
    //     $name_parts = explode('.',$filename);
    //     $extension = array_pop($name_parts);
    //     $continue = true;
    //     $i = 0;
    //     while ($continue) {
    //         $candidate_name = implode('.', $name_parts) . '_' . $i++ . '.' . $extension;
    //         if (static::named($candidate_name)->first() === NULL) {
    //             $continue = false;
    //             $filename = $candidate_name;
    //         }
    //     }
    //     return $filename;
    // }
}
