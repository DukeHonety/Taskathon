<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/login');
});

// Route::namespace('Auth')->group(function () {
//   Route::get('/login','LoginController@show_login_form')->name('login');
//   Route::post('/login','LoginController@process_login')->name('login');
//   Route::get('/register','LoginController@show_signup_form')->name('register');
//   Route::post('/register','LoginController@process_signup');
//   Route::post('/logout','LoginController@logout')->name('logout');
// });
Auth::routes();

Route::get('/home', [ HomeController::class, 'gameplay' ])->name('race');
Route::get('/gamestatus', [ HomeController::class, 'gamestatus' ]);

Route::post('/gomytask', [ HomeController::class, 'gomytask' ])->name('gomytask');
Route::get('/mytask', [ HomeController::class, 'mytask' ])->name('task');
Route::post('/mytask', [ HomeController::class, 'mytask' ]);
Route::post('/updatetask', [ HomeController::class, 'updatetask' ])->name('updatetask');

Route::get('/avatar', [ HomeController::class, 'avatar' ])->name('avatar');
Route::get('/imagestatus/all', [ HomeController::class, 'imagestatusall' ])->name('imagestatusall');
Route::get('/imagestatus/{id}', [ HomeController::class, 'imagestatus' ])->name('imagestatus');


Route::get('/settings', [DashboardController::class, 'index'])->name('settings');
Route::post('/updatestart', [DashboardController::class, 'updatestart']);
Route::post('/restartrace', [DashboardController::class, 'restartrace']);