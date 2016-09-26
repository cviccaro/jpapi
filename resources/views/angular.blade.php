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
  <link rel="stylesheet" href="/css/main.css?1474898669445">
  <!-- endinject -->

</head>
<body>

  <jpa-app></jpa-app>
  <div id="bootstrapping">
    <div class="uil-ring-css"><div></div></div>
    <p>Loading...</p>
  </div>

  <script>
    // Fixes undefined module function in SystemJS bundle
    function module() {}
  </script>

  <!-- shims:js -->
  <script src="/node_modules/core-js/client/shim.min.js?1474898669439"></script>
  <script src="/node_modules/systemjs/dist/system.src.js?1474898669441"></script>
  <!-- endinject -->

  
  <script src="/app/system-config.js"></script>
  

  <!-- libs:js -->
  <script src="/node_modules/zone.js/dist/zone.js?1474898669443"></script>
  <script src="/node_modules/rxjs/bundles/Rx.min.js?1474898669444"></script>
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
</body>
</html>
