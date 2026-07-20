<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use DB;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository
{
    public static function get(TaskRequest $request): Collection
    {
        $qry = Task::query();

        if ($request->has('id')) {
            $qry->where('task.id', $request->id);
        }

        if ($request->has('parent_id')) {
            $qry->where('task.parent_id', $request->parent_id);
        }

        if ($request->has('project_id')) {
            $qry->where('task.project_id', $request->project_id);
        }

        $qry->whereIn('task.project_id', $request->user()->projects()->pluck('project.id'));

        return $qry->get();
    }

    public static function store(TaskRequest $request): Task
    {
        return Task::create([
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'planned_start_date' => $request->planned_start_date,
            'planned_end_date' => $request->planned_end_date,
            'responsible' => $request->responsible,
            'supervisor' => $request->supervisor,
            'status_id' => $request->status_id,
            'project_id' => $request->project_id,
            'parent_id' => $request->parent_id,
            'created_by' => $request->user()->id,
        ]);
    }

    public static function update(TaskRequest $request): Task
    {
        Task::where('id', $request->id)->update([
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'planned_start_date' => $request->planned_start_date,
            'planned_end_date' => $request->planned_end_date,
            'responsible' => $request->responsible,
            'supervisor' => $request->supervisor,
            'status_id' => $request->status_id,
            'project_id' => $request->project_id,
            'parent_id' => $request->parent_id,
        ]);

        return Task::find($request->id);
    }

    public static function delete(TaskRequest $request): Task
    {
        return DB::transaction(function () use ($request) {
            $task = Task::find($request->id);

            $task->delete();

            return $task;
        });
    }
}
