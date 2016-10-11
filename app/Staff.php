<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    public $with = ['image', 'image_small'];

    protected $fillable = ["first_name", "last_name", "title", "email", "phone", "linkedin", "active", "bio"];

    protected $appends = ['full_name'];

    public function image()
    {
        return $this->belongsTo('App\Image');
    }

    public function image_small()
    {
        return $this->belongsTo('App\Image', 'image_small_id');
    }

    public function blogs()
    {
        return $this->hasMany('App\Blog');
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function getFullNameAttribute()
    {
        return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
    }
}
