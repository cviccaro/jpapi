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
	echo app()->basePath();
	return '';
});

$app->group(['namespace' => 'App\Http\Controllers\Auth'], function ($app) {
	$app->post('authenticate', 'AuthController@authenticate');
	$app->get('authenticate/refresh', 'AuthController@refresh');
	$app->get('authenticate/check', 'AuthController@check');
});

/**
 * Routes for resource blog
 */
$app->group(['namespace' => 'App\Http\Controllers'], function ($app) {
	$app->get('blog', 'BlogsController@all');
	$app->get('blog/recent', 'BlogsController@recent');
	$app->get('blog/uri/{uri}', 'BlogsController@getFromUri');
	$app->get('blog/{id}', 'BlogsController@get');
	$app->get('blog-related/{id}', 'BlogsController@getRelated');
});
$app->group(['namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.refresh'], function ($app) {
	$app->post('blog', 'BlogsController@add');
	$app->put('blog/{id}', 'BlogsController@put');
	$app->delete('blog/{id}', 'BlogsController@remove');
});

/**
 * Routes for resource staff
 */
$app->group(['namespace' => 'App\Http\Controllers'], function ($app) {
	$app->get('staff', 'StaffController@all');
	$app->get('staff/{id}', 'StaffController@get');
});
$app->group(['namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.refresh'], function ($app) {
	$app->post('staff', 'StaffController@add');
	$app->put('staff/{id}', 'StaffController@put');
	$app->delete('staff/{id}', 'StaffController@remove');
});

/**
 * Routes for resource staff
 */
$app->group(['namespace' => 'App\Http\Controllers'], function ($app) {
	$app->get('clients', 'ClientController@all');
	$app->get('clients/featured', 'ClientController@featured');
	$app->get('clients/{id}', 'ClientController@get');
});
// $app->group(['namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.refresh'], function ($app) {
// 	$app->post('staff', 'StaffController@add');
// 	$app->put('staff/{id}', 'StaffController@put');
// 	$app->delete('staff/{id}', 'StaffController@remove');
// });

/**
 * Routes for resource work
 */
$app->group(['namespace' => 'App\Http\Controllers'], function ($app) {
	$app->get('work', 'WorkController@all');
	$app->get('work/recent', 'WorkController@recent');
	$app->get('work/uri/{uri}', 'WorkController@getFromUri');
	$app->get('work/{id}', 'WorkController@get');
});
$app->group(['namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.refresh'], function ($app) {
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
	'middleware' => 'jwt.refresh',
	'namespace' => 'App\Http\Controllers',
	'uses' => 'ImageController@upload',
]);
$app->get('images/{path}', ['name' => 'Image', 'namespace' => 'App\Http\Controllers', 'uses' => 'ImageController@get']);
$app->get('images/clients/{path}', ['name' => 'ClientImage', 'namespace' => 'App\Http\Controllers', 'uses' => 'ImageController@get']);
