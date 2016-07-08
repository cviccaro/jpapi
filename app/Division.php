<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $fillable = ['name'];

    protected $with = ['image'];

    public function blogs()
    {
        return $this->belongsToMany('App\Blog')->withPivot('weight');
    }

    public function projects()
    {
        return $this->belongsToMany('App\Project')->withPivot('weight');
    }

    public function image()
    {
        return $this->belongsTo('App\Image');
    }
}
