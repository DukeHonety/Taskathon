<?php
    $raceInfo = $setting['race'];
    $start_race = date_create($raceInfo['start_at']);
    $startTimeStamp = 0;
    if ($start_race === false) {
        die("Incorrect date string");
    } else {
        $startTimeStamp = $start_race->getTimestamp();
    }
    $start_date = getdate($startTimeStamp);
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="form-group">
            {{ csrf_field() }}
            <input type="hidden" id="raceId" value="{{$raceInfo['id']}}" />
            <h3>Race Start Time</h3>
            <div class="my-30">
                <input type="number" id="month" class="w-40" value="{{$start_date['mon']}}" min="1" max="12"/>/
                <!-- <label>Month</label> -->
                <input type="number" id="day" class="w-40" value="{{$start_date['mday']}}" min="1" max="31"/>/
                <!-- <label>Day</label> -->
                <input type="number" id="year" class="w-60" value="{{$start_date['year']}}" min="2022"/>
                <!-- <label>Year</label> -->
                <input type="number" id="hour" class="w-40 ml-30" value="{{$start_date['hours']}}" min="0" max="23"/>:
                <!-- <label>H</label> -->
                <input type="number" id="min" class="w-40" value="{{$start_date['minutes']}}" min="0" max="59"/>
                <!-- <label>Min</label> -->
            </div>
            <div class="my-30">
                <Label>Race Time</Label>
                <input type="number" id="racetime" class="w-40" value="{{$raceInfo['race_time']}}" min="1" max="24"/>
            </div>
            <div class="my-30">
                <button id="updateStart" class="btn btn-primary">Update</button>
                <button id="restartRace" class="btn btn-primary">Restart</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
<script src="{{asset('storage/js/setting.js')}}" ></script>
@endsection