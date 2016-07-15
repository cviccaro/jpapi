<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Image;
use App\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    const MODEL = 'App\Settings';

    use RESTActions;

    public function all(Request $request)
    {
        $settings = Setting::all();
        return $this->respond('done', $settings);
    }

    public function updateMany(Request $request)
    {
        $settings = $request->all();

        $destination = path_join(['app', 'public', 'images', 'settings']);

        foreach ($settings as $key => $setting) {
            $model = Setting::where('name', $key)->first();

            switch ($model->control_type) {
                case 'file':
                    $file = $request->file($model->name);

                    if ($model->type === 'image') {
                        $filename = $file->getClientOriginalName();

                        $image = Image::createFromUpload($file, $destination, $filename);

                        $model->value = $image->id;
                    }
                    break;
                case 'text':
                    $model->value = $setting;
                    break;
            }

            $model->save();
        }

        return $this->all($request);
    }
}
