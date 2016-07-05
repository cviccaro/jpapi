/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things
    var modules = [
      'rxjs',
      '@angular',
      'angular2-in-memory-web-api',
      'moment',
      'angular2-moment',
      '@angular2-material',
      // 'ng2-material',
      'ng2-file-upload',
      'angular2-toaster',
      //'angular2-localstorage',
      'angular2-jwt',
      'ng2-dnd'
    ];

    var map = modules.reduce(function(carry, module) {
      switch(module) {
        case 'angular2-localstorage':
          carry[module] = 'node_modules/' + module + '/dist'
          break;
        default:
          carry[module] = 'node_modules/' + module;
      }
      return carry;
    }, {app:'/'});

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'moment': { main: 'moment.js', defaultExtension: 'js' },
        'angular2-moment': { main: 'index.js', defaultExtension: 'js' },
        // 'ng2-material': { main: 'index.js', defaultExtension: 'js' },
        'hammerjs': { main: 'hammer.js', defaultExtension: 'js' },
        'ng2-file-upload': { main: 'ng2-file-upload.js', defaultExtension: 'js' },
        'angular2-toaster': { main: 'angular2-toaster.js', defaultExtension: 'js' },
        // 'angular2-localstorage': { main: 'index.js', defaultExtension: 'js' },
        'angular2-jwt': { main: 'angular2-jwt.js', defaultExtension: 'js' },
        'ng2-dnd': { main: 'bundles/ng2-dnd.js', defaultExtension: 'js'}
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
