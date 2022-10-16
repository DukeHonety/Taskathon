<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Player;
use App\Models\Task;

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
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $gameInfo = [
            'race_time' => date('Y-m-d H:i:s'),
        ];
        return view('home', compact('gameInfo'));
    }

    /**
     * Set player name and avatar and redirect to mytask page
     */
    public function gomytask(Request $request)
    {
        $user = Auth::user();
        $playerName = $request->playername;
        $avatarId = $request->playeravatar;
        $exist = Player::select('*')
            ->where('user_id', $user->id)
            ->get();
        if (count($exist) > 0) {
            // return redirect()->back();
            $model = $exist[0];
        } else {
            $model = new Player();
            $model->user_id = $user->id;
        }
        $model->name = $playerName;
        $model->character = $avatarId;
        if ($model->save()) {
            return redirect()->route('mytask');
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
        }
        // get data for user tasks
        $myTasks = Task::all()
            ->where('user_id', $user->id)
            ->toArray();
        $player = Player::select('*')
            ->where('user_id', $user->id)
            ->get();
        if (count($player) === 0) {
            return redirect()->route('home');
        }
        $player = $player[0];
        $gameInfo = [
            'race_time' => date('Y-m-d H:i:s'),
            'player' => $player,
            'tasks' => $myTasks,
        ];
        return view('mytask', compact('gameInfo'));
    }

		/**
		 * Show game play page
		 */
		public function gameplay()
		{
			$user = Auth::user();
			$mytask = Task::select('*')->where('user_id', $user->id)->get()->toArray();

			$gameInfo = array(
				'tasks' => $mytask,
				'players' => 14,
				'leader' => 'Dragon',
				'finished' => 10,
				'race_time' => date('Y-m-d H:i:s')
			);
			return view('gameplay', compact('gameInfo'));
		}
}
