<?php namespace App;

trait PivotSort {
    public function sortPivot($field_name)
    {
        return $this->{$field_name}->sort(function($a, $b) {
            return $a->pivot->weight > $b->pivot->weight;
        });
    }
}