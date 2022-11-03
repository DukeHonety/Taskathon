<?php
    $tasks = $gameInfo['tasks'];
    $playerInfo = $gameInfo['player'];
    $raceInfo = $gameInfo['raceInfo'];
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <input type="hidden" id="raceTime" value="{{$raceInfo['start_at']}}" />
            <h3>Race starts in <span id="countTime"></span></h3>
            <div class="form-group mt-50 flex justify-center flex-col">
                <h1>Welcome <span class="font-bold text-capitalize">{{$playerInfo['name']}}</span>!</h1>
                <img src="{{asset('storage/avatars/'.$playerInfo['avatar']['url'])}}" class="avatarSlideItem my-30"/>
            </div>
            <div>
                {{ csrf_field() }}
                <div class="form-group my-30">
                    <!-- <div id="confirmIsSharing" class="d-flex justify-content-center form-check <?php echo count($tasks) == 20 ? '' : 'hidden'; ?>">
                        <input class="form-check-input" type="checkbox" value="" id="isSharingTask" pid="{{$playerInfo['id']}}" status="{{$playerInfo['share_task']}}">
                        <label class="form-check-label" for="isSharingTask">
                            Do you agree to share your assignment with others?
                        </label>
                    </div> -->
                    <a href="{{route('race')}}" id="goRaceLabel" class="btn btn-primary text-24 <?php echo count($tasks) == 20 ? '' : 'hidden'; ?>"><i class="fa fa-running"></i> Enter the Race</a>
                    <h1 id="inputLabel" class="<?php echo count($tasks) == 20 ? 'hidden' : ''; ?>">Enter 20 tasks to complete</h1>
                </div>
                <div class="input-group mb-3">
                    <input type="hidden" class="form-control" name="taskId" id="taskId" value=""/>
                    <input type="text" class="form-control text-24" name="task" id="task" placeholder="Input task here" aria-label="Recipient's username" aria-describedby="basic-addon2" autofocus maxlength="80" style="text-transform:capitalize;" />
                    <div class="input-group-append">
                        <button type="button" id="taskadd" class="btn btn-outline-secondary text-24">Add</button>
                    </div>
                </div>
            </div>
            <div class="form-group mt-50">
                <h1>Your Tasks @if(count($tasks) < 20) (Add <span id="numberTasks">{{20-count($tasks)}}</span> More)@endif</h1>
                <div class="task_tab container row d-flex">
                    @foreach ($tasks as $key => $task)
                        <div class="col-md-12 col-sm-12 d-flex flex-row justify-content-between item shadow p-3 mb-2 bg-white rounded text-capitalize" data-modal="taskEditorModal" taskId="{{$task['id']}}" is-share="{{$task['is_share']}}">
                            <span>{{$task['title']}}</span>
                            <?php echo $task['is_share'] == 1 ? 
                                '<i id="state-eye" class="far fa-eye float-right"></i>' 
                            :   '<i id="state-eye" class="far fa-eye-slash float-right"></i>'; ?>
                        </div>
                    @endforeach
                </div>
            </div>            
        </div>
    </div>
</div>
<div id="modal-wrapper">
    <div class="modal" id="taskEditorModal">
        <div class="modal-sandbox"></div>
        <div class="modal-box">
            <div class="modal-header">
                <h3>Update Task</h3>
                <div class="close-modal">&#10006;</div> 
            </div>
            <div class="modal-body">
                <div class="contents-wrapper">
                    <input id="modal-input" class="form-control" maxlength="80" taskId="" autofocus/>
                </div>
                <!-- <button type="button" class="btn btn-secondary close-modal">Close</button> -->
                <button type="button" class="btn btn-primary save-modal" id="modal-submit">Save</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
<script src="{{asset('storage/js/mytask.js')}}" ></script>
@endsection