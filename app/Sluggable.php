<?php namespace App;

use Illuminate\Http\Request;

trait Sluggable {
    function __construct() {
        if (isset($this->appends)) {
            $this->appends[] = 'uri';
        } else {
            $this->appends = ['uri'];
        }
    }

    public function getUriAttribute() {
        $title = false;
        if (isset($this->attributes['title'])) {
            $title = $this->attributes['title'];
        } elseif (isset($this->attributes['name'])) {
            $title = $this->attributes['name'];
        }

        return !$title ?: str_slug($title);
    }
}