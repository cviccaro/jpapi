@extends('layout')
@section('css')
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker.css" rel="stylesheet">
@endsection
@section('header')
    <div class="page-header">
        <h1><i class="glyphicon glyphicon-edit"></i> Blogs / Edit #{{$blog->id}}</h1>
    </div>
@endsection

@section('content')
    @include('error')

    <div class="row">
        <div class="col-md-12">

            <form action="{{ route('blogs.update', $blog->id) }}" method="POST">
                <input type="hidden" name="_method" value="PUT">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <div class="form-group @if($errors->has('title')) has-error @endif">
                       <label for="title-field">Title</label>
                    <input type="text" id="title-field" name="title" class="form-control" value="{{ old("title") or $blog->title }}"/>
                       @if($errors->has("title"))
                        <span class="help-block">{{ $errors->first("title") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('summary')) has-error @endif">
                       <label for="summary-field">Summary</label>
                    <textarea class="form-control" id="summary-field" rows="3" name="summary">{{ old("summary") or $blog->summary }}</textarea>
                       @if($errors->has("summary"))
                        <span class="help-block">{{ $errors->first("summary") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('body')) has-error @endif">
                       <label for="body-field">Body</label>
                    <textarea class="form-control" id="body-field" rows="3" name="body">{{ old("body") or $blog->body }}</textarea>
                       @if($errors->has("body"))
                        <span class="help-block">{{ $errors->first("body") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('author')) has-error @endif">
                       <label for="author-field">Author</label>
                    <input type="text" id="author-field" name="author" class="form-control" value="{{ old("author") or $blog->author }}"/>
                       @if($errors->has("author"))
                        <span class="help-block">{{ $errors->first("author") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('image_id')) has-error @endif">
                       <label for="image_id-field">Image_id</label>
                    <input type="text" id="image_id-field" name="image_id" class="form-control" value="{{ old("image_id") or $blog->image_id }}"/>
                       @if($errors->has("image_id"))
                        <span class="help-block">{{ $errors->first("image_id") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('division_id')) has-error @endif">
                       <label for="division_id-field">Division_id</label>
                    <input type="text" id="division_id-field" name="division_id" class="form-control" value="{{ old("division_id") or $blog->division_id }}"/>
                       @if($errors->has("division_id"))
                        <span class="help-block">{{ $errors->first("division_id") }}</span>
                       @endif
                    </div>
                <div class="well well-sm">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <a class="btn btn-link pull-right" href="{{ route('blogs.index') }}"><i class="glyphicon glyphicon-backward"></i>  Back</a>
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
