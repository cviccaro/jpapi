<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Schema;

class MetaController extends Controller {

	public function getColumns($table_name) {
		return array_filter(Schema::getColumnListing($table_name), function($value) {
			return !in_array($value, ['id', 'created_at', 'updated_at']);
		});
	}

}