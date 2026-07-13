<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'created_by',
    ];

    /**
     * Get the tasks
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
