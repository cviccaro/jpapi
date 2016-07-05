@extends('layout')
@section('css')
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker.css" rel="stylesheet">
@endsection
@section('header')
    <div class="page-header">
        <h1><i class="glyphicon glyphicon-plus"></i> Images / Create </h1>
    </div>
@endsection

@section('content')
    @include('error')

    <div class="row">
        <div class="col-md-12">

            <form action="{{ route('images.store') }}" method="POST">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <div class="form-group @if($errors->has('path')) has-error @endif">
                       <label for="path-field">Path</label>
                    <input type="text" id="path-field" name="path" class="form-control" value="{{ old("path") }}"/>
                       @if($errors->has("path"))
                        <span class="help-block">{{ $errors->first("path") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('filename')) has-error @endif">
                       <label for="filename-field">Filename</label>
                    <input type="text" id="filename-field" name="filename" class="form-control" value="{{ old("filename") }}"/>
                       @if($errors->has("filename"))
                        <span class="help-block">{{ $errors->first("filename") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('alias')) has-error @endif">
                       <label for="alias-field">Alias</label>
                    <input type="text" id="alias-field" name="alias" class="form-control" value="{{ old("alias") }}"/>
                       @if($errors->has("alias"))
                        <span class="help-block">{{ $errors->first("alias") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('mimetype')) has-error @endif">
                       <label for="mimetype-field">Mimetype</label>
                    <input type="text" id="mimetype-field" name="mimetype" class="form-control" value="{{ old("mimetype") }}"/>
                       @if($errors->has("mimetype"))
                        <span class="help-block">{{ $errors->first("mimetype") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('extension')) has-error @endif">
                       <label for="extension-field">Extension</label>
                    <input type="text" id="extension-field" name="extension" class="form-control" value="{{ old("extension") }}"/>
                       @if($errors->has("extension"))
                        <span class="help-block">{{ $errors->first("extension") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('size')) has-error @endif">
                       <label for="size-field">Size</label>
                    <input type="text" id="size-field" name="size" class="form-control" value="{{ old("size") }}"/>
                       @if($errors->has("size"))
                        <span class="help-block">{{ $errors->first("size") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('last_modified')) has-error @endif">
                       <label for="last_modified-field">Last_modified</label>
                    <input type="text" id="last_modified-field" name="last_modified" class="form-control" value="{{ old("last_modified") }}"/>
                       @if($errors->has("last_modified"))
                        <span class="help-block">{{ $errors->first("last_modified") }}</span>
                       @endif
                    </div>
                <div class="well well-sm">
                    <button type="submit" class="btn btn-primary">Create</button>
                    <a class="btn btn-link pull-right" href="{{ route('images.index') }}"><i class="glyphicon glyphicon-backward"></i> Back</a>
                </div>
            </form>

        </div>
    </div>
@endsection
@section('scripts')
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/js/bootstrap-datepicker.min.js"></script>
  <script>
    $('.date-picker').datepicker({
    });
  </script>
@endsection
