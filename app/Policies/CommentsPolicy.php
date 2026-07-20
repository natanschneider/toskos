<?php

declare(strict_types=1);

namespace App\Policies;

use App\Http\Requests\CommentRequest;
use App\Models\Comments;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommentsPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, CommentRequest $request): Response
    {
        if (
            $request->has('task_id') &&
            $user->projects()->where('project.id', Task::findOrFail($request->task_id)->project_id)->doesntExist()
        ) {
            return Response::deny('Parent task provided does not belong to user or does not exist');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, CommentRequest $request): Response
    {
        if (
            $request->has('task_id') &&
            $user->projects()->where('project.id', Task::findOrFail($request->task_id)->project_id)->doesntExist()
        ) {
            return Response::deny('Parent task provided does not belong to user or does not exist');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Comments $comments): Response
    {
        if (
            $user->projects()->where('project.id', $comments->task->project_id)->doesntExist()
        ) {
            return Response::deny('Parent task provided does not belong to user or does not exist');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Comments $comments): Response
    {
        if (
            $user->projects()->where('project.id', $comments->task->project_id)->doesntExist()
        ) {
            return Response::deny('Parent task provided does not belong to user or does not exist');
        }

        return Response::allow();
    }
}
