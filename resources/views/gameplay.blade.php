<?php
$tasks = $gameInfo['tasks']; ?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="flex">
            <div>Total Players : {{$gameInfo['players']}}</div>
            <div>Current Leader : {{$gameInfo['leader']}}</div>
            <div>Finished Players : {{$gameInfo['finished']}}</div>
        </div>
        <div class="col-md-8 text-center">
            <input type="hidden" id="taskcount" value="{{count($tasks)}}"/>
            <form class="mt-50" method="POST" >
                {{ csrf_field() }}
                <h1>Enter 20 tasks to complete</h1>
                <div class="input-group mb-3">
                    <input type="hidden" class="form-control" name="taskId" id="taskId" value=""/>
                    <input type="text" class="form-control" name="task" id="task" placeholder="Input task here" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button type="submit" id="taskadd" class="btn btn-outline-secondary">Add</button>
                    </div>
                </div>
            </form>
            <div class="form-group">
                <h1>My tasks {{count($tasks)}}/20</h1>
                <div id="task_tab">
                    @foreach ($tasks as $key => $task)
                        <div class="taskItem" taskId="{{$task['id']}}">{{$task['title']}}</div>
                    @endforeach
                </div>
            </div>
            @if(count($tasks) == 20)
            <div class="form-group">
                <a href="{{route('gameplay')}}"></a>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection

@section('script')
<script src="{{asset('storage/js/gameplay.js')}}" ></script>
@endsection