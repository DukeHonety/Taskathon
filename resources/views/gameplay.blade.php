<?php
    $tasks = $gameInfo['tasks'];
    $players = $gameInfo['players'];
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="infoTab">
            <div>Total Players : {{$gameInfo['tplayers']}}</div>
            <div>Current Leader : {{$gameInfo['leader']}}</div>
            <div>Finished Players : {{$gameInfo['finished']}}</div>
        </div>
        <div class="col-md-8 text-center">
            <div class="form-group mt-50">
                <h1>Time remaining: {{$gameInfo['race_time']}} </h1>
                <div class="gameprogress">
                    @foreach($players as $player)
                        <div class="playerprogress">
                            <div class="info" style="margin-left:calc({{$player['complete']*5}}% - 50px);">
                                <img src="{{asset('storage/avatars/'.$player['character'].'.png')}}"/>
                                <span>{{$player['name']}}</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped" role="progressbar" style="width: {{$player['complete']*5}}%" aria-valuenow="{{$player['complete']*5}}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="form-group mt-50">
                {{ csrf_field() }}
                <h1><span id="completed">{{$gameInfo['completed']}}</span> tasks are completed on {{count($tasks)}} tasks</h1>
                <div class="task_tab container row">
                    @foreach ($tasks as $key => $task)
                        <div class="col-md-5 taskItem {{$task['status'] == 1 ? 'active' : ''}}" taskid="{{$task['id']}}">
                            <label>{{$task['title']}}</label>
                            @if ($task['status'] == 0)
                                <button><i class="fa fa-check"></i></button>
                            @else
                                <button><i class="fa fa-times"></i></button>
                            @endif
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
<script src="{{asset('storage/js/gameplay.js')}}" ></script>
@endsection