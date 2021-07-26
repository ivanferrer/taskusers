<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/', function () {
    return  'Api User tasks ';
});

Route::group(['prefix' => 'add'], function () {
    Route::post('/user', 'UserController@insert');
    Route::post('/task', 'TaskController@insert');
});
Route::group(['prefix' => 'update'], function () {
    Route::post('/user', 'UserController@update');
    Route::post('/task', 'TaskController@update');
    
});

Route::group(['prefix' => 'delete'], function () {
    Route::post('/user', 'UserController@delete');
    Route::post('/task', 'TaskController@delete');
    
});

Route::group(['prefix' => 'list'], function () {
    Route::post('/user', 'UserController@store');
    Route::post('/task', 'TaskController@store');
});

Route::group(['prefix' => 'show'], function () {
    Route::get('/user/{id}', 'UserController@show');
    Route::get('/task/{task_id}', 'TaskController@show');
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
