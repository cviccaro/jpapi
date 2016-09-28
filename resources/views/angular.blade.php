<!DOCTYPE html>
<html lang="en">
<head>
  <base href="/">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>JP API Administration</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <!-- inject:css -->
  <link rel="stylesheet" href="/node_modules/@angular2-material/core/overlay/overlay.css?1475092216520">
  <link rel="stylesheet" href="/css/main.css?1475092216521">
  <!-- endinject -->

</head>
<body>

  <jpa-app>Loading...</jpa-app>

  <script>
    // Fixes undefined module function in SystemJS bundle
    function module() {}
  </script>

  <!-- shims:js -->
  <script src="/node_modules/core-js/client/shim.min.js?1475092216513"></script>
  <script src="/node_modules/systemjs/dist/system.src.js?1475092216514"></script>
  <!-- endinject -->

  
  <script src="/app/system-config.js"></script>
  

  <!-- libs:js -->
  <script src="/node_modules/zone.js/dist/zone.js?1475092216517"></script>
  <script src="/node_modules/rxjs/bundles/Rx.min.js?1475092216519"></script>
  <!-- endinject -->

  <!-- inject:js -->
  <!-- endinject -->

  
  <script>
  System.import('app/main')
    .catch(function (e) {
      console.error(e,
        'Report this error at https://github.com/mgechev/angular2-seed/issues');
    });
  </script>
  
  
  <script src="https://use.typekit.net/wqu6orw.js"></script>
  <script>try{Typekit.load({ async: true });}catch(e){}</script>
  <script src="https://cdn.ckeditor.com/4.5.8/standard/ckeditor.js"></script>
</body>
</html>
