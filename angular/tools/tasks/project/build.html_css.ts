import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as util from 'gulp-util';
import { join } from 'path';

import Config from '../../config';
import { CssTask } from '../css_task';

const plugins = <any>gulpLoadPlugins();
const gulpConcatCssConfig = Config.getPluginConfig('gulp-concat-css');

const sassPrepend = '@import "variables";';

const processors = [
  autoprefixer({
    browsers: Config.BROWSER_LIST
  })
];

const reportPostCssError = (e: any) => util.log(util.colors.red(e.message));

const isProd = Config.ENV === 'prod';

if (isProd) {
  processors.push(
    cssnano({
      discardComments: {removeAll: true},
      discardUnused: false, // unsafe, see http://goo.gl/RtrzwF
      zindex: false, // unsafe, see http://goo.gl/vZ4gbQ
      reduceIdents: false // unsafe, see http://goo.gl/tNOPv0
    })
  );
}

/**
 * Copies all HTML files in `src/client` over to the `dist/tmp` directory.
 */
function prepareTemplates() {
  return gulp.src(join(Config.APP_SRC, '**', '*.html'))
    .pipe(gulp.dest(Config.TMP_DIR));
}

/**
 * Execute the appropriate component-stylesheet processing method based on user stylesheet preference.
 */
function processComponentStylesheets() {
  return Config.ENABLE_SCSS ? processComponentScss() : processComponentCss();
}

/**
 * Process scss files referenced from Angular component `styleUrls` metadata
 */
function processComponentScss() {
  return gulp.src(join(Config.APP_SRC, '**', '*.scss'))
    .pipe(isProd ? plugins.cached('process-component-scss') : plugins.util.noop())
    .pipe(isProd ? plugins.progeny() : plugins.util.noop())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.insert.prepend(sassPrepend))
    .pipe(plugins.sass(Config.getPluginConfig('gulp-sass')).on('error', plugins.sass.logError))
    .pipe(plugins.postcss(processors))
    .on('error', reportPostCssError)
    .pipe(plugins.sourcemaps.write(isProd ? '.' : ''))
    .pipe(gulp.dest(isProd ? Config.TMP_DIR : Config.APP_DEST));
}

/**
 * Processes the CSS files within `src/client` excluding those in `src/client/assets` using `postcss` with the
 * configured processors.
 */
function processComponentCss() {
  return gulp.src([
    join(Config.APP_SRC, '**', '*.css'),
    '!' + join(Config.APP_SRC, 'assets', '**', '*.css')
  ])
    .pipe(isProd ? plugins.cached('process-component-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    .on('error', reportPostCssError)
    .pipe(gulp.dest(isProd ? Config.TMP_DIR : Config.APP_DEST));
}

/**
 * Execute external-stylesheet processing method based on presence of --scss flag.
 */
function processExternalStylesheets() {
  return Config.ENABLE_SCSS ? processAllExternalStylesheets() : processExternalCss();
}

/**
 * Process scss stylesheets located in `src/client/css` and any css dependencies specified in
 * the global project configuration.
 */
function processAllExternalStylesheets() {
  return merge(getExternalCssStream(), getExternalScssStream())
    .pipe(isProd ? plugins.concatCss(gulpConcatCssConfig.targetFile, gulpConcatCssConfig.options) : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    .on('error', reportPostCssError)
    .pipe(gulp.dest(Config.CSS_DEST));
}

/**
 * Get a stream of external css files for subsequent processing.
 */
function getExternalCssStream() {
  return gulp.src(getExternalCss())
    .pipe(isProd ? plugins.cached('process-external-css') : plugins.util.noop());
}

/**
 * Get an array of filenames referring to all external css stylesheets.
 */
function getExternalCss() {
  return Config.DEPENDENCIES.filter(dep => /\.css$/.test(dep.src)).map(dep => dep.src);
}

/**
 * Get a stream of external scss files for subsequent processing.
 */
function getExternalScssStream() {
  return gulp.src(getExternalScss())
    .pipe(isProd ? plugins.cached('process-external-scss') : plugins.util.noop())
    .pipe(isProd ? plugins.progeny() : plugins.util.noop())
    .pipe(plugins.insert.prepend(sassPrepend))
    .pipe(plugins.sass(Config.getPluginConfig('gulp-sass')).on('error', plugins.sass.logError));
}

/**
 * Get an array of filenames referring to external scss stylesheets located in the global DEPENDENCIES
 * as well as in `src/css`.
 */
function getExternalScss() {
  return Config.DEPENDENCIES.filter(dep => /\.scss$/.test(dep.src)).map(dep => dep.src)
    .concat([join(Config.CSS_SRC, '**', '*.scss')]);
}

/**
 * Processes the external CSS files using `postcss` with the configured processors.
 */
function processExternalCss() {
  return getExternalCssStream()
    .pipe(plugins.postcss(processors))
    .pipe(isProd ? plugins.concatCss(gulpConcatCssConfig.targetFile, gulpConcatCssConfig.options) : plugins.util.noop())
    .on('error', reportPostCssError)
    .pipe(gulp.dest(Config.CSS_DEST));
}

/**
 * Executes the build process, processing the HTML and CSS files.
 */
export =
  class BuildHtmlCss extends CssTask {

    shallRun(files: String[]) {
      return super.shallRun(files) || files.some(f => f.endsWith('.html'));
    }

    run() {
      return merge(processComponentStylesheets(), prepareTemplates(), processExternalStylesheets());
    }
  };
