<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Status;

/**
 * Class Task
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property \Illuminate\Support\Carbon|null $planned_start_date
 * @property \Illuminate\Support\Carbon|null $planned_end_date
 * @property string|null $responsible
 * @property string|null $supervisor
 * @property string|null $doc_file
 * @property int $status_id
 * @property string $created_by
 * @property int $team_id
 * @property int|null $parent_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @property-read Status $status
 * @property-read Team $team
 * @property-read Task|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Task> $children
 */
class Task extends Model
{
    protected $table = 'tasks';

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'planned_start_date',
        'planned_end_date',
        'responsible',
        'supervisor',
        'doc_file',
        'status_id',
        'created_by',
        'team_id',
        'parent_id',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'planned_start_date' => 'datetime',
        'planned_end_date' => 'datetime',
    ];

    /**
     * Get the status associated with the task.
     *
     * @return BelongsTo
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    /**
     * Get the team associated with the task.
     *
     * @return BelongsTo
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'team_id');
    }

    /**
     * Get the parent task.
     *
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'parent_id');
    }

    /**
     * Get the child tasks.
     *
     * @return HasMany
     */
    public function children(): HasMany
    {
        return $this->hasMany(Task::class, 'parent_id');
    }

    /**
     * Get the comments
     *
     * @return HasMany
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'task_id');
    }

    /**
     * Get the subtasks
     *
     * @return HasMany
     */
    public function subTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'parent_id');
    }

    /**
     * Get responsible user
     *
     * @return BelongsTo
     */
    public function responsible(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responsible');
    }

    /**
     * Get supervisor user
     *
     * @return BelongsTo
     */
    public function supervisorUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor');
    }
}
