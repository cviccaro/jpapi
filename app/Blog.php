<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use Sluggable;
    use PivotSort;

    public $fillable = ['title', 'summary', 'body', 'author'];

    public function divisions()
    {
        return $this->belongsToMany('App\Division')->withPivot('weight');
    }

    public function image()
    {
        return $this->belongsTo('App\Image');
    }

    public function images()
    {
        return $this->morphToMany('App\Image', 'imageable')->withPivot('weight');
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable')->withPivot('weight');
    }
}
