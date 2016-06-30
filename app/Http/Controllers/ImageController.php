<?php

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\File\File;

class ImageController extends Controller
{
    public function get(Request $request, $path)
    {
        $image_path = '/resources/assets/images/';
        $file_path = base_path() . $image_path . urldecode($path);

        try {
            $file = new File($file_path);
            return response(file_get_contents($file_path), 200, ['Content-Type' => $file->getMimeType()]);
        } catch (Exception $e) {
            abort(404);
        }
    }

    public function getClientImage(Request $request, $path) {
        return $this->get($request, 'clients/' . $path);
    }

    public function getPublic(Request $request, $path, $name)
    {
        $filepath = storage_path('app/public/images/' . $path . '/' . $name);

        if ( !\File::exists($filepath) ) abort(404);

        $file = \File::get($filepath);
        $type = \File::mimeType($filepath);

        $response = \Response::make($file, 200);
        $response->header('Content-Type', $type);

        return $response;
    }

    public function upload(Request $request)
    {
        $image_dir = 'resources/assets/images';
        $destination = base_path() . '/' . $image_dir;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            if ($image = Image::createFromUploaded($file)) {
                return response([
                    'filename' => basename($image['path']),
                    'url' => URL::to('images/' . basename($image['path'])),
                ]);
            } else {
                return response([
                    'error' => 'file_move_failed',
                ]);
            }
        }
        return response([
            'error' => 'no_file',
        ]);
    }

    public function uploadTemp(Request $request) {
        if ($request->hasFile('_file')) {
            \Log::info('Received request to upload temporary file.  Checking if it is valid.');

            if ($request->file('_file')->isValid()) {
                $input = $request->all();

                $file = $request->file('_file');

                \Log::info("File is valid.  Here's the request: ------- REQUEST START --------\r\n" . print_r($request->toArray(), true) . " ------ REQUEST END");

                $mimetype = $file->getMimeType();
                $size = $file->getSize();
                $tempName = basename($file->__toString());
                $original_name = $file->getClientOriginalName();
                $extension = $file->guessExtension();

                // $file->move(storage_path('temp'), $tempName);

                // DB::table('uploads')->insert([
                //     'location' => $tempName,
                //     'user_id' => $user->id,
                //     'extension' => $extension,
                //     'mimetype' => $mimetype,
                //     'size' => $size,
                //     'filename' => $original_name,
                //     'alias' => '',
                // ]);
                $token = \JWTAuth::getToken();

                \Log::info(print_r([
                    'location' => storage_path('temp', $tempName),
                    'extension' => $extension,
                    'mimetype' => $mimetype,
                    'size' => $size,
                    'filename' => $original_name,
                    'alias' => '',
                    'TOKEN' => $token
                ], true));

            } else {
                \Log::warn('File is invalid!');
            }
        }

        return response('No file to upload.', 400);
    }
}