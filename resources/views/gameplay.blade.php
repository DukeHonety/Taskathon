<?php
$tasks = $gameInfo['tasks'];
$players = $gameInfo['players'];
$currentPlayer = $gameInfo['userInfo'];
$raceInfo = $gameInfo['raceInfo'];
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <canvas id="world" style="display:none"></canvas>
    <div class="row justify-content-center">
        <div style="width:100%">
            <button id="test-confetti" class="btn btn-primary">confetti</button>
        </div>
        <div class="infoTab">
            <div>Total Players : {{count($players)}}</div>
            <div>Finished Players : {{$gameInfo['finished']}}</div>
        </div>
        <div class="col-md-10 text-center">
            <div class="mt-50">
                <input type="hidden" id="raceTime" value="{{$raceInfo['start_at']}}" />
                <input type="hidden" id="race_time" value="{{$raceInfo['race_time']}}" />
                <label class="text-24"><span id="timeLabel">Time remaining</span>: <span id="countTime"></span></label>
            </div>
            <h2 class="my-30 <?php echo $currentPlayer['complete'] != 20 ? 'hidden' : ''; ?>" id="congratLabel">Congrats! You finished!</h2>
            
            <div class="card my-30">
                {{ csrf_field() }}
                <div class="card-header">
                    <h2>Task List <span id="numberComplete">{{$gameInfo['completed']}}</span> / {{count($tasks)}}</h2>
                    <button class="btn btn-primary" id="minimize"><i class="fa fa-minus"></i></button>
                </div>
                <div class="card-body task_tab container row">
                    @foreach ($tasks as $key => $task)
                        <div class="col-md-5 taskItem playItem {{$task['status'] == 1 ? 'active' : ''}}" taskid="{{$task['id']}}">
                            @if($task['status'] == 1)
                              <i class="far fa-check-square"></i>
                            @else
                              <i class="far fa-square"></i>
                            @endif
                            <!-- start confetti cannon -->
                            <div class="icon">
                                <div class="cannon"></div>
                                <div class="confetti">
                                    <svg viewBox="0 0 18 16">
                                        <polyline points="1 10 4 7 4 5 6 1" />
                                        <path d="M4,13 C5.33333333,9 7,7 9,7 C11,7 12.3340042,6 13.0020125,4" />
                                        <path d="M6,15 C7.83362334,13.6666667 9.83362334,12.6666667 12,12 C14.1663767,11.3333333 15.8330433,9.66666667 17,7" />
                                    </svg>
                                    <i></i><i></i><i></i><i></i><i></i><i></i>
                                    <div class="emitter"></div>
                                </div>
                            </div>
                            <!-- end confetti cannon -->
                            <label for="checkbox-{{$task['id']}}">{{$task['title']}}<span class="box"></span></label>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2>Progress Bar</h2>
                    <!-- <button class="btn btn-primary" id="minimize"><i class="fa fa-minus"></i></button> -->
                </div>
                <div class="card-body gameprogress">
                    @foreach($players as $player)
                        <?php
                            $completed = $player['complete'] == 20 ? 'complete' : '';
                        ?>
                        <div class="playerprogress" playerId="{{$player['id']}}">
                            <div class="info" style="margin-left:calc(<?php echo $player[
                                'complete'
                            ] * 5; ?>% - 50px);">
                                <img class="player-avatar modal-trigger" data-modal="tasklistModal" src="{{asset('storage/avatars/'.$player['character'].'.png')}}" alt="{{$player['complete']}}" visible="{{$player['share_task']}}" uid="{{$player['user_id']}}"/>
                                <div id="name" style="font-size:18px; width:150px; text-align: center;">{{$player['name']}}</div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped {{$completed}}" role="progressbar" style="width: <?php echo $player['complete'] * 5; ?>%;" aria-valuenow="{{$player['complete']*5}}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
<div id="modal-wrapper">
    <div class="modal" id="tasklistModal">
        <div class="modal-sandbox"></div>
        <div class="modal-box">
            <div class="modal-header">
                <div class="close-modal">&#10006;</div> 
                <h3></h3>
            </div>
            <div class="modal-body">
                <div class="contents-wrapper">
                    <table class="task-list"></table>
                </div>
                <button class="btn btn-primary close-modal">Close</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
<script src="{{asset('storage/js/gameplay.js')}}" ></script>
<script src="{{asset('storage/js/confetti.js')}}" ></script>
<script src="{{asset('storage/js/cannon.js')}}" ></script>
@endsection