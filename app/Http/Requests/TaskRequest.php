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
                'responsible' => ['int', 'exists:users,id'],
                'supervisor' => ['int', 'exists:users,id'],
                'status' => ['int', 'exists:status,id'],
                'team' => ['int', 'exists:teams,id'],
                'parent' => ['int', 'exists:tasks,id'],
            ],
            default => [
                'name' => ['required', 'string', 'max:255'],
                'startDate' => ['date'],
                'endDate' => ['date'],
                'plannedStartDate' => ['date'],
                'plannedEndDate' => ['date'],
                'responsible' => ['int', 'exists:users,id'],
                'supervisor' => ['int', 'exists:users,id'],
                'status' => ['int', 'exists:status,id'],
                'team' => ['int', 'exists:teams,id'],
                'parent' => ['int', 'exists:tasks,id'],
            ]
        };
    }
}
