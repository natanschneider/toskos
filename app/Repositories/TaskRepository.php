<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class TaskRepository
{
    public static function Index(Request $request): Collection
    {
        $tasks = Task::query()
            ->whereHas('team', function ($query) use ($request) {
                $query->whereKey($request->user()->currentTeam->getKey());
            })
            ->where('parent_id', null)
            ->with(['status', 'responsible'])
            ->get();

        return $tasks;
    }
}
