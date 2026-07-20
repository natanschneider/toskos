<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return match ($this->method()) {
            'GET' => [
                'task_id' => ['required', 'integer', 'exists:task,id'],
            ],
            'POST' => [
                'task_id' => ['required', 'integer', 'exists:task,id'],
                'comment' => ['required', 'string', 'max:500'],
            ],
            'PUT' => [
                'id' => ['required', 'integer', 'exists:comments,id'],
                'comment' => ['required', 'string', 'max:500'],
            ],
            'DELETE' => [
                'id' => ['required', 'integer', 'exists:comments,id'],
            ],
            default => [
                'task_id' => ['integer', 'exists:task,id'],
                'comment' => ['string', 'max:500'],
            ],
        };
    }
}
