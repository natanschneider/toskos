<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return match ($this->method) {
            'POST' => [
                'name' => ['required', 'string', 'max:255'],
                'startDate' => ['date'],
                'endDate' => ['date'],
                'plannedStartDate' => ['date'],
                'plannedEndDate' => ['date'],
                'responsible' => ['exists:users,id'],
                'supervisor' => ['exists:users,id'],
                'status' => ['required', 'exists:status,id'],
                'team' => ['exists:teams,id'],
                'parent' => ['exists:tasks,id'],
                'markdown' => [],
            ],
            default => [
                'name' => ['required', 'string', 'max:255'],
                'startDate' => ['date'],
                'endDate' => ['date'],
                'plannedStartDate' => ['date'],
                'plannedEndDate' => ['date'],
                'responsible' => ['exists:users,id'],
                'supervisor' => ['exists:users,id'],
                'status' => ['required', 'exists:status,id'],
                'team' => ['exists:teams,id'],
                'parent' => ['exists:tasks,id'],
                'markdown' => [],
            ]
        };
    }
}
