<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Status
 *
 * @property int $id
 * @property string $name
 */
final class Status extends Model
{
    public $timestamps = false;

    protected $table = 'status';

    protected $fillable = [
        'name',
    ];

    /**
     * Get the tasks
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'status_id');
    }
}
