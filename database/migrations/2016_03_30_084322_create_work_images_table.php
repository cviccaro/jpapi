<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWorkImagesTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('work_images', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('work_id')->unsigned();
			$table->foreign('work_id')
				->references('id')->on('work')
				->onDelete('cascade')
				->onUpdate('cascade');
			$table->integer('image_id')->unsigned();
			$table->foreign('image_id')
				->references('id')->on('images')
				->onDelete('cascade')
				->onUpdate('cascade');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::drop('work_images');
	}
}
