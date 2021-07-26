<?php

namespace App\Http\Controllers;

use App\Task;
use App\Facades\Helpers;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    private $task;
    private $request;

    public function __construct()
    {
        $this->task = new Task;
    }

    public function store(Request $request)
    {
        $data = $request->json()->all();

        if (isset($data['all']) && $data['all'] === true) {
            return [
                'listTasks' =>  $this->task::getAllTasks()
            ];
        }

        if (isset($data['task_id'])) {
           return $this->task::getTask($data['task_id']);
        }

        return [
            'listTasks' =>  $this->task::getAllTasks()
        ];

    }

    public function show(Request $request)
    {

        $task_id = request('task_id');
        if (isset($task_id)) {
            return $this->task::getTask($task_id);
        }
        return [];
    }

    public function insert(Request $request)
    {
        $data = $request->json()->all();
        return $this->task::addTask($data);
       
    }

    public function update(Request $request)
    {
        $data = $request->json()->all();
        return $this->task::updateTask($data);
    }

    public function delete(Request $request)
    {
        $data = $request->json()->all();
        return $this->task::deleteTask($data);
    }
   
}