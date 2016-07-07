<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    public $with = ['image'];

    protected $fillable = ["first_name", "last_name", "title", "email", "phone", "linkedin"];

    public function image()
    {
        return $this->belongsTo('App\Image');
    }
}
