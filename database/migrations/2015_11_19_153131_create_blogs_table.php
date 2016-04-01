<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBlogsTable extends Migration {

	public function up() {
		Schema::create('blogs', function (Blueprint $table) {
			$table->increments('id');
			$table->string('uri')->nullable();
			$table->string('title');
			$table->string('description')->nullable();
			$table->text('body');
			$table->string('category')->nullable();
			$table->string('author')->nullable();
			$table->string('site')->nullable();
			$table->string('image')->nullable();
			// Constraints declaration
			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('blogs');
	}
}
