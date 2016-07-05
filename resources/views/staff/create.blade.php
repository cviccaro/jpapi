@extends('layout')
@section('css')
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker.css" rel="stylesheet">
@endsection
@section('header')
    <div class="page-header">
        <h1><i class="glyphicon glyphicon-plus"></i> Staff / Create </h1>
    </div>
@endsection

@section('content')
    @include('error')

    <div class="row">
        <div class="col-md-12">

            <form action="{{ route('staff.store') }}" method="POST">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <div class="form-group @if($errors->has('first_name')) has-error @endif">
                       <label for="first_name-field">First_name</label>
                    <input type="text" id="first_name-field" name="first_name" class="form-control" value="{{ old("first_name") }}"/>
                       @if($errors->has("first_name"))
                        <span class="help-block">{{ $errors->first("first_name") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('last_name')) has-error @endif">
                       <label for="last_name-field">Last_name</label>
                    <input type="text" id="last_name-field" name="last_name" class="form-control" value="{{ old("last_name") }}"/>
                       @if($errors->has("last_name"))
                        <span class="help-block">{{ $errors->first("last_name") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('title')) has-error @endif">
                       <label for="title-field">Title</label>
                    <input type="text" id="title-field" name="title" class="form-control" value="{{ old("title") }}"/>
                       @if($errors->has("title"))
                        <span class="help-block">{{ $errors->first("title") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('email')) has-error @endif">
                       <label for="email-field">Email</label>
                    <input type="text" id="email-field" name="email" class="form-control" value="{{ old("email") }}"/>
                       @if($errors->has("email"))
                        <span class="help-block">{{ $errors->first("email") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('phone')) has-error @endif">
                       <label for="phone-field">Phone</label>
                    <input type="text" id="phone-field" name="phone" class="form-control" value="{{ old("phone") }}"/>
                       @if($errors->has("phone"))
                        <span class="help-block">{{ $errors->first("phone") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('image_id')) has-error @endif">
                       <label for="image_id-field">Image_id</label>
                    <input type="text" id="image_id-field" name="image_id" class="form-control" value="{{ old("image_id") }}"/>
                       @if($errors->has("image_id"))
                        <span class="help-block">{{ $errors->first("image_id") }}</span>
                       @endif
                    </div>
                    <div class="form-group @if($errors->has('linkedin')) has-error @endif">
                       <label for="linkedin-field">Linkedin</label>
                    <input type="text" id="linkedin-field" name="linkedin" class="form-control" value="{{ old("linkedin") }}"/>
                       @if($errors->has("linkedin"))
                        <span class="help-block">{{ $errors->first("linkedin") }}</span>
                       @endif
                    </div>
                <div class="well well-sm">
                    <button type="submit" class="btn btn-primary">Create</button>
                    <a class="btn btn-link pull-right" href="{{ route('staff.index') }}"><i class="glyphicon glyphicon-backward"></i> Back</a>
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
