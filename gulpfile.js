var elixir = require('laravel-elixir');

var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var gulp   = require('gulp');
var Elixir = require('laravel-elixir');
var fileExists = require('file-exists');
var path = require('path');
var promise = require('es6-promise');

var _ = require('underscore');

var $ = Elixir.Plugins;
var config = Elixir.config;

// overwrite elixir config values
var tsFolder = 'resources/typescript'; // would be config.get('assets.js.typescript.folder');
var tsOutput = config.get('public.js.outputFolder');

Elixir.extend('typescript', function(src, output, options) {
    var paths = prepGulpPaths(src, output);
    new Elixir.Task('typescript', function() {
        this.log(paths.src, paths.output);

        // check if there is an tsconfig.json file --> initialize ts project
        var tsProject = null;
        var tsConfigPath = path.join(tsFolder, 'tsconfig.json');
        if(fileExists(tsConfigPath)){
            tsProject = ts.createProject(tsConfigPath, options);
        }else{
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
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, tsFolder)
        .output(output || tsOutput, 'app.js');
};

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

elixir(function(mix) {
    mix.sass('app.scss');

    //mix.copy('node_modules/', 'public/node_modules/');
    // mix.copy('node_modules/@angular', 'public/node_modules/@angular');
    // mix.copy('node_modules/rxjs', 'public/node_modules/rxjs');
    // mix.copy('node_modules/systemjs', 'public/node_modules/systemjs');
    // mix.copy('node_modules/es6-promise', 'public/node_modules/es6-promise');
    // mix.copy('node_modules/es6-shim', 'public/node_modules/es6-shim');
    // mix.copy('node_modules/zone.js/', 'public/node_modules/zone.js/');

    // mix.copy('node_modules/core-js', 'public/node_modules/core-js');
    // mix.copy('node_modules/angular2-in-memory-web-api', 'public/node_modules/angular2-in-memory-web-api');
    // mix.copy('node_modules/reflect-metadata', 'public/node_modules/reflect-metadata');

    mix.copy('resources/typescript/systemjs.config.js', 'public/systemjs.config.js');

    mix.typescript('resources/typescript/**/*.ts', 'public/app/app.js', {
    	target: "es5",
    	module: "system",
    	moduleResolution: "node",
    	sourceMap: true,
    	emitDecoratorMetadata: true,
    	experimentalDecorators: true,
    	removeComments: false,
    	noImplicitAny: false
    });
});
