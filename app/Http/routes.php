<?php

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
    return '';
});


$app->group(['prefix' => 'api', 'namespace' => 'App\Http\Controllers\Auth'], function($app) {
    $app->post('authenticate', 'AuthKeyController@authenticate');
    $app->get('authenticate/refresh','AuthController@refresh');
});

/**
 * Routes for resource blog
 */
$app->group(['prefix' => 'api', 'namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.auth'], function($app) {
	$app->get('blog', 'BlogsController@all');
	$app->get('blog/{id}', 'BlogsController@get');
	$app->post('blog', 'BlogsController@add');
	$app->put('blog/{id}', 'BlogsController@put');
	$app->delete('blog/{id}', 'BlogsController@remove');
});

/**
 * Routes for resource staff
 */
$app->group(['prefix' => 'api', 'namespace' => 'App\Http\Controllers', 'middleware' => 'jwt.auth'], function($app) {
	$app->get('staff', 'StaffController@all');
	$app->get('staff/{id}', 'StaffController@get');
	$app->post('staff', 'StaffController@add');
	$app->put('staff/{id}', 'StaffController@put');
	$app->delete('staff/{id}', 'StaffController@remove');
});