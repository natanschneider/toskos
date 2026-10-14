<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Status
 *
 * @property int $id
 * @property string $name
 */
class Status extends Model
{
    protected $table = 'status';

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    /**
     * Get the tasks
     *
     * @return HasMany
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'status_id');
    }
}
