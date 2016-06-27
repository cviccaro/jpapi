var Elixir = require('laravel-elixir');
var $ = Elixir.Plugins;
var config = Elixir.config;

var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var gulp   = require('gulp');
var fileExists = require('file-exists');
var path = require('path');
var promise = require('es6-promise');
var _ = require('underscore');

/**
 * Typescript elixir task
 *
 * @return
 */
Elixir.extend('typescript', function(src, output, options) {
    var paths = new Elixir.GulpPaths()
        .src(src)
        .output(output, 'app.js');

    new Elixir.Task('typescript', function() {

        this.log(paths.src, paths.output);

        // check if there is an tsconfig.json file --> initialize ts project
        var tsProject = null;
        var tsConfigPath = path.join(path.dirname(paths.src.baseDir), 'tsconfig.json');

        if (fileExists(tsConfigPath)){
            tsProject = ts.createProject(tsConfigPath, options);
        } else{
            // useful default options
            options = _.extend({
                sortOutput: true
            }, options);
        }

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe(ts(tsProject == null ? options : tsProject)
                .on('error', function(e) {
                    new Elixir.Notification().error(e, 'TypeScript Compilation Failed!');

                    this.emit('end');
                }))
           //.pipe($.concat(paths.output.name))
            .pipe($.if(config.production, $.uglify()))
            .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('TypeScript Compiled to ' + paths.output.baseDir + '!'))
        );
    })
    .watch(path.join(paths.src.baseDir, "**/*.ts"))
    .ignore(paths.output.path);
});


/**
 * SASS
 *
 */
Elixir.extend('angular2Sass', function(src, output, options) {
    var paths = new Elixir.GulpPaths()
        .src(src)
        .output(output);

    var baseDir = path.dirname(paths.src.baseDir);

    new Elixir.Task('angular2Sass', function() {
        var name = 'angular2Sass';

        if (options === undefined) {
            options = {
                outputStyle: config.production ? 'compressed' : 'nested',
                precision: 10
            };
        }

        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe(sass(options))
            .on('error', function(e) {
                new Elixir.Notification().error(e, name + ' Compilation Failed');

                this.emit('end');
            })
            .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
            // .pipe($.concat(paths.output.name))
            .pipe($.if(config.production, $.cssnano(config.css.cssnano.pluginOptions)))
            .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification(name + ' Compiled!'))
        );
    })
    .watch(path.join(baseDir, '/**/*.+(sass|scss)'))
    .ignore(paths.output.path);
});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

Elixir(function(mix) {
    mix.sass('app.scss');

    // mix.copy('node_modules/@angular', 'public/node_modules/@angular');
    // mix.copy('node_modules/rxjs', 'public/node_modules/rxjs');
    // mix.copy('node_modules/systemjs', 'public/node_modules/systemjs');
    // mix.copy('node_modules/es6-shim', 'public/node_modules/es6-shim');
    // mix.copy('node_modules/zone.js/', 'public/node_modules/zone.js/');
    // mix.copy('node_modules/core-js', 'public/node_modules/core-js');
    // mix.copy('node_modules/angular2-in-memory-web-api', 'public/node_modules/angular2-in-memory-web-api');
    // mix.copy('node_modules/reflect-metadata', 'public/node_modules/reflect-metadata');
    // mix.copy('node_modules/moment', 'public/node_modules/moment');
    // mix.copy('node_modules/angular2-moment', 'public/node_modules/angular2-moment');
    // mix.copy('node_modules/ng2-file-upload', 'public/node_modules/ng2-file-upload');
    // mix.copy('node_modules/angular2-toaster', 'public/node_modules/angular2-toaster');
    // mix.copy('node_modules/es6-promise', 'public/node_modules/es6-promise');
    // mix.copy('node_modules/promise', 'public/node_modules/promise');
    // mix.copy('node_modules/angular2-localstorage', 'public/node_modules/angular2-localstorage');
    // mix.copy('node_modules/angular2-jwt', 'public/node_modules/angular2-jwt');

    // mix.copy('node_modules/@angular2-material', 'public/node_modules/@angular2-material');
    //mix.copy('node_modules/ng2-material', 'public/node_modules/ng2-material');

    //mix.typescript('node_modules/angular2-localstorage/**/*.ts', 'public/node_modules/angular2-localstorage/angular2-localstorage.js');

    mix.copy('resources/angular2/systemjs.config.js', 'public/systemjs.config.js');

    mix.typescript('resources/angular2/**/*.ts', 'public/app.js');

    mix.angular2Sass('resources/angular2/**/*.scss', 'public/');
    mix.copy('resources/angular2/**/*.html', 'public/');
});
