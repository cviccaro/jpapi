<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ExpandImageModel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->string('name')->nullable()->after('path');
            $table->string('alias')->nullable()->after('name');
            $table->string('mimetype')->nullable()->after('alias');
            $table->string('extension')->nullable()->after('mimetype');
            $table->integer('size')->unsigned()->nullable()->after('extension');
            $table->timestamp('last_modified')->nullable()->after('size');
        });

        Schema::table('work_images', function (Blueprint $table) {
            $table->integer('weight')->default(0)->after('image_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->dropColumn(['name', 'alias', 'type', 'size', 'last_modified']);
        });

        Schema::table('work_images', function (Blueprint $table) {
            $table->dropColumn('weight');
        });
    }
}
