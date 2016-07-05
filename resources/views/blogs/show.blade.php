@extends('layout')
@section('header')
<div class="page-header">
        <h1>Blogs / Show #{{$blog->id}}</h1>
        <form action="{{ route('blogs.destroy', $blog->id) }}" method="POST" style="display: inline;" onsubmit="if(confirm('Delete? Are you sure?')) { return true } else {return false };">
            <input type="hidden" name="_method" value="DELETE">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="btn-group pull-right" role="group" aria-label="...">
                <a class="btn btn-warning btn-group" role="group" href="{{ route('blogs.edit', $blog->id) }}"><i class="glyphicon glyphicon-edit"></i> Edit</a>
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
                     <label for="title">TITLE</label>
                     <p class="form-control-static">{{$blog->title}}</p>
                </div>
                    <div class="form-group">
                     <label for="summary">SUMMARY</label>
                     <p class="form-control-static">{{$blog->summary}}</p>
                </div>
                    <div class="form-group">
                     <label for="body">BODY</label>
                     <p class="form-control-static">{{$blog->body}}</p>
                </div>
                    <div class="form-group">
                     <label for="author">AUTHOR</label>
                     <p class="form-control-static">{{$blog->author}}</p>
                </div>
                    <div class="form-group">
                     <label for="image_id">IMAGE_ID</label>
                     <p class="form-control-static">{{$blog->image_id}}</p>
                </div>
                    <div class="form-group">
                     <label for="division_id">DIVISION_ID</label>
                     <p class="form-control-static">{{$blog->division_id}}</p>
                </div>
            </form>

            <a class="btn btn-link" href="{{ route('blogs.index') }}"><i class="glyphicon glyphicon-backward"></i>  Back</a>

        </div>
    </div>

@endsection