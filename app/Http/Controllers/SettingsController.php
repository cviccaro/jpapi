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
        \Log::info('Update settings: ' . print_r($request->toArray(), true));

        $setting_controls = $request->all();
        $files = $request->allFiles();

        $destination = path_join(['app', 'public', 'images', 'settings']);

        foreach ($setting_controls as $key => $control_value) {
            if ( !ends_with($key, '_file') ) {
                $model = Setting::where('name', $key)->first();

                \Log::info('Updating a setting: ' . print_r($model->toArray(), true));

                switch ($model->control_type) {
                    case 'file':
                        $managedFile = $request->get($model->name);
                        if (isset($files[$model->name]['_file'])) {
                            $file = $files[$model->name]['_file'];

                            $image = Image::createFromUpload($file, $destination, $managedFile);
                            $model->value = $image->id;
                        } else {
                            Image::find($model->value->id)->update($managedFile);
                        }
                        break;
                    default:
                        $model->value = $control_value;
                        break;
                }

                $model->save();
            }
        }

        return $this->all($request);
    }
}
