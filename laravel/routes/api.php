<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::prefix('todos')->group(function () {
    Route::get('/', [TodoController::class, 'index']);
    Route::post('/', [TodoController::class, 'store']);
    Route::put('/{id}', [TodoController::class, 'update']);
    Route::patch('/{id}/completed', [TodoController::class, 'updateCompleted']);
    Route::delete('/{id}', [TodoController::class, 'destroy']);
});