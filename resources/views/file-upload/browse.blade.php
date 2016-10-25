<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="favicon.ico">
        <title>File Browser</title>
        <!-- Bootstrap core CSS -->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
        <script src="/js/filebrowser.js"></script>
        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        <link href="/css/filebrowser.css" rel="stylesheet" />
        @yield('css')
    </head>
    <body>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-10">
                        <button id="uploadFile" class="btn btn-primary"><span class="glyphicon glyphicon-upload"></span>&nbsp;&nbsp;Upload File</button>
                        <button id="newSubfolder" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;Add Subfolder</button>
                    </div>
                    <div class="col-md-2 filter-wrapper">
                        <input type="text" placeholder="Filter" class="form-control" id="filter" />
                        <button class="btn btn-default"><span class="glyphicon glyphicon-cog"></span></button>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </nav>
        <div class="container-fluid browser">
            <div class="row">
                <div class="list-group col-md-2">
                    {!! \App\Upload::renderDirectoryTree() !!}
                </div>
                <div class="well col-md-10">
                    <h4>Select a folder or file</h4>
                    @if (!empty($files))
                        <div class="grid">
                            @foreach ($files as $file)
                                <div class="tile">
                                    {!! \App\Upload::renderFile($file); !!}
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </body>
</html>