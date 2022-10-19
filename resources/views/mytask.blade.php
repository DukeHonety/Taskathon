<?php
    $tasks = $gameInfo['tasks'];
    $playerInfo = $gameInfo['player'];
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <input type="hidden" id="raceTime" value="{{$gameInfo['race_time']}}" />
            <h3>Race starts in <span id="countTime"></span></h3>
            <div class="form-group mt-50 flex justify-center flex-col">
                <h1>Welcome, <span class="font-bold">{{$playerInfo['name']}}</span> !</h1>
                <img src="{{asset('storage/avatars/'.$playerInfo['avatar']['url'])}}" class="avatarSlideItem"/>
            </div>
            <div class="mt-50">
                {{ csrf_field() }}
                @if(count($tasks) == 20)
                <div class="form-group my-50">
                    <a href="{{route('race')}}" class="btn btn-primary text-24"><i class="fa fa-running"></i> Enter the Race</a>
                </div>
                @else
                    <h1>Enter 20 tasks to complete</h1>
                @endif
                <div class="input-group mb-3">
                    <input type="hidden" class="form-control" name="taskId" id="taskId" value=""/>
                    <input type="text" class="form-control text-24" name="task" id="task" placeholder="Input task here" aria-label="Recipient's username" aria-describedby="basic-addon2" autofocus maxlength="30">
                    <div class="input-group-append">
                        <button type="button" id="taskadd" class="btn btn-outline-secondary text-24">Add</button>
                    </div>
                </div>
            </div>
            <div class="form-group mt-50">
                <h1>My tasks <span id="numberTasks">{{count($tasks)}}</span>/20</h1>
                <div class="task_tab container row">
                    @foreach ($tasks as $key => $task)
                        <div class="col-md-5 item btn btn-light" taskId="{{$task['id']}}">{{$task['title']}}</div>
                    @endforeach
                </div>
            </div>
            
        </div>
    </div>
</div>
@endsection

@section('script')
<script src="{{asset('storage/js/mytask.js')}}" ></script>
@endsection