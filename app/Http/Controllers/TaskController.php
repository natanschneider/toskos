<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Repositories\TaskRepository;
use Gate;
use Illuminate\Database\Eloquent\Collection;

class TaskController extends Controller
{
    public function get(TaskRequest $request): Collection
    {
        Gate::authorize('view', [Task::class, $request]);

        return TaskRepository::get($request);
    }

    public function store(TaskRequest $request): Task
    {
        Gate::authorize('create', [Task::class, $request]);

        return TaskRepository::store($request);
    }

    public function update(TaskRequest $request): Task
    {
        Gate::authorize('update', [Task::class, $request]);

        return TaskRepository::update($request);
    }

    public function delete(TaskRequest $request): Task
    {
        Gate::authorize('delete', [Task::class, $request]);

        return TaskRepository::delete($request);
    }
}
