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
            <input type="hidden" id="taskcount" value="{{count($tasks)}}"/>
            <div class="form-group mt-50 flex justify-center flex-col">
                <h1>Welcome, <span class="font-bold">{{$playerInfo['name']}}</span> !</h1>
                <img src="{{asset('storage/avatars/'.$playerInfo['avatar']['url'])}}" class="avatarSlideItem"/>
            </div>
            <form class="mt-50" method="POST" >
                {{ csrf_field() }}
                @if(count($tasks) == 20)
                <div class="form-group my-50">
                    <a href="{{route('home')}}" class="btn btn-primary text-24"><i class="fa fa-running"></i> Enter the Race</a>
                </div>
                @else
                    <h1>Enter 20 tasks to complete</h1>
                @endif
                <div class="input-group mb-3">
                    <input type="hidden" class="form-control" name="taskId" id="taskId" value=""/>
                    <input type="text" class="form-control text-24" name="task" id="task" placeholder="Input task here" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button type="submit" id="taskadd" class="btn btn-outline-secondary text-24">Add</button>
                    </div>
                </div>
            </form>
            <div class="form-group mt-50">
                <h1>My tasks {{count($tasks)}}/20</h1>
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