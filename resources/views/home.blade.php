<?php 
use Illuminate\Support\Facades\Storage;

$avatars = array("1","2","3","4","5","6","7","8")
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <input type="hidden" id="raceTime" value="{{$gameInfo['race_time']}}" />
            <h3>Race starts in <span id="countTime"></span></h3>
            <form class="hometab" method="POST" action="{{ route('gomytask') }}">
                {{ csrf_field() }}
                <div class="form-group mt-50">
                    <h1>Enter your display name</h1>
                    <div class="col-md-8 offset-md-2">
                        <input type="text" class="form-control" name="playername" id="playername" placeholder="Input your player name" required autocomplete=off @error('playername') is-invalid @enderror/>
                    </div>
                </div>
                <div class="form-group mt-50">
                    <h1>Select your avatar</h1>
                    <input type="hidden" class="form-control" name="playeravatar" id="playeravatar" placeholder="Input your player name" required autocomplete=off @error('playeravatar') is-invalid @enderror/>
                    <div class="avatarSlider">
                        @foreach ($avatars as $avatar)
                            <img src="{{asset('storage/avatars/'.$avatar.'.png')}}" class="avatarSlideItem" id="{{$avatar}}"/>
                        @endforeach
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" id="submit" class="btn btn-primary">Next</button>                   
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('script')
    <script src="{{asset('storage/js/home.js')}}" ></script>
@endsection