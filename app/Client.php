<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    public $with = ['image'];

    public function projects()
    {
        return $this->hasMany('App\Project');
    }

    public function image() {
        return $this->belongsTo('App\Image');
    }
}
