<?php 
use Illuminate\Support\Facades\Storage;

$avatars = $gameInfo['avatars'];
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
                        <input type="text" class="form-control text-24" name="playername" id="playername" placeholder="Input your player name" value="{{$gameInfo['playerName']}}" required autocomplete=off @error('playername') is-invalid @enderror maxlength="10"/>
                    </div>
                </div>
                <div class="form-group mt-50 relative">
                    <div style="position:relative">
                        <h1>Select your avatar</h1>
                        <button type="button" id="goPlan" class="btn btn-primary text-24" style="position:absolute; right:0px; top:0px">Next</button>
                    </div>
                    <input type="hidden" class="form-control" name="playeravatar" id="playeravatar" placeholder="Input your player name" required autocomplete=off @error('playeravatar') is-invalid @enderror value="{{$gameInfo['playerAvatar']}}"/>                    
                    <div class="row" style="padding:10px">
                        @foreach ($avatars as $avatar)
                        <div class="col-sm-3 {{$avatar['used'] ? 'hidden' : ''}}">
                            <img src="{{asset('storage/avatars/'.$avatar['url'])}}" class="avatarSlideItem {{$gameInfo['playerAvatar'] == $avatar['id'] ? 'active' : '' }}" id="avatar{{$avatar['id']}}" imgid="{{$avatar['id']}}"/>
                        </div>
                        @endforeach
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('script')
    <script>
        let sliderPos = <?php echo $gameInfo['playerAvatar'];?> - 1;
    </script>
    <script src="{{asset('storage/js/avatar.js')}}" ></script>
@endsection