<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Exception\HttpResponseException;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @link https://github.com/tymondesigns/jwt-auth/wiki/Creating-Tokens
 */

class AuthController extends Controller {

	public function authenticate(Request $request) {

		$credentials = $request->only('email', 'password');

		try {
			if (! $token = JWTAuth::attempt($credentials)) {
				return response(['error' => 'invalid_credentials', 'creds' => $credentials], 401, ['Access-Control-Allow-Origin' => '*']);
			}
		}
		catch (JWTException $e) {
			return response()->json(['error' => 'could_not_create_token'], 500);
		}

		return response(compact('token'), 200);
	}

	public function refresh(Request $request){

	     $oldtoken = JWTAuth::getToken();

	     try {
	         // attempt to refresh token for the user
	         if (! $token = JWTAuth::parseToken('bearer','authorization', $oldtoken)->refresh()) {
	             return response(['error' => 'invalid_credentials', 'creds' => $credentials], 401, ['Access-Control-Allow-Origin' => '*']);
	         }
	     } 
	     catch (JWTException $e) {
	         return response()->json(['error' => 'could_not_refresh_token'], 500);
	     }

	     return response()->json(compact('token'));
	 }

	 public function check(Request $request) {
	 	try {
	 		$token = $request->header('Authorization');
	 		$parsed = JWTAuth::parseToken();
	 		return response()->json(['token' => $token, 'parsed' => $parsed],200);
	 	}
	 	catch (JWTException $e) {
	 		return response()->json(['error' => 'no_token_found'], 200);
	 	}
	 	//$parsed = JWTAuth::parseToken('bearer', 'authorization', $oldtoken);
	 }
}