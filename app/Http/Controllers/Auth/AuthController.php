<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function authenticate(Request $request) {

       $credentials = $request->only('email', 'password');

       try {
           if (! $token = \JWTAuth::attempt($credentials)) {
               return response(['error' => 'invalid_credentials', 'errorText' => 'The username or password was incorrect.', 'credentials' => $credentials], 401, ['Access-Control-Allow-Origin' => '*']);
           }
       }
       catch (JWTException $e) {
           return response()->json(['error' => 'could_not_create_token'], 500);
       }

       return response(compact('token'), 200);
   }

   public function refresh(Request $request){

        $oldtoken = \JWTAuth::getToken();

        try {
            // attempt to refresh token for the user
            if (! $token = \JWTAuth::parseToken('bearer','authorization', $oldtoken)->refresh()) {
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
           $parsed = \JWTAuth::parseToken();
           return response()->json(['success' => $parsed->getPayload()['exp'] - time()],200);
       }
       catch (JWTException $e) {
           return response()->json(['error' => $e->getMessage()], 401, ['Access-Control-Allow-Origin' => '*']);
       }
    }
}
