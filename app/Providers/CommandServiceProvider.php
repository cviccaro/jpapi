<?php

namespace App\Providers;

use App\Console\Commands\DebugBlogCommand;
use App\Console\Commands\PullBlogsCommand;
use Illuminate\Support\ServiceProvider;

class CommandServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('command.pull.blogs', function()
        {
            return new PullBlogsCommand;
        });
        $this->app->singleton('command.debug.blog', function()
        {
            return new DebugBlogCommand;
        });

        $this->commands(
            'command.pull.blogs',
            'command.debug.blog'
        );
    }
}