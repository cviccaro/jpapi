<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlogDivisionPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_division', function (Blueprint $table) {
            $table->integer('blog_id')->unsigned()->index();
            $table->foreign('blog_id')->references('id')->on('blogs')->onDelete('cascade');
            $table->integer('division_id')->unsigned()->index();
            $table->foreign('division_id')->references('id')->on('divisions')->onDelete('cascade');
            $table->primary(['blog_id', 'division_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('blog_division');
    }
}
