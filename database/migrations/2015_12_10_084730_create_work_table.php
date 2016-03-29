<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWorkTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('work', function (Blueprint $table) {
			$table->increments('id');
			$table->string('uri')->required();
			$table->string('title')->required();
			$table->text('body')->nullable();
			$table->unsignedInteger('client')->required();
			$table->unsignedInteger('image')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::drop('work');
	}
}
