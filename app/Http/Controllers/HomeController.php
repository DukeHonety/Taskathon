<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Avatar;
use App\Models\Player;
use App\Models\Task;
use App\Models\Race;

class HomeController extends Controller
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

    /**
     * Show game play page
     */
    public function gameplay()
    {
        $user = Auth::user();
        //test current player is ready for race
        $allowMe = Player::where('user_id', $user->id)->get()->toArray();
        if(count($allowMe) == 0)
            return redirect()->route('avatar');
        if($allowMe[0]['tasks'] != '20')
            return redirect()->route('task');
        //
        $mytask = Task::select('*')->where('user_id', $user->id)->get()->toArray();
        $completetask = Task::where('user_id', $user->id)->where('status', '1')->count();
        $players = Player::where('tasks', '20')->with('avatar')->get()->toArray();
        $gameInfo = array(                
            'raceInfo' => Race::select('*')->orderBy('start_at', 'desc')->limit(1)->get()->toArray()[0],
            'tasks' => $mytask,
            'leader' => '',
            'finished' => Player::where('complete', 20)->count(),
            'completed' => $completetask,
            'players' => $players,
            'userInfo' => $allowMe[0]
        );
        return view('gameplay', compact('gameInfo'));
    }
    public function gamestatus()
    {
        return Player::all()->toArray();
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function avatar()
    {
        date_default_timezone_set('Asia/Kolkata');
        $user = Auth::user();
        $pInfo = Player::where('user_id', $user->id)->get();
        $pName = '';
        $pAvatar = 0;
        if (count($pInfo) > 0){
            $pName = $pInfo[0]->name;
            $pAvatar = $pInfo[0]->character;
        }
        $gameInfo = [
            'playerName'=> $pName,
            'playerAvatar'=> $pAvatar,
            'raceInfo' => Race::select('*')->orderBy('start_at', 'desc')->limit(1)->get()->toArray()[0],
            'avatars' => Avatar::all()->toArray()
        ];
        return view('avatar', compact('gameInfo'));
    }
    /**
     * Return image status
     */
    public function imagestatusall(){
        return Avatar::all()->toArray();
    }
    public function imagestatus($id){
        $user = Auth::user();
        $prevAvatar = 0;
        $player = Player::where('user_id', $user->id)->get();
        if (count($player) > 0){
            $prevAvatar = $player[0]->character;
        }
        $amodel = Avatar::where('id', $id)->get();
        if(count($amodel) == 0)
            return false;
        if($amodel[0]->used == 1 && $prevAvatar != $id)
            return false;
        return true; 
    }

    /**
     * Set player name and avatar and redirect to mytask page
     */
    public function gomytask(Request $request)
    {
        $user = Auth::user();
        $playerName = $request->playername;
        $avatarId = $request->playerAvatar;
        $exist = Player::select('*')
            ->where('user_id', $user->id)
            ->get();
        if (count($exist) > 0) {
            // return redirect()->back();
            $model = $exist[0];
            $amodel = Avatar::find($model->character);
            if ($amodel){
                $amodel->used = 0;
                $amodel->save();
            }

        } else {
            $model = new Player();
            $model->user_id = $user->id;
        }
        $model->name = $playerName;
        $model->character = $avatarId;
        if ($model->save()) {
            $amodel = Avatar::find($avatarId);
            if ($amodel){
                $amodel->used = 1;
                $amodel->save();
            }
            return redirect()->route('task');
        } else {
            return redirect()->back();
        }
    }

    /**
     * Show my task setting page
     */
    public function mytask(Request $request)
    {
        $user = Auth::user();
        // store my task list
        if (isset($request->task)) {
            if (isset($request->taskId)) {
                $newTask = Task::find($request->taskId);
            } else {
                $newTask = Task::select('*')
                    ->where('user_id', $user->id)
                    ->where('title', $request->task)
                    ->get();
                if (count($newTask) > 0) {
                    $newTask = $newTask[0];
                } else {
                    $newTask = new Task();
                }
            }
            $newTask->title = $request->task;
            $newTask->user_id = $user->id;
            $newTask->save();

            // update player task number
            $mtask = Player::where('user_id', $user->id)->get();
            if(count($mtask) == 0)
                return redirect()->route('avatar');
            $mtask = $mtask[0];
            $mtask->tasks = Task::where('user_id', $user->id)->count();
            $mtask->save();
            return $newTask;
        }
        
        // get data for user tasks
        $myTasks = Task::all()
            ->where('user_id', $user->id)
            ->toArray();
        $player = Player::select('*')
            ->where('user_id', $user->id)
            ->with('avatar')
            ->get()->toArray();
        if (count($player) === 0) {
            return redirect()->route('avatar');
        }
        $player = $player[0];
        $gameInfo = [
            'raceInfo' => Race::select('*')->orderBy('start_at', 'desc')->limit(1)->get()->toArray()[0],
            'player' => $player,
            'tasks' => $myTasks,
        ];
        return view('mytask', compact('gameInfo'));
    }

    /** 
     * Update status of my task
     */
    public function updatetask(Request $request)
    {
        $user = Auth::user();
        $taskId = $request->taskId;
        $status = $request->status;
        $tmodel = Task::find($taskId);
        if(!$tmodel)
            return false;
        $tmodel->status = $status;
        $tmodel->save();

        $completetask = Task::where('user_id', $user->id)->where('status', '1')->count();
        $pmodel = Player::where('user_id', $user->id)->get();
        if (count($pmodel) > 0)
            $pmodel = $pmodel[0];
        $pmodel->complete = $completetask;
        $pmodel->save();
        return $taskId;
    }

    public function getTaskByUser(Request $request) {
        $userId = $request->user_id;
        $currentPlayerInfo = Player::select('*')->where('user_id', $userId)->get();

        if(count($currentPlayerInfo) != 0) {
            if($currentPlayerInfo[0]->tasks == 20) {
                $selectedTasks = Task::select('*')->where('user_id', $userId)->get()->toArray();
                $selectedTasks = [
                    'current_tasks' => Task::select('*')->where('user_id', $userId)->get()->toArray(),
                    'player_info' => Player::select('id', 'name', 'share_task')->where('user_id', $userId)->get()
                ];
                return $selectedTasks;
            }
        }
        return false;
    }

    public function updatetasktitle(Request $request) {
        $taskId = $request->t_id;
        $taskTitle = $request->t_title;
        $tmodel = Task::find($taskId);
        if(!$tmodel)
            return false;
        $tmodel->title = $taskTitle;
        $tmodel->save();
        return true;
    }
}
