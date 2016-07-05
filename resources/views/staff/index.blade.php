@extends('layout')

@section('header')
    <div class="page-header clearfix">
        <h1>
            <i class="glyphicon glyphicon-align-justify"></i> Staff
            <a class="btn btn-success pull-right" href="{{ route('staff.create') }}"><i class="glyphicon glyphicon-plus"></i> Create</a>
        </h1>

    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            @if($staff->count())
                <table class="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FIRST_NAME</th>
                        <th>LAST_NAME</th>
                        <th>TITLE</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>IMAGE_ID</th>
                        <th>LINKEDIN</th>
                            <th class="text-right">OPTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($staff as $staff)
                            <tr>
                                <td>{{$staff->id}}</td>
                                <td>{{$staff->first_name}}</td>
                    <td>{{$staff->last_name}}</td>
                    <td>{{$staff->title}}</td>
                    <td>{{$staff->email}}</td>
                    <td>{{$staff->phone}}</td>
                    <td>{{$staff->image_id}}</td>
                    <td>{{$staff->linkedin}}</td>
                                <td class="text-right">
                                    <a class="btn btn-xs btn-primary" href="{{ route('staff.show', $staff->id) }}"><i class="glyphicon glyphicon-eye-open"></i> View</a>
                                    <a class="btn btn-xs btn-warning" href="{{ route('staff.edit', $staff->id) }}"><i class="glyphicon glyphicon-edit"></i> Edit</a>
                                    <form action="{{ route('staff.destroy', $staff->id) }}" method="POST" style="display: inline;" onsubmit="if(confirm('Delete? Are you sure?')) { return true } else {return false };">
                                        <input type="hidden" name="_method" value="DELETE">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <button type="submit" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i> Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                {!! $staff->render() !!}
            @else
                <h3 class="text-center alert alert-info">Empty!</h3>
            @endif

        </div>
    </div>

@endsection