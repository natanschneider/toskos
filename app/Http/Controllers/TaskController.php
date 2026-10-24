<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public static function Index(Request $request): Response
    {
        $repo = Task::query()
            ->whereHas('team', function ($query) use ($request) {
                $query->whereKey($request->user()->currentTeam->getKey());
            })
            ->where('parent_id', null)
            ->with(['status', 'responsible'])
            ->get();

        return Inertia::render('tasks/index', [
            'tasks' => $repo,
        ]);
    }

    public static function Create(string $current_team, Request $request, ?string $parent_task = null): Response
    {
        $users = $request->user()->currentTeam->members;

        $status = Status::query()->get();

        return Inertia::render('tasks/edit', [
            'users' => $users,
            'status' => $status,
        ]);
    }

    public static function Store(TaskRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $task = Task::create([
                'name'               => $request->input('name'),
                'start_date'         => $request->input('startDate'),
                'end_date'           => $request->input('endDate'),
                'planned_start_date' => $request->input('plannedStartDate'),
                'planned_end_date'   => $request->input('plannedEndDate'),
                'responsible'        => $request->input('responsible'),
                'supervisor'         => $request->input('supervisor'),
                'status_id'          => $request->input('status'),
                'team_id'            => $request->input('team'),
                'parent_id'          => $request->input('parent'),
                'created_by'         => $request->user()->id,
                'team_id'            => $request->user()->currentTeam->id,
            ]);

            return $task;
        });

        return redirect()->route('task.index');
    }
}
