<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Key;
use App\User;
use JWTAuth;
use Illuminate\Http\Exception\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\URL;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthKeyController extends Controller {
	public function authenticate(Request $request) {
		if (isset($_SERVER['HTTP_ORIGIN'])) {
			$input = $request->input('key');
			$origin = $_SERVER['HTTP_ORIGIN'];
			$match = array();
			preg_match('|https?://([^/:]*):?[0-9]*$|', $_SERVER['HTTP_ORIGIN'], $match);
			if (count($match) === 2) {
				$origin = $match[1];
				if (Key::where('domain', $origin)->count()) {
					$key = Key::where('domain', $origin)->first();
					if ($key->key === $input) {
						$user = User::where('id', 1)->first();
						$token = JWTAuth::fromUser($user);
						return response()->json([
							'token' => $token
						]);
					}
				}
			}
		}
		return (new Response([
			'error' => 'invalid_credentials'
		], 401))->header('Content-Type', 'application/json');
	}
}