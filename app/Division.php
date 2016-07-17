<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use MostUsed;

    protected $fillable = ['name'];

    protected $with = ['image'];

    /**
     * Blogs with this division attached
     */
    public function blogs()
    {
        return $this->belongsToMany('App\Blog')->withPivot('weight');
    }

    /**
     * Projects with this division attached
     */
    public function projects()
    {
        return $this->belongsToMany('App\Project')->withPivot('weight');
    }

    /**
     * Image associated with this Division
     */
    public function image()
    {
        return $this->belongsTo('App\Image');
    }
}
