<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use App\GeneralServices;

class Task extends Model
{
    protected $table = 'tasks';
    public $timestamps = false;
    protected $primaryKey = 'task_id';

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'is_inifinite',
    ];

    public static function getTask($id)
    {
        return self::where('task_id', $id)
        ->where('is_active', 1)
        ->first();
    }

    public static function getAllTasks()
    {
        return self::where('is_active', 1)->get();
    }

    public static function dataOnly($data)
    {
        return Arr::only($data, $this->fillable);
    }

    private static function formmatDate($date_str = null) {

        if($date_str != null) {
            $result = $date_str;
            try {
                if ($date = \DateTime::createFromFormat('Y-m-d\TH:i:s', $date_str)) {
                    $result = $date->format('Y-m-d H:i:s');
                } elseif ($date = \DateTime::createFromFormat('Y-m-d\TH:i:s.uP', $date_str)) {
                    $result = $date->format('Y-m-d H:i:s');
                } elseif ($date = \DateTime::createFromFormat('Y-m-d H:i:s', $date_str)) {
                    $result = $date->format('Y-m-d H:i:s');
                } elseif ($date = \DateTime::createFromFormat('d/m/Y H:i:s', $date_str)) {
                    $result = $date->format('Y-m-d H:i:s');
                } elseif ($date = \DateTime::createFromFormat('d/m/Y', $date_str)) {
                    $result = $date->format('Y-m-d H:i:s');
                } else {
                    throw new Exception('Invalid date!');
                }
            } catch(\Exception $e) {
                  return $e->getMessage();
            }
            return $result;
        }
      
    }

    public static function addTask($params)
    {
       
        $task = new Task;
        $service = new GeneralServices;

        try {
      
            $task->name = $params['name'];
            $task->description = $params['description'];
            $task->start_date = self::formmatDate($params['start_date']);
            $task->end_date = self::formmatDate($params['end_date']);
            $task->is_infinite = $params['is_infinite'];
            $task->user_id = $params['user_id'];

            $resultSave = $task->save();

            $dataService = [
                'name' => 'Tarefa',
                'task_id' =>  $resultSave,
                'is_active' => 1
            ];

            $result = [
                'status' => true,
                'id' => $resultSave,
                'service_register' => $service::addService($dataService)
            ];

        } catch(\Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage()
            ];
        }
        
        return $result;
    }

    public static function updateTask($params)
    {

        try {
            $id_task = $params['task_id'];
            $params_update = $params;
            unset($params_update['task_id']);
            $affectedRows = [
                'status' => true,
                'id' => self::where('task_id', $id_task)->update($params_update)
            ];  
            return $affectedRows;

        } catch(\Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public static function deleteTask($params) 
    {
        try {
            $id_task = $params['task_id'];
            $affectedRows = [
                'status' => true,
                'id' => self::where('task_id', $id_task)
                ->update(['is_active' => 0])
            ];  
            return $affectedRows;

        } catch(\Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage()
            ];
        }
       
    } 
    
}