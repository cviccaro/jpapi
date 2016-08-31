<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ExpandDivisionModel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('divisions', function(Blueprint $table) {
            $table->string('site_title')->nullable();
            $table->integer('site_logo')->unsigned()->nullable();
            $table->string('splash_headline')->nullable();
            $table->text('splash_body')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('divisions', function(Blueprint $table) {
            $table->dropColumn(['site_title', 'site_logo', 'splash_headline', 'splash_body']);
        });
    }
}
