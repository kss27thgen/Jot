<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    Route::get('/contacts', 'ContactsController@index');
    Route::post('/contacts', 'ContactsController@store');
    Route::get('/contacts/{contact}', 'ContactsController@show');
    Route::patch('/contacts/{contact}', 'ContactsController@update');
    Route::delete('/contacts/{contact}', 'ContactsController@destroy');
    Route::post('/search', 'SearchController@index');
});
