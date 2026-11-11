<?php

declare(strict_types=1);

namespace App\Policies;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Auth\Access\Response;

final class TaskPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task): Response
    {
        if (! $user->belongsToTeam(Team::find($task->team_id))) {
            return Response::deny('User does not belong to team');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, TaskRequest $request): Response
    {
        if (
            $request->has('parent')
            && (! $user->belongsToTeam(Team::find(Task::find($request->parent)?->team_id)))
        ) {
            return Response::deny('User does not belong to team');
        }
        if (! $user->belongsToTeam(Team::find($request->team))) {
            return Response::deny('User does not belong to team');
        }
        if (! User::find($request->responsible)->belongsToTeam(Team::find($request->team))) {
            return Response::deny('User does not belong to team');
        }
        if (! User::find($request->supervisor)->belongsToTeam(Team::find($request->team))) {
            return Response::deny('User does not belong to team');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task, TaskRequest $request): Response
    {
        if (! $user->belongsToTeam(Team::find($task->team_id))) {
            return Response::deny('User does not belong to team');
        }

        if (
            $request->has('parent')
            && (! $user->belongsToTeam(Team::find(Task::find($request->parent)?->team_id)))
        ) {
            return Response::deny('User does not belong to team');
        }
        if (! $user->belongsToTeam(Team::find($request->team))) {
            return Response::deny('User does not belong to team');
        }
        if (! User::find($request->responsible)->belongsToTeam(Team::find($request->team))) {
            return Response::deny('User does not belong to team');
        }
        if (! User::find($request->supervisor)->belongsToTeam(Team::find($request->team))) {
            return Response::deny('User does not belong to team');
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Task $task): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Task $task): bool
    {
        return false;
    }
}
