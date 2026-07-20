<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comments;
use App\Repositories\CommentRepository;
use Gate;
use Illuminate\Database\Eloquent\Collection;

class CommentController extends Controller
{
    public function get(CommentRequest $request): Collection
    {
        Gate::authorize('view', [Comments::class, $request]);

        return CommentRepository::get($request);
    }

    public function store(CommentRequest $request): Comments
    {
        Gate::authorize('create', [Comments::class, $request]);

        return CommentRepository::store($request);
    }

    public function update(CommentRequest $request): Comments
    {
        Gate::authorize('update', Comments::findOrFail($request->id));

        return CommentRepository::update($request);
    }

    public function delete(CommentRequest $request): Comments
    {
        Gate::authorize('delete', Comments::findOrFail($request->id));

        return CommentRepository::delete($request);
    }
}
