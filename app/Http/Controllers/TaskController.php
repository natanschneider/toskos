<?php

namespace App\Http\Controllers;

use App\Models\Status;
use App\Repositories\TaskRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public static function Index(Request $request): Response
    {
        $repo = TaskRepository::Index($request);

        return Inertia::render('tasks/index', [
            'tasks' => $repo
        ]);
    }

    public static function Create(string $current_team, Request $request, string|null $parent_task=null): Response
    {
        $users = $request->user()->currentTeam->members;

        $status = Status::query()->get();

        return Inertia::render('tasks/edit', [
            'users' => $users,
            'status' => $status
        ]);
    }
}
