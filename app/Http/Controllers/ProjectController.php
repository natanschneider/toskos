<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Repositories\ProjectRepository;
use Gate;
use Illuminate\Database\Eloquent\Collection;

class ProjectController extends Controller
{
    public function get(ProjectRequest $request): Collection
    {
        if ($request->has('id')) {
            Gate::authorize('view', Project::findOrFail($request->id));
        }

        return ProjectRepository::get($request);
    }

    public function store(ProjectRequest $request): Project
    {
        return ProjectRepository::store($request);
    }

    public function update(ProjectRequest $request): Project
    {
        Gate::authorize('update', Project::findOrFail($request->id));

        return ProjectRepository::update($request);
    }

    public function delete(ProjectRequest $request): Project
    {
        Gate::authorize('delete', Project::findOrFail($request->id));

        return ProjectRepository::delete($request);
    }
}
