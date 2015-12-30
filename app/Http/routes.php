<?php

use App\Blog;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
	d(Blog::whereNotNull('image')->count());
    return '';
});


$app->group(['namespace' => 'App\Http\Controllers\Auth'], function($app) {
    $app->post('authenticate', 'AuthController@authenticate');
    $app->get('authenticate/refresh','AuthController@refresh');
});

/**
 * Routes for resource blog
 */
$app->group(['namespace' => 'App\Http\Controllers'], function($app) {
	$app->get('blog', 'BlogsController@all');
	$app->get('blog/recent', 'BlogsController@recent');
	$app->get('blog/{id}', 'BlogsController@get');
});
$app->group(['namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.auth'], function($app) {
	$app->post('blog', 'BlogsController@add');
	$app->put('blog/{id}', 'BlogsController@put');
	$app->delete('blog/{id}', 'BlogsController@remove');
});

/**
 * Routes for resource staff
 */
$app->group(['namespace' => 'App\Http\Controllers'], function($app) {
	$app->get('staff', 'StaffController@all');
	$app->get('staff/{id}', 'StaffController@get');
});
$app->group(['namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.auth'], function($app) {
	$app->post('staff', 'StaffController@add');
	$app->put('staff/{id}', 'StaffController@put');
	$app->delete('staff/{id}', 'StaffController@remove');
});

/**
 * Routes for resource work
 */
$app->group(['namespace' => 'App\Http\Controllers'], function($app) {
	$app->get('work', 'WorkController@all');
	$app->get('work/{id}', 'WorkController@get');
});
$app->group(['namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.auth'], function($app) {
	$app->post('work', 'WorkController@add');
	$app->put('work/{id}', 'WorkController@put');
	$app->delete('work/{id}', 'WorkController@remove');
});

/**
 * Routes for Metadata
 */
$app->get('meta/blog/category', 'BlogsController@getCategories');

/**
 * Images
 */
$app->post('upload', [
	'middleware' => 'jwt.auth',
	'namespace' => 'App\Http\Controllers',
	'uses' => 'ImageController@upload'
]);
$app->get('images/{path}', ['namespace' => 'App\Http\Controllers', 'uses' => 'ImageController@get']);
