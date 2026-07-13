<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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
        'project_id',
        'parent_id',
    ];

    /**
     * Get the parent task
     */
    public function parent()
    {
        return $this->belongsTo(Task::class, 'parent_id');
    }

    /**
     * Get the children tasks
     */
    public function children()
    {
        return $this->hasMany(Task::class, 'parent_id');
    }

    /**
     * Get the project
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the status
     */
    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
