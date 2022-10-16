<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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

Route::get('/home', [ App\Http\Controllers\HomeController::class, 'index' ])->name('home');
Route::post('/gomytask', [ App\Http\Controllers\HomeController::class, 'gomytask' ])->name('gomytask');
Route::get('/mytask', [ App\Http\Controllers\HomeController::class, 'mytask' ])->name('mytask');
Route::post('/mytask', [ App\Http\Controllers\HomeController::class, 'mytask' ])->name('mytask');
Route::post('/updatetask', [ App\Http\Controllers\HomeController::class, 'updatetask' ])->name('updatetask');

Route::get('/gameplay', [ App\Http\Controllers\HomeController::class, 'gameplay' ])->name('gameplay');