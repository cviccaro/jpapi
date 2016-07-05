<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWeightToDivisionTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('blog_division', function ($table) {
            $table->integer('weight')->unsigned()->default(0);
        });
        Schema::table('division_project', function ($table) {
            $table->integer('weight')->unsigned()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('blog_division', function ($table) {
            $table->dropColumn('weight');
        });
        Schema::table('division_project', function ($table) {
            $table->dropColumn('weight');
        });
    }
}
