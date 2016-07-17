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
    return view('angular-dev');
});
Route::get('/admin/{page}', function () {
    return view('angular-dev');
});
Route::get('/admin/{page}/{subpage}', function () {
    return view('angular-dev');
});

Route::get('blogs', 'BlogController@all');
Route::get('blogs/metadata', 'BlogController@metadata');
Route::get('blogs/paged', 'BlogController@paged');
Route::get('blogs/recent', 'BlogController@recent');
Route::get('blogs/uri/{uri}', 'BlogController@getFromSlug');
Route::get('blogs/{id}', 'BlogController@get');
Route::get('blogs/related/{id}', 'BlogController@related');

Route::get('staff', 'StaffController@all');
Route::get('staff/{id}', 'StaffController@get');

Route::get('clients', 'ClientController@all');
Route::get('clients/paged', 'ClientController@paged');
Route::get('clients/featured', 'ClientController@featured');

Route::get('divisions/paged', 'DivisionController@paged');
Route::get('divisions/{id}', 'DivisionController@get');

Route::get('options/clients', 'ClientController@options');
Route::get('options/divisions', 'DivisionController@options');
Route::get('options/tags', 'TagController@options');

Route::get('projects', 'ProjectController@all');
Route::get('projects/paged', 'ProjectController@paged');
Route::get('projects/recent', 'ProjectController@recent');
Route::get('projects/uri/{uri}', 'ProjectController@getFromSlug');
Route::get('projects/{id}', 'ProjectController@get');

Route::get('img/{model}/{name}', 'ImageController@getPublic');

Route::get('settings', 'SettingsController@all');

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
Route::group([], function () {
    Route::post('blogs', 'BlogController@store');
    Route::put('blogs/{id}', 'BlogController@update');
    Route::post('blogs/update/{id}', 'BlogController@update');
    Route::delete('blogs/{id}', 'BlogController@remove');

    Route::post('divisions/{id}', 'DivisionController@update');

    Route::post('staff', 'StaffController@add');
    Route::put('staff/{id}', 'StaffController@put');
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


Route::get('test', function () {
    dd(App\Division::with('blogs', 'projects')->get()->toArray());
});