import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

    PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
    INJECTABLES: string[];

    constructor() {
        super();

        this.APP_TITLE = 'JP API Administration';

        this.ENABLE_SCSS = true;

        // Add `NPM` third-party libraries to be injected/bundled.
        this.NPM_DEPENDENCIES = [
            ...this.NPM_DEPENDENCIES,
            { src: 'angular2-toaster/lib/toaster.css', inject: true },
            { src: '@angular/material/core/overlay/overlay.css', inject: true, vendor: false }
            // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
            // {src: 'lodash/lodash.min.js', inject: 'libs'},
        ];

        // Add `local` third-party libraries to be injected/bundled.
        this.APP_ASSETS = [
            ...this.APP_ASSETS,
            { src: `${this.CSS_SRC}/app.css`, inject: true },
            // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
            // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
        ];

        this.mergeObject(this.PLUGIN_CONFIGS['gulp-sass'], {
          includePaths: [
            './node_modules/',
            './../resources/assets/scss/'
          ]
        });

        this.PROD_DEST = `public`;

        this.SYSTEM_CONFIG_DEV.packageConfigPaths.push('/node_modules/@angular/material/*/package.json');
        this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(
          join(this.PROJECT_ROOT, 'node_modules', '@angular', 'material', '*', 'package.json')
        );

        this.SYSTEM_BUILDER_CONFIG.packages['moment'] = {
            main: 'min/moment-with-locales.min.js',
            defaultExtension: 'js'
        };

        this.SYSTEM_BUILDER_CONFIG.packages['angular2-moment'] = {
            main: 'index.js',
            defaultExtension: 'js'
        };

        this.SYSTEM_BUILDER_CONFIG.packages['angular2-toaster'] = {
            main: 'angular2-toaster.js',
            defaultExtension: 'js'
        };

        this.SYSTEM_BUILDER_CONFIG.packages['ng2-dnd'] = {
            main: 'index.js',
            defaultExtension: 'js'
        };

        this.SYSTEM_BUILDER_CONFIG.packages['ng2-ckeditor'] = {
            main: 'lib/CKEditor.js',
            defaultExtension: 'js'
        };

        this.SYSTEM_BUILDER_CONFIG.packages['lodash'] = {
            main: 'index.js',
            defaultExtension: 'js'
        };

        this.SYSTEM_BUILDER_CONFIG.packages['@angular/material'] = {
          format: 'cjs',
          main: 'material.umd.js',
        };

        let PACKAGES: string[] = [];

        for (let pkgName in this.SYSTEM_BUILDER_CONFIG.packages) {
          PACKAGES.push(join(pkgName,'**'));
        }

        this.INJECTABLES = this.NPM_DEPENDENCIES.map(dep => dep.src).concat(PACKAGES);
    }
}
