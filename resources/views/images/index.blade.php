@extends('layout')

@section('header')
    <div class="page-header clearfix">
        <h1>
            <i class="glyphicon glyphicon-align-justify"></i> Images
            <a class="btn btn-success pull-right" href="{{ route('images.create') }}"><i class="glyphicon glyphicon-plus"></i> Create</a>
        </h1>

    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            @if($images->count())
                <table class="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PATH</th>
                        <th>FILENAME</th>
                        <th>ALIAS</th>
                        <th>MIMETYPE</th>
                        <th>EXTENSION</th>
                        <th>SIZE</th>
                        <th>LAST_MODIFIED</th>
                            <th class="text-right">OPTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($images as $image)
                            <tr>
                                <td>{{$image->id}}</td>
                                <td>{{$image->path}}</td>
                    <td>{{$image->filename}}</td>
                    <td>{{$image->alias}}</td>
                    <td>{{$image->mimetype}}</td>
                    <td>{{$image->extension}}</td>
                    <td>{{$image->size}}</td>
                    <td>{{$image->last_modified}}</td>
                                <td class="text-right">
                                    <a class="btn btn-xs btn-primary" href="{{ route('images.show', $image->id) }}"><i class="glyphicon glyphicon-eye-open"></i> View</a>
                                    <a class="btn btn-xs btn-warning" href="{{ route('images.edit', $image->id) }}"><i class="glyphicon glyphicon-edit"></i> Edit</a>
                                    <form action="{{ route('images.destroy', $image->id) }}" method="POST" style="display: inline;" onsubmit="if(confirm('Delete? Are you sure?')) { return true } else {return false };">
                                        <input type="hidden" name="_method" value="DELETE">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <button type="submit" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i> Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                {!! $images->render() !!}
            @else
                <h3 class="text-center alert alert-info">Empty!</h3>
            @endif

        </div>
    </div>

@endsection