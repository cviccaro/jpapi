<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Staff;
use App\Image;
use Illuminate\Http\Request;

class StaffController extends Controller {
  use RESTActions;

  const MODEL = 'App\Staff';

  public function all(Request $request) {
    return Staff::orderBy('last_name', 'ASC')->get();
  }

  public function active(Request $request) {
    return Staff::active()->orderBy('last_name', 'ASC')->get();
  }

  /**
   * Display the staff in a format consumable
   * by HTMLOptionElements
   *
   * @return Response
   */
  public function options(Request $request)
  {
      $list = Staff::all();

      $data = [];

      foreach($list as $model) {
        $data[] = ['label' => $model->full_name, 'value' => $model->id];
      }

      return $this->respond('done', $data);
  }

  public function update(Request $request, $id)
  {
    $destination = path_join(['app', 'public', 'images', 'staff']);

    $person = Staff::findOrFail($id);

    $files = $request->allFiles();
    $collect = ["first_name", "last_name", "title", "email", "phone", "linkedin", "active", "bio"];
    foreach ($collect as $attribute) {
        if ($request->has($attribute)) {
            $person->{$attribute} = $request->get($attribute);
        }
    }

    if ($request->get('image') === '') {
        $person->image()->dissociate();
    } elseif ($request->has('image')) {
        $managedFile = $request->get('image');
        if (isset($files['image']['_file'])) {
            $file = $files['image']['_file'];

            $image = Image::createFromUpload($file, $destination, $managedFile);
            $person->image()->associate($image);
        } else {
            Image::find($person->image->id)->update($managedFile);
        }
    }

    if ($request->get('image_small') === '') {
        $person->image_small()->dissociate();
    } elseif ($request->has('image_small')) {
        $managedFile = $request->get('image_small');
        if (isset($files['image_small']['_file'])) {
            $file = $files['image_small']['_file'];

            $image_small = Image::createFromUpload($file, $destination, $managedFile);
            $person->image_small()->associate($image_small);
        } else {
            Image::find($person->image_small->id)->update($managedFile);
        }
    }

    $person->save();

    return $this->get($person->id);
  }

  /**
   * Create a new person
   *
   * @return Response
   */
  public function store(Request $request)
  {
    \Log::info('Received request to create staff');

    $destination = path_join(['app', 'public', 'images', 'staff']);

    $person = new Staff();

    $files = $request->allFiles();
    $collect = ["first_name", "last_name", "title", "email", "phone", "linkedin", "active", "bio"];
    foreach ($collect as $attribute) {
        if ($request->has($attribute)) {
            $person->{$attribute} = $request->get($attribute);
        }
    }

    if ($request->has('image') && isset($files['image']['_file'])) {
        $managedFile = $request->get('image');
        $file = $files['image']['_file'];

        $image = Image::createFromUpload($file, $destination, $managedFile);
        $person->image()->associate($image);
    }

    $person->save();

    return $this->get($person->id);
  }


  /**
   * Metadata about the blogs stored in DB
   */
  public function metadata(Request $request) {
    $m = self::MODEL;

    $metadata = [];

    $metadata['count'] = $m::count();
    $metadata['newest'] = $m::orderBy('created_at', 'DESC')->first();
    $metadata['images'] = $m::has('image')->count();
    $metadata['active'] = $m::active()->count();
    $metadata['update'] = $m::orderBy('updated_at', 'desc')->take(1)->get()->first()->updated_at->getTimestamp();

    return $this->respond('done', $metadata);
  }
}
