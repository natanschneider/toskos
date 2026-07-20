<?php

declare(strict_types=1);

namespace App\Policies;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TaskRequest $request): Response
    {
        if (
            $request->has('id') &&
            $user->projects()->where('project.id', Task::findOrFail($request->id)->project_id)->doesntExist()
        ) {
            return Response::deny('Task provided does not belong to user or does not exist');
        }

        if (
            $request->has('parent_id') &&
            $user->projects()->where('project.id', Task::findOrFail($request->parent_id)->project_id)->doesntExist()
        ) {
            return Response::deny('Parent task provided does not belong to user or does not exist');
        }

        if (
            $request->has('project_id') &&
            $user->projects()->where('project.id', $request->project_id)->doesntExist()
        ) {
            return Response::deny('Project provided does not belong to user or does not exist');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, TaskRequest $request): Response
    {
        if (
            $request->has('parent_id') &&
            $user->projects()->where('project.id', Task::findOrFail($request->parent_id)->project_id)->doesntExist()
        ) {
            return Response::deny('Parent task provided does not belong to user or does not exist');
        }

        if (
            $request->has('project_id') &&
            $user->projects()->where('project.id', $request->project_id)->doesntExist()
        ) {
            return Response::deny('Project provided does not belong to user or does not exist');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TaskRequest $request): Response
    {
        if (
            $request->has('id') &&
            $user->projects()->where('project.id', Task::findOrFail($request->id)->project_id)->doesntExist()
        ) {
            return Response::deny('Task provided does not belong to user or does not exist');
        }

        if (
            $request->has('parent_id') &&
            $user->projects()->where('project.id', Task::findOrFail($request->parent_id)->project_id)->doesntExist()
        ) {
            return Response::deny('Parent task provided does not belong to user or does not exist');
        }

        if (
            $request->has('project_id') &&
            $user->projects()->where('project.id', $request->project_id)->doesntExist()
        ) {
            return Response::deny('Project provided does not belong to user or does not exist');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TaskRequest $request): Response
    {
        if (
            $request->has('id') &&
            $user->projects()->where('project.id', Task::findOrFail($request->id)->project_id)->doesntExist()
        ) {
            return Response::deny('Task provided does not belong to user or does not exist');
        }

        return Response::allow();
    }
}
