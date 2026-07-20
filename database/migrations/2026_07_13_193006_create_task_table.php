<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('status', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
        });

        Schema::create('task', function (Blueprint $table): void {
            $table->id();
            $table->string('name', 255);
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->timestamp('planned_start_date')->nullable();
            $table->timestamp('planned_end_date')->nullable();
            $table->string('responsible')->nullable();
            $table->string('supervisor')->nullable();
            $table->string('doc_file', 500)->nullable();
            $table->unsignedBigInteger('status_id');
            $table->string('created_by', 255);
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->timestamps();

            $table->foreign('status_id')->references('id')->on('status');
            $table->foreign('project_id')->references('id')->on('project');
            $table->foreign('parent_id')->references('id')->on('task');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task');
        Schema::dropIfExists('status');
    }
};
