<?php
    $tasks = $gameInfo['tasks'];
    $playerInfo = $gameInfo['player'];
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <h3>Race starts in {{$gameInfo['race_time']}}</h3>
            <input type="hidden" id="taskcount" value="{{count($tasks)}}"/>
            <div class="form-group mt-50 flex justify-center flex-col">
                <h1>Welcome, <span class="font-bold">{{$playerInfo['name']}}</span> !</h1>
                <img src="{{asset('storage/avatars/'.$playerInfo['character'].'.png')}}" class="avatarSlideItem"/>
            </div>
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
            <div class="form-group mt-50">
                <h1>My tasks {{count($tasks)}}/20</h1>
                <div id="task_tab">
                    @foreach ($tasks as $key => $task)
                        <div class="taskItem" taskId="{{$task['id']}}">{{$task['title']}}</div>
                    @endforeach
                </div>
            </div>
            @if(count($tasks) == 20)
            <div class="form-group mt-50">
                <a href="{{route('gameplay')}}" class="btn btn-primary">Ready to start</a>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection

@section('script')
<script src="{{asset('storage/js/mytask.js')}}" ></script>
@endsection