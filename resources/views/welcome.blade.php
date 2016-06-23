<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>
        <base href="/">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <!-- 1. Load libraries -->
         <!-- Polyfill(s) for older browsers -->
         <script src="node_modules/core-js/client/shim.min.js"></script>
         <script src="node_modules/zone.js/dist/zone.js"></script>
         <script src="node_modules/reflect-metadata/Reflect.js"></script>
         <script src="node_modules/systemjs/dist/system.src.js"></script>

        <!-- 2. Configure SystemJS -->
         <script src="systemjs.config.js"></script>
         <script>
          System.import('app').catch(function(err){ console.error('SYSTEMJS IMPORT', err); });
         </script>
    </head>
    <body>
        <my-app>Loading...</my-app>

        <script>
        // function.name (all IE)
        // Remove once https://github.com/angular/angular/issues/6501 is fixed.
        /*! @source http://stackoverflow.com/questions/6903762/function-name-not-supported-in-ie*/
        if (!Object.hasOwnProperty('name')) {
          Object.defineProperty(Function.prototype, 'name', {
            get: function() {
              var matches = this.toString().match(/^\s*function\s*((?![0-9])[a-zA-Z0-9_$]*)\s*\(/);
              var name = matches && matches.length > 1 ? matches[1] : "";
              // For better performance only parse once, and then cache the
              // result through a new accessor for repeated access.
              Object.defineProperty(this, 'name', {value: name});
              return name;
            }
          });
        }
        </script>

        <script>
        // Fixes undefined module function in SystemJS bundle
        function module() {}
        </script>

    </body>
</html>
