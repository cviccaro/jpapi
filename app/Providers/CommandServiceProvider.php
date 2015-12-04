<?php

namespace App\Providers;

use App\Console\Commands\DebugBlogCommand;
use App\Console\Commands\GenerateApiKeyCommand;
use App\Console\Commands\PullBlogsCommand;
use App\Console\Commands\PullStaffCommand;
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
        $this->app->singleton('command.pull.staff', function()
        {
            return new PullStaffCommand;
        });
        $this->app->singleton('command.generate.apikey', function()
        {
            return new GenerateApiKeyCommand;
        });

        $this->commands(
            'command.pull.blogs',
            'command.debug.blog',
            'command.pull.staff',
            'command.generate.apikey'
        );
    }
}