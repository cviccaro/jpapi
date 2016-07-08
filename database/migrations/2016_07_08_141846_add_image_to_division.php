<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddImageToDivision extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('divisions', function ($table) {
            $table->integer('image_id')->unsigned()->nullable();
            $table->foreign('image_id')->references('id')->on('images')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('divisions', function ($table) {
            $table->dropForeign('image_id');
            $table->dropColumn('image_id');
        });
    }
}
