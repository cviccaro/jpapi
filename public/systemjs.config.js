/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app': '/', // 'dist',
        '@angular': 'node_modules/@angular',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'moment': 'node_modules/moment',
        'angular2-moment': 'node_modules/angular2-moment',
        'hammerjs': 'node_modules/hammerjs',
        '@angular2-material': 'node_modules/@angular2-material',
        'ng2-material': 'node_modules/ng2-material',
        'rxjs': 'node_modules/rxjs',
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'moment': { main: 'moment.js', defaultExtension: 'js' },
        'angular2-moment': { main: 'index.js', defaultExtension: 'js' },
        'ng2-material': { main: 'index.js', defaultExtension: 'js' },
        'hammerjs': { main: 'hammer.js', defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];

    var materialPkgs = [
      'core',
      'button',
      'card',
      'checkbox',
      'grid-list',
      'icon',
      'input',
      'list',
      'progress-bar',
      'progress-circle',
      'radio',
      'sidenav',
      'slide-toggle',
      'tabs',
      'toolbar'
    ];

    // Individual files (~300 requests):
    function packIndex(base, pkgName) {
        packages[base + '/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(base, pkgName) {
        packages[base + '/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(function(pkgName) {
      packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });
    materialPkgs.forEach(function(pkgName) {
      packages['@angular2-material/' + pkgName] = {main: pkgName + '.js'};
    });

    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);
