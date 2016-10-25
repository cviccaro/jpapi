<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use File;

use App\Http\Requests;

class UploadController extends Controller
{
    public function get(Request $request)
    {
        $path = storage_path(path_join(['app','public'])) . DIRECTORY_SEPARATOR . $request->path();

        if (File::exists($path)) {
            $file = File::get($path);
            $type = File::mimeType($path);

            $response = Response::make($file, 200);
            $response->header('Content-Type', $type);

            return $response;
        }

        abort(404);
    }

    public function browse(Request $request)
    {
        $files = File::files(storage_path('app/public'));

        return view('file-upload.browse', ['files' => $files]);
    }
}
