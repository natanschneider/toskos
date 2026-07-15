<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
                'id' => ['integer', 'exists:project,id'],
            ],
            'POST' => [
                'name' => ['required', 'string', 'max:255'],
            ],
            'PUT' => [
                'id' => ['required', 'integer', 'exists:project,id'],
                'name' => ['required', 'string', 'max:255'],
            ],
            'DELETE' => [
                'id' => ['required', 'integer', 'exists:project,id'],
            ],
            default => [
                'id' => ['integer', 'exists:project,id'],
                'name' => ['string', 'max:255'],
            ],
        };
    }
}
