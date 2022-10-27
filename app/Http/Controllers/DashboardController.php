<?php

namespace App\Http\Controllers;
use App\Models\Race;
use App\Models\Player;
use App\Models\Task;
use App\Models\Avatar;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index(){
        $setting = array(
            'race' => Race::select('*')->orderBy('start_at', 'desc')->limit(1)->get()->toArray()[0]
        );
        return view('admin/setting', compact('setting'));
    }
    public function updatestart(Request $request){
        $id = $request->id;
        $ndate = $request->time;
        $race_time = $request->raceTime;
        $rmodel = Race::find($id);
        if($rmodel){
            $rmodel->start_at = $ndate;
            $rmodel->race_time = $race_time;
            $rmodel->save();
            return true;
        }
        else
            return false;
    }
    public function restartrace(Request $request){
        // echo 'here';
        Player::query()->truncate();
        Task::query()->truncate();
        Avatar::select('*')->update(array('used' => 0));
        return true;
    }
}
