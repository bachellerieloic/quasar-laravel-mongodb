<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    /**
     * Display a listing of the todos.
     */
    public function index(): JsonResponse
    {
        $todos = Todo::all();
        return response()->json($todos);
    }

    /**
     * Store a newly created todo.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'content' => 'required|string|max:255',
            'completed' => 'boolean'
        ]);

        $todo = Todo::create([
            'content' => $validated['content'],
            'completed' => $validated['completed'] ?? false
        ]);

        return response()->json($todo, 201);
    }

    /**
     * Update the specified todo.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);

        $validated = $request->validate([
            'content' => 'required|string|max:255'
        ]);

        $todo->update(['content' => $validated['content']]);

        return response()->json($todo);
    }

    /**
     * Update the completed status of the specified todo.
     */
    public function updateCompleted(Request $request, string $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);

        $validated = $request->validate([
            'completed' => 'required|boolean'
        ]);

        $todo->update(['completed' => $validated['completed']]);

        return response()->json($todo);
    }

    /**
     * Remove the specified todo.
     */
    public function destroy(string $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(null, 204);
    }
}