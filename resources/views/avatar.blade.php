<?php 
use Illuminate\Support\Facades\Storage;

$avatars = $gameInfo['avatars'];
$raceInfo = $gameInfo['raceInfo'];
?>
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <input type="hidden" id="raceTime" value="{{$raceInfo['start_at']}}" />
            <h3>Race starts in <span id="countTime"></span></h3>
            <form class="hometab" method="POST" action="{{ route('gomytask') }}">
                {{ csrf_field() }}
                <div class="form-group mt-50">
                    <h1>Enter your display name</h1>
                    <div class="col-md-8 offset-md-2">
                        <input type="text" class="form-control text-24 text-capitalize" name="playername" id="playername" placeholder="Input your player name" value="{{$gameInfo['playerName'] == '' ? Auth::user()->name : $gameInfo['playerName']}}" required autocomplete=off maxlength="14"/>
                    </div>
                </div>
                <div class="form-group mt-50 relative">
                    <div style="position:relative">
                        <h1>Select your avatar</h1>
                        <button type="button" id="goPlan" class="btn btn-primary text-24" style="position:absolute; right:0px; top:0px">Next</button>
                    </div>
                    <input type="hidden" class="form-control" name="currentPlayerAvatar" id="currentPlayerAvatar" required autocomplete=off  value="{{$gameInfo['playerAvatar']}}"/>  
                    <input type="hidden" class="form-control" name="playerAvatar" id="playerAvatar" required autocomplete=off  value="{{$gameInfo['playerAvatar']}}"/>                    
                    <div class="row" style="padding:10px">
                        @foreach ($avatars as $avatar)
                        <div class="col-sm-3 {{($avatar['used'] && $avatar['id'] != $gameInfo['playerAvatar']) ? 'hidden' : ''}}">
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