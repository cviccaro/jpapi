<?php
/*
|--------------------------------------------------------------------------
| Administration Routes
|--------------------------------------------------------------------------
| Routes for the angular administration app
|
*/
Route::get('/', function () {
    return View::make('welcome');
});

Route::get('/admin', function () {
    return view(env('ANGULAR_VIEW', 'angular'));
});
Route::get('/admin/{page}', function () {
    return view(env('ANGULAR_VIEW', 'angular'));
});
Route::get('/admin/{page}/{subpage}', function () {
    return view(env('ANGULAR_VIEW', 'angular'));
});

/*
|--------------------------------------------------------------------------
| API Routes (Public)
|--------------------------------------------------------------------------
| Delivers json responses of content
|
*/

// Blogs
Route::get('blogs', 'BlogController@all');
Route::get('blogs/metadata', 'BlogController@metadata');
Route::get('blogs/paged', 'BlogController@paged');
Route::get('blogs/recent', 'BlogController@recent');
Route::get('blogs/related/{id}', 'BlogController@related');
Route::get('blogs/uri/{uri}', 'BlogController@getFromSlug');
Route::get('blogs/{id}', 'BlogController@get');

// Staff
Route::get('staff', 'StaffController@all');
Route::get('staff/active', 'StaffController@active');
Route::get('staff/metadata', 'StaffController@metadata');
Route::get('staff/{id}', 'StaffController@get');

// Clients
Route::get('clients', 'ClientController@all');
Route::get('clients/metadata', 'ClientController@metadata');
Route::get('clients/paged', 'ClientController@paged');
Route::get('clients/featured', 'ClientController@featured');

// Divisions
Route::get('divisions/paged', 'DivisionController@paged');
Route::get('divisions/metadata', 'DivisionController@metadata');
Route::get('divisions/{id}', 'DivisionController@get');

// Projects
Route::get('projects', 'ProjectController@all');
Route::get('projects/metadata', 'ProjectController@metadata');
Route::get('projects/paged', 'ProjectController@paged');
Route::get('projects/recent', 'ProjectController@recent');
Route::get('projects/uri/{uri}', 'ProjectController@getFromSlug');
Route::get('projects/{id}', 'ProjectController@get');

// Images
Route::get('img/{model}/{name}', 'ImageController@getPublic');

// Uploads
Route::get('uploads/{any}', 'UploadController@get')->where('any', '.*');

// Main Site Settings
Route::get('settings', 'SettingsController@all');

// Select Option Lists
Route::get('options/clients', 'ClientController@options');
Route::get('options/divisions', 'DivisionController@options');
Route::get('options/tags', 'TagController@options');
Route::get('options/staff', 'StaffController@options');

// Contact Form
Route::post('contact-form-submit', 'SubmissionController@submit');
Route::post('recaptcha/validate', 'SubmissionController@validateRecaptcha');

// RSS Feeds
Route::get('rss/blogs', 'BlogController@rss');

/*
|--------------------------------------------------------------------------
| API Routes (Requires Authorization)
|--------------------------------------------------------------------------
| Create, update, and delete content
|
*/

// Authorization
Route::group(['namespace' => 'Auth'], function () {
    Route::post('authenticate', 'AuthController@authenticate');
    Route::get('authenticate/refresh', 'AuthController@refresh');
    Route::get('authenticate/check', 'AuthController@check');
});

// Authorized
Route::group(['middleware' => ['jwt.auth','jwt.refresh']], function () {
    Route::post('blogs', 'BlogController@store');
    Route::put('blogs/{id}', 'BlogController@update');
    Route::post('blogs/update/{id}', 'BlogController@update');
    Route::delete('blogs/{id}', 'BlogController@remove');

    Route::post('divisions/{id}', 'DivisionController@update');

    Route::post('staff', 'StaffController@store');
    Route::post('staff/update/{id}', 'StaffController@update');
    Route::delete('staff/{id}', 'StaffController@remove');

    Route::post('clients', 'ClientController@store');
    Route::post('clients/update/{id}', 'ClientController@update');
    Route::delete('clients/{id}', 'ClientController@remove');

    Route::post('projects', 'ProjectController@store');
    Route::put('projects/{id}', 'ProjectController@update');
    Route::post('projects/update/{id}', 'ProjectController@update');
    Route::delete('projects/{id}', 'ProjectController@remove');

    Route::post('settings', 'SettingsController@updateMany');

    Route::post('upload/image', 'ImageController@uploadTemp');
});

Route::get('file-upload/browse', 'UploadController@browse');