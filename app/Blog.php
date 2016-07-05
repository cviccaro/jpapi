<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
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

    public function sortPivot($field_name)
    {
        return $this->{$field_name}->sort(function($a, $b) {
            return $a->pivot->weight > $b->pivot->weight;
        });
    }
}
