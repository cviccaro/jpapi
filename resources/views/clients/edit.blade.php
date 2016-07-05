@extends('layout')
@section('css')
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker.css" rel="stylesheet">
@endsection
@section('header')
    <div class="page-header">
        <h1><i class="glyphicon glyphicon-edit"></i> Clients / Edit #{{$client->id}}</h1>
    </div>
@endsection

@section('content')
    @include('error')

    <div class="row">
        <div class="col-md-12">

            <form action="{{ route('clients.update', $client->id) }}" method="POST">
                <input type="hidden" name="_method" value="PUT">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <div class="form-group @if($errors->has('name')) has-error @endif">
                       <label for="name-field">Name</label>
                    <input type="text" id="name-field" name="name" class="form-control" value="{{ old("name") or $client->name }}"/>
                       @if($errors->has("name"))
                        <span class="help-block">{{ $errors->first("name") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('alias')) has-error @endif">
                       <label for="alias-field">Alias</label>
                    <input type="text" id="alias-field" name="alias" class="form-control" value="{{ old("alias") or $client->alias }}"/>
                       @if($errors->has("alias"))
                        <span class="help-block">{{ $errors->first("alias") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('description')) has-error @endif">
                       <label for="description-field">Description</label>
                    <input type="text" id="description-field" name="description" class="form-control" value="{{ old("description") or $client->description }}"/>
                       @if($errors->has("description"))
                        <span class="help-block">{{ $errors->first("description") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('image_id')) has-error @endif">
                       <label for="image_id-field">Image_id</label>
                    <input type="text" id="image_id-field" name="image_id" class="form-control" value="{{ old("image_id") or $client->image_id }}"/>
                       @if($errors->has("image_id"))
                        <span class="help-block">{{ $errors->first("image_id") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('featured')) has-error @endif">
                       <label for="featured-field">Featured</label>
                    <div class="btn-group" data-toggle="buttons"><label class="btn btn-primary"><input type="radio" value="true" name="featured-field" id="featured-field" autocomplete="off"> True</label><label class="btn btn-primary active"><input type="radio" name="featured-field" value="false" id="featured-field" autocomplete="off"> False</label></div>
                       @if($errors->has("featured"))
                        <span class="help-block">{{ $errors->first("featured") }}</span>
                       @endif
                    </div>
                <div class="well well-sm">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <a class="btn btn-link pull-right" href="{{ route('clients.index') }}"><i class="glyphicon glyphicon-backward"></i>  Back</a>
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
