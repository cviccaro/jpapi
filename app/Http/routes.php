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

Route::get('/', function() {
    return Redirect::to('/admin');
});
Route::get('/admin', function () {
    return view('welcome');
});
Route::get('/admin/{page}', function () {
    return view('welcome');
});
Route::get('/admin/{page}/{subpage}', function () {
    return view('welcome');
});

Route::get('blog', 'BlogsController@all');
Route::get('blogs/paged', 'BlogsController@paged');
Route::get('blog/recent', 'BlogsController@recent');
Route::get('blog/uri/{uri}', 'BlogsController@getFromUri');
Route::get('blog/{id}', 'BlogsController@get');
Route::get('blog-related/{id}', 'BlogsController@getRelated');

Route::get('staff', 'StaffController@all');
Route::get('staff/{id}', 'StaffController@get');

Route::get('clients', 'ClientController@all');
Route::get('clients/featured', 'ClientController@featured');
Route::get('clients/{id}', 'ClientController@get');

Route::get('work', 'WorkController@all');
Route::get('work/paged', 'WorkController@paged');
Route::get('work/recent', 'WorkController@recent');
Route::get('work/uri/{uri}', 'WorkController@getFromUri');
Route::get('work/{id}', 'WorkController@get');

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

Route::group(['middleware' => 'jwt.refresh'], function () {
    Route::post('blog', 'BlogsController@add');
    Route::put('blog/{id}', 'BlogsController@put');
    Route::delete('blog/{id}', 'BlogsController@remove');

    Route::post('staff', 'StaffController@add');
    Route::put('staff/{id}', 'StaffController@put');
    Route::delete('staff/{id}', 'StaffController@remove');

    Route::post('work', 'WorkController@add');
    Route::put('work/{id}', 'WorkController@put');
    Route::delete('work/{id}', 'WorkController@remove');
});
