<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/', function () {
    return View::make('welcome');
});

Route::get('/admin', function () {
    return view('angular');
});
Route::get('/admin/{page}', function () {
    return view('angular');
});
Route::get('/admin/{page}/{subpage}', function () {
    return view('angular');
});


Route::get('blogs', 'BlogController@all');
Route::get('blogs/paged', 'BlogController@paged');
Route::get('blogs/recent', 'BlogController@recent');
Route::get('blogs/uri/{uri}', 'BlogController@getFromUri');
Route::get('blogs/{id}', 'BlogController@get');
// Route::get('blog-related/{id}', 'BlogController@getRelated');

// Route::get('staff', 'StaffController@all');
// Route::get('staff/{id}', 'StaffController@get');

// Route::get('clients', 'ClientController@all');
// Route::get('clients/featured', 'ClientController@featured');
// Route::get('clients/{id}', 'ClientController@get');

Route::get('options/clients', 'ClientController@options');

Route::get('projects', 'ProjectController@all');
Route::get('projects/paged', 'ProjectController@paged');
Route::get('projects/recent', 'ProjectController@recent');
Route::get('projects/uri/{uri}', 'ProjectController@getFromUri');
Route::get('projects/{id}', 'ProjectController@get');

// Route::get('images/{path}', 'ImageController@get');
// Route::get('images/clients/{path}', 'ImageController@getClientImage');

Route::get('img/{model}/{name}', 'ImageController@getPublic');

/*
|--------------------------------------------------------------------------
| Authorized routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::group(['namespace' => 'Auth'], function () {
    Route::post('authenticate', 'AuthController@authenticate');
    Route::get('authenticate/refresh', 'AuthController@refresh');
    Route::get('authenticate/check', 'AuthController@check');
});

// Route::group(['middleware' => ['jwt.auth','jwt.refresh']], function () {
Route::group([], function() {
    //Route::post('blog', 'BlogController@add');
    Route::put('blogs/{id}', 'BlogController@update');
    Route::post('blogs/update/{id}', 'BlogController@update');
    Route::delete('blogs/{id}', 'BlogController@remove');

    Route::post('staff', 'StaffController@add');
    Route::put('staff/{id}', 'StaffController@put');
    Route::delete('staff/{id}', 'StaffController@remove');

    //Route::post('projects', 'ProjectController@create');
    Route::put('projects/{id}', 'ProjectController@update');
    Route::post('projects/update/{id}', 'ProjectController@update');
    Route::delete('projects/{id}', 'ProjectController@remove');

    Route::post('upload/image', 'ImageController@uploadTemp');
});

Route::resource("blogs","BlogController");
Route::resource("projects","ProjectController");
Route::resource("clients","ClientController");
Route::resource("divisions","DivisionController");
Route::resource("staff","StaffController");
Route::resource("tags","TagController");
Route::resource("images","ImageController");

Route::get('test', function() {
    $blog = App\Blog::with('divisions', 'image', 'images', 'tags')->find(1);
    $attributes = $blog->attributesToArray();

    foreach($attributes as $key => $val) {
        dump(['key' => $key, 'val' => $val]);
    }

    return Response::make('');
});