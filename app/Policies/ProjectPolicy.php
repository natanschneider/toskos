<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    public function view(User $user, Project $project): Response
    {
        return $user->projects()->where('project.id', $project->id)->exists()
            ? Response::allow()
            : Response::deny('Project provided does not belong to user or does not exist');
    }

    public function update(User $user, Project $project): Response
    {
        return $user->projects()->where('project.id', $project->id)->exists()
            ? Response::allow()
            : Response::deny('Project provided does not belong to user or does not exist');
    }

    public function delete(User $user, Project $project): Response
    {
        return $user->projects()->where('project.id', $project->id)->exists()
            ? Response::allow()
            : Response::deny('Project provided does not belong to user or does not exist');
    }
}
