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
       } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

           return response()->json(['error' => 'token_expired'], $e->getStatusCode());

       } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

           return response()->json(['error' => 'token_invalid'], $e->getStatusCode());

       } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

           return response()->json(['error' => 'token_absent'], $e->getStatusCode());

       }

       $expires = \JWTAuth::getPayload($token)['exp'];

       $json = array_merge(['expires' => $expires], compact('token'));

       return response($json, 200);
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

        $expires = \JWTAuth::getPayload($token)['exp'];

        $json = array_merge(['expires' => $expires], compact('token'));

        return response($json, 200);
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

    public function getAuthenticatedUser()
    {
        try {

            if (! $user = \JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }
}
