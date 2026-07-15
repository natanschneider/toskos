<?php

declare(strict_types=1);

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', LoginController::class)
    ->middleware('throttle:login')
    ->name('api.login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::controller(ProjectController::class)->group(function () {
        Route::get('project', 'get');
        Route::post('project', 'store');
        Route::put('project/{project}', 'update');
        Route::delete('project/{project}', 'delete');
    });
});
