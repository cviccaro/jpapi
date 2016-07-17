<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use MostUsed;

    public $fillable = ['name', 'description'];

    /**
     * Get all of the blogs that are assigned this tag
     */
    public function blogs()
    {
        return $this->morphedByMany('App\Blog', 'taggable');
    }

    /**
     * Get all of the projects that are assigned this tag
     */
    public function projects()
    {
        return $this->morphedByMany('App\Project', 'taggable');
    }
}
