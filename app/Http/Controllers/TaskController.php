<?php

namespace App\Http\Controllers;

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
}
