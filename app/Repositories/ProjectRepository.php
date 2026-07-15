<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\UserProject;
use DB;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository
{
    public static function get(ProjectRequest $request): Collection
    {
        $qry = $request->user()->projects();

        if ($request->has('id')) {
            $qry->where('projects.id', $request->id);
        }

        return $qry->get();
    }

    public static function store(ProjectRequest $request): Project
    {
        return DB::transaction(function () use ($request) {
            $project = Project::create([
                'name' => $request->name,
                'created_by' => $request->user()->name,
            ]);

            UserProject::create([
                'project_id' => $project->id,
                'user_id' => $request->user()->id,
            ]);

            return $project;
        });
    }

    public static function update(ProjectRequest $request): Project
    {
        Project::where('id', $request->id)->update([
            'name' => $request->name,
        ]);

        return Project::find($request->id);
    }

    public static function delete(ProjectRequest $request): Project
    {
        return DB::transaction(function () use ($request) {
            $project = Project::find($request->id);

            $project->users()->detach();
            $project->tasks()->delete();
            $project->delete();

            return $project;
        });
    }
}
