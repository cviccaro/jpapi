@extends('layout')
@section('header')
<div class="page-header">
        <h1>Images / Show #{{$image->id}}</h1>
        <form action="{{ route('images.destroy', $image->id) }}" method="POST" style="display: inline;" onsubmit="if(confirm('Delete? Are you sure?')) { return true } else {return false };">
            <input type="hidden" name="_method" value="DELETE">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="btn-group pull-right" role="group" aria-label="...">
                <a class="btn btn-warning btn-group" role="group" href="{{ route('images.edit', $image->id) }}"><i class="glyphicon glyphicon-edit"></i> Edit</a>
                <button type="submit" class="btn btn-danger">Delete <i class="glyphicon glyphicon-trash"></i></button>
            </div>
        </form>
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">

            <form action="#">
                <div class="form-group">
                    <label for="nome">ID</label>
                    <p class="form-control-static"></p>
                </div>
                <div class="form-group">
                     <label for="path">PATH</label>
                     <p class="form-control-static">{{$image->path}}</p>
                </div>
                    <div class="form-group">
                     <label for="filename">FILENAME</label>
                     <p class="form-control-static">{{$image->filename}}</p>
                </div>
                    <div class="form-group">
                     <label for="alias">ALIAS</label>
                     <p class="form-control-static">{{$image->alias}}</p>
                </div>
                    <div class="form-group">
                     <label for="mimetype">MIMETYPE</label>
                     <p class="form-control-static">{{$image->mimetype}}</p>
                </div>
                    <div class="form-group">
                     <label for="extension">EXTENSION</label>
                     <p class="form-control-static">{{$image->extension}}</p>
                </div>
                    <div class="form-group">
                     <label for="size">SIZE</label>
                     <p class="form-control-static">{{$image->size}}</p>
                </div>
                    <div class="form-group">
                     <label for="last_modified">LAST_MODIFIED</label>
                     <p class="form-control-static">{{$image->last_modified}}</p>
                </div>
            </form>

            <a class="btn btn-link" href="{{ route('images.index') }}"><i class="glyphicon glyphicon-backward"></i>  Back</a>

        </div>
    </div>

@endsection