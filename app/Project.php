<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    public function divisions()
    {
        return $this->belongsToMany('App\Division');
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
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function sortImages()
    {
        return $this->images->sort(function($a, $b) {
            return $a->pivot->weight > $b->pivot->weight;
        });
    }
}
