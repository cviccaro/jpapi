<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = ['first_name', 'last_name', 'title', 'email', 'bio'];

    protected $with = ['image'];

    protected $appends = ['full_name'];

    public function image()
    {
    	return $this->belongsTo('App\Image');
    }

    public function blogs()
    {
    	return $this->hasMany('App\Blog');
    }

    public function getFullNameAttribute()
    {
    	return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
    }
}
