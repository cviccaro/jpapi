<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $fillable = ['name'];

    public function blogs()
    {
        return $this->hasMany('App\Blog');
    }

    public function projects()
    {
        return $this->hasMany('App\Project');
    }
}
