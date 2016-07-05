<?php

namespace App;

use \File;
use \Storage;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['path', 'filename', 'alias', 'mimetype', 'extension', 'size', 'last_modified'];

    protected $appends = ['url'];

    public static function defaultDirectory()
    {
        return path_join(['app', 'public', 'images']);
    }

    /**
     * Get the blog associated with this image
     */
    public function blog()
    {
        return $this->hasOne('App\Blog');
    }

    /**
     * Get all of the blogs that are assigned this image
     */
    public function blogs()
    {
        return $this->morphedByMany('App\Blog', 'imageable');
    }

    /**
     * Get the client associated with this image
     */
    public function client()
    {
        return $this->hasOne('App\Client');
    }

    /**
     * Get the project associated with this image
     */
    public function project()
    {
        return $this->hasOne('App\Project');
    }

    /**
     * Get all of the projects that are assigned this image
     */
    public function projects()
    {
        return $this->morphedByMany('App\Project', 'imageable');
    }

    /**
     * Get the staff associated with this image
     */
    public function staff()
    {
        return $this->hasOne('App\Staff');
    }

    public static function createFromPath($path, $destination = false)
    {
        if (!$destination) {
            $destination = self::defaultDirectory();
        }

        return self::create([
            'path' => $destination,
            'filename' => File::basename($path),
            'alias' => File::basename($path),
            'mimetype' => File::mimeType($path),
            'extension' => File::extension($path),
            'size' => File::size($path),
            'last_modified' => File::lastModified($path)
        ]);
    }

    public static function createFromUrl($url, $destination)
    {
        $directory = storage_path($destination);

        $original_name = File::basename($url);
        $filename = self::availableFilename($original_name, $destination);
        $filepath = path_join([$directory, $filename]);

        $data = file_get_contents($url);
        File::put($filepath, $data);

        return self::createFromPath($filepath, $destination);
    }

    public static function createFromUpload($file, $destination, $target_name)
    {
        \Log::info('Image::createFromUpload ' . print_r(['file' => $file, 'destination' => $destination, 'target_name' => $target_name], true));
        $directory = storage_path($destination);

        $filename = self::availableFilename($target_name, $destination);
        $file->move($directory, $filename);

        return self::createFromPath(path_join([$directory, $filename]), $destination);
    }

    public static function availableFilename($filename, $directory = null)
    {
        if (!$directory) {
            $directory = self::defaultDirectory();
        }

        $directory = storage_path($directory);

        if ( !File::exists($directory) ) {
            File::makeDirectory($directory);
        }

        $parts = explode('.', $filename);
        $extension = array_pop($parts);
        $name = implode('.', $parts);

        $available = null;
        $i = -1;

        $candidate = $filename;

        while ($available === null) {
            if ($i >= 0) {
                $candidate = sprintf('%s_%d.%s', $name, $i, $extension);
            }

            if ( !File::exists(path_join([$directory, $candidate])) ) {
                $available = $candidate;
            }

            $i++;
        }

        return $available;
    }

    public function url() {
        $path = str_replace([self::defaultDirectory(), '\\'],['', '/'],$this->path) . '/' . $this->filename;

        return url('img' . $path);
    }

    public function getUrlAttribute() {
        return $this->url();
    }
}
