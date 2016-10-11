<?php

namespace App;

use \File;
use \Storage;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['path', 'filename', 'alias', 'description', 'mimetype', 'extension', 'size', 'last_modified'];

    protected $appends = ['url'];

    protected $dates = ['last_modified', 'created_at', 'updated_at'];

    /**
     * Default storage directory
     * @return string
     */
    protected static function defaultDirectory()
    {
        return path_join(['app', 'public', 'images']);
    }

    /**
     * The blog associated with this image
     */
    public function blog()
    {
        return $this->hasOne('App\Blog');
    }

    /**
     * The blogs that are assigned this image
     */
    public function blogs()
    {
        return $this->morphedByMany('App\Blog', 'imageable');
    }

    /**
     * The client associated with this image
     */
    public function client()
    {
        return $this->hasOne('App\Client');
    }

    /**
     * The division associated with this image
     */
    public function division()
    {
        return $this->hasOne('App\Division');
    }

    /**
     * The project associated with this image
     */
    public function project()
    {
        return $this->hasOne('App\Project');
    }

    /**
     * The projects that are assigned this image
     */
    public function projects()
    {
        return $this->morphedByMany('App\Project', 'imageable');
    }

    /**
     * The staff associated with this image
     */
    public function staff()
    {
        return $this->hasOne('App\Staff');
    }

    /**
     * Store a new record for a managed image
     * @param  string $path
     * @param  array  $attributes
     * @return Image
     */
    public static function manage($path, $attributes = array())
    {
        \Log::info('Image::manage ' . print_r(func_get_args(), true));

        $defaults = [
            'path' => self::defaultDirectory(),
            'filename' => File::basename($path),
            'alias' => File::basename($path),
            'description' => '',
            'mimetype' => File::mimeType($path),
            'extension' => File::extension($path),
            'size' => File::size($path),
            'last_modified' => File::lastModified($path)
        ];

        $attributes = array_merge($defaults, $attributes);

        return self::create($attributes);
    }

    /**
     * Create a new
     * @param  [type] $url         [description]
     * @param  [type] $destination [description]
     * @return [type]              [description]
     */
    public static function createFromUrl($url, $destination)
    {
        $directory = storage_path($destination);

        $original_name = File::basename($url);
        $filename = self::availableFilename($original_name, $destination);
        $filepath = path_join([$directory, $filename]);

        $data = file_get_contents($url);
        File::put($filepath, $data);

        return self::manage($filepath, ['path' => $destination, 'alias' => $original_name]);
    }

    public static function createFromUpload($upload, $destination, array $attributes = array())
    {
        \Log::info('Image::createFromUpload ' . print_r(func_get_args(), true));

        $target_name = $upload->getClientOriginalName();
        $filename = self::availableFilename($target_name, $destination);

        $directory = storage_path($destination);
        $filepath = path_join([$directory, $filename]);

        $upload->move($directory, $filename);

        $attributes['path'] = $destination;
        $attributes['alias'] = $target_name;
        $attributes['filename'] = $filename;
        if (isset($attributes['last_modified'])) {
            $attributes['last_modified'] = Carbon::createFromTimestamp($attributes['last_modified'] / 1000);
        }
        return self::manage($filepath, $attributes);
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
        if (preg_match('/app\/public\//', $this->path)) {
            $path = str_replace('app/public/images', '', $this->path) . '/' . $this->filename;
        } else {
            $path = str_replace(['app\public\images', '\\'],['', '/'],$this->path) . '/' . $this->filename;
        }
        
        return url('img' . $path);
    }

    public function getUrlAttribute() {
        return $this->url();
    }
}
