<?php namespace App;

trait MostUsed {
    /**
     * Get the most used division on a model
     * @param  string Model name
     * @return Division division
     */
    public static function mostUsed($model) {
        switch($model) {
            case 'App\Blog':
                $model_property = 'blogs';
                break;
            case 'App\Project':
                $model_property = 'projects';
                break;
        }

        return self::withCount($model_property)->orderBy($model_property . '_count', 'DESC')->first();
    }
}