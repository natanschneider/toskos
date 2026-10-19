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
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return match($this->method) {
            'POST' => [
                'name' => ['required', 'string', 'max:255'],
                'startDate' => ['date'],
                'endDate' => ['date'],
                'plannedStartDate' => ['date'],
                'plannedEndDate' => ['date'],
                'responsible' => ['int', 'exist:users,id'],
                'supervisor' => ['int', 'exist:users,id'],
                'status' => ['int', 'exist:status,id'],
                'team' => ['int', 'exist:teams,id'],
                'parent' => ['int', 'exist:tasks,id']
            ],
            default => [
                'name' => ['required', 'string', 'max:255'],
                'startDate' => ['date'],
                'endDate' => ['date'],
                'plannedStartDate' => ['date'],
                'plannedEndDate' => ['date'],
                'responsible' => ['int', 'exist:users,id'],
                'supervisor' => ['int', 'exist:users,id'],
                'status' => ['int', 'exist:status,id'],
                'team' => ['int', 'exist:teams,id'],
                'parent' => ['int', 'exist:tasks,id']
            ]
        };
    }
}
