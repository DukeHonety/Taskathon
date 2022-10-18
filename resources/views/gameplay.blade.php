<?php
$tasks = $gameInfo['tasks'];
$players = $gameInfo['players'];
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="infoTab">
            <div>Total Players : {{count($players)}}</div>
            <div>Finished Players : {{$gameInfo['finished']}}</div>
        </div>
        <div class="col-md-8 text-center">
            <div class="mt-50">
                <input type="hidden" id="raceTime" value="{{$gameInfo['race_time']}}" />
                <label class="text-24">Time remaining: <span id="countTime"></span></label>
            </div>
            
            <div class="card mt-50">
                <div class="card-header">
                    <h1>Progress Bar</h1>
                    <!-- <button class="btn btn-primary" id="minimize"><i class="fa fa-minus"></i></button> -->
                </div>
                <div class="card-body gameprogress">
                    @foreach($players as $player)
                        <div class="playerprogress">
                            <div class="info" style="margin-left:calc(<?php echo $player[
                                'complete'
                            ] * 5; ?>% - 50px);">
                                <img src="{{asset('storage/avatars/'.$player['character'].'.png')}}"/>
                                <span>{{$player['name']}}</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped" role="progressbar" style="width: <?php echo $player[
                                    'complete'
                                ] *
                                    5; ?>%" aria-valuenow="{{$player['complete']*5}}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="card mt-50">
                {{ csrf_field() }}
                <div class="card-header">
                    <h1>To do list {{$gameInfo['completed']}} / {{count($tasks)}}</h1>
                    <!-- <button class="btn btn-primary" id="minimize"><i class="fa fa-minus"></i></button> -->
                </div>
                <div class="card-body task_tab container" style="background: lavenderblush;">
                    @foreach ($tasks as $key => $task)
                        <div class="col-md-5 taskItem playItem {{$task['status'] == 1 ? 'active' : ''}}" taskid="{{$task['id']}}">
                            @if($task['status'] == 1)
                              <i class="fa fa-check-square"></i>
                            @else
                              <i class="far fa-square"></i>
                            @endif
                            <label for="checkbox-{{$task['id']}}">{{$task['title']}}<span class="box"></span></label>
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