<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Http\Requests\CommentRequest;
use App\Models\Comments;
use Illuminate\Database\Eloquent\Collection;

class CommentRepository
{
    public static function get(CommentRequest $request): Collection
    {
        return Comments::where('task_id', $request->task_id)->get();
    }

    public static function store(CommentRequest $request): Comments
    {
        return Comments::create([
            'task_id' => $request->task_id,
            'comment' => $request->comment,
            'user_id' => $request->user()->id,
        ]);
    }

    public static function update(CommentRequest $request): Comments
    {
        Comments::where('id', $request->id)->update([
            'comment' => $request->comment,
        ]);

        return Comments::find($request->id);
    }

    public static function delete(CommentRequest $request): Comments
    {
        $comment = Comments::find($request->id);

        $comment->delete();

        return $comment;
    }
}
