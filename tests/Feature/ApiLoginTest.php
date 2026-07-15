<?php

declare(strict_types=1);

use App\Models\User;

test('users can create an api token', function () {
    $user = User::factory()->create();

    $response = $this->postJson(route('api.login'), [
        'email' => $user->email,
        'password' => 'password',
        'device_name' => 'Feature test',
    ]);

    $response
        ->assertSuccessful()
        ->assertJsonStructure([
            'token',
            'token_type',
            'user' => [
                'id',
                'name',
                'email',
            ],
        ])
        ->assertJsonPath('token_type', 'Bearer')
        ->assertJsonPath('user.id', $user->id);

    expect($response->json('token'))->toBeString()->not->toBeEmpty();

    $this
        ->withToken($response->json('token'))
        ->getJson('/api/user')
        ->assertSuccessful()
        ->assertJsonPath('id', $user->id);
});

test('users can not create an api token with invalid credentials', function () {
    $user = User::factory()->create();

    $this
        ->postJson(route('api.login'), [
            'email' => $user->email,
            'password' => 'wrong-password',
            'device_name' => 'Feature test',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('email');
});

test('device name is required to create an api token', function () {
    $user = User::factory()->create();

    $this
        ->postJson(route('api.login'), [
            'email' => $user->email,
            'password' => 'password',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('device_name');
});
