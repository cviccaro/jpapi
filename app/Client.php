<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use MostUsed;

    public $with = ['image'];

    /**
     * Get the projects attached to the client
     */
    public function projects()
    {
        return $this->hasMany('App\Project');
    }

    /**
     * Get the image associated with the client
     */
    public function image()
    {
        return $this->belongsTo('App\Image');
    }

    /**
     * Scope a query to only include featured clients.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query) {
        return $query->where('featured', 1);
    }
}
