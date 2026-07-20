<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return match ($this->method()) {
            'POST' => [
                'name' => ['required', 'string', 'max:255'],
                'start_date' => [Rule::date()->format('Y-m-d')],
                'end_date' => [Rule::date()->format('Y-m-d')],
                'planned_start_date' => [Rule::date()->format('Y-m-d')],
                'planned_end_date' => [Rule::date()->format('Y-m-d')],
                'responsible' => ['int', 'exists:users,id'],
                'supervisor' => ['int', 'exists:users,id'],
                'status_id' => ['required', 'int', 'exists:status,id'],
                'project_id' => ['required', 'int', 'exists:project,id'],
                'parent_id' => ['int', 'exists:task,id'],
            ],
            'GET' => [
                'id' => ['integer', 'exists:task,id'],
                'parent_id' => ['integer', 'exists:task,id'],
                'project_id' => ['integer', 'exists:project,id'],
            ],
            'PUT' => [
                'id' => ['required', 'integer', 'exists:task,id'],
                'name' => ['string', 'max:255'],
                'start_date' => [Rule::date()->format('Y-m-d')],
                'end_date' => [Rule::date()->format('Y-m-d')],
                'planned_start_date' => [Rule::date()->format('Y-m-d')],
                'planned_end_date' => [Rule::date()->format('Y-m-d')],
                'responsible' => ['int', 'exists:users,id'],
                'supervisor' => ['int', 'exists:users,id'],
                'status_id' => ['int', 'exists:status,id'],
                'project_id' => ['int', 'exists:project,id'],
                'parent_id' => ['int', 'exists:task,id'],
            ],
            'DELETE' => [
                'id' => ['required', 'integer', 'exists:task,id'],
            ],
            default => [
                'id' => ['integer', 'exists:task,id'],
                'name' => ['string', 'max:255'],
                'start_date' => [Rule::date()->format('Y-m-d')],
                'end_date' => [Rule::date()->format('Y-m-d')],
                'planned_start_date' => [Rule::date()->format('Y-m-d')],
                'planned_end_date' => [Rule::date()->format('Y-m-d')],
                'responsible' => ['int', 'exists:users,id'],
                'supervisor' => ['int', 'exists:users,id'],
                'status_id' => ['int', 'exists:status,id'],
                'project_id' => ['int', 'exists:project,id'],
                'parent_id' => ['int', 'exists:task,id'],
            ]
        };
    }
}
