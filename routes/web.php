<?php

declare(strict_types=1);

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

Route::inertia('/', 'welcome')->name('home');

Route::get('/debug-proto', function () {
    return [
        'secure' => request()->secure(),
        'scheme' => request()->getScheme(),
        'x_forwarded_proto' => request()->header('X-Forwarded-Proto'),
        'remote_addr' => $_SERVER['REMOTE_ADDR'] ?? null,
    ];
});

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
        Route::get('tasks', [TaskController::class, 'Index'])->name('task.index');
        Route::get('tasks/create/{parent_task?}', [TaskController::class, 'create'])->name('task.create');
        Route::post('tasks/create', [TaskController::class, 'store'])->name('task.store');
        Route::get('tasks/edit/{task}', [TaskController::class, 'edit'])->name('task.edit');
        Route::put('tasks/edit/{task}', [TaskController::class, 'manipulate'])->name('task.manipulate');
        Route::post('comments/create', [CommentController::class, 'create'])->name('comment.create');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__ . '/settings.php';
