<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Http\RedirectResponse;

final class CommentController extends Controller
{
    public static function Create(CommentRequest $request): RedirectResponse
    {
        Comment::create([
            'comment' => $request->input('comment'),
            'task_id' => $request->input('task'),
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('task.edit', $request->input('task'));
    }
}
