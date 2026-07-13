<?php

declare(strict_types=1);

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class status extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $status = [
            ['id' => 1, 'name' => 'TO-DO'],
            ['id' => 2, 'name' => 'IN-PROGRESS'],
            ['id' => 3, 'name' => 'DONE'],
            ['id' => 4, 'name' => 'CANCELLED'],
            ['id' => 5, 'name' => 'PENDING'],
        ];

        DB::table('status')->insert($status);
    }
}
