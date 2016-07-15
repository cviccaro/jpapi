<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['name', 'label', 'description', 'control_type', 'type', 'value'];

    public function getValueAttribute()
    {
        if ($this->attributes['control_type'] === 'file' && $this->attributes['type'] === 'image' && !empty($this->attributes['value'])) {
            return Image::find($this->attributes['value']);
        }

        return $this->attributes['value'];
    }
}
