<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Arr;

class GeneralServices extends Model
{
    protected $table = 'services';
    public $timestamps = false;
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'task_id',
        'is_active',
    ];

    public static function getService($id)
    {
        return self::where('id', $id)->first();
    }

    public static function getAllServices()
    {
        return self::all();
    }
    
    public static function dataOnly($data)
    {
        return Arr::only($data, $this->fillable);
    }

    public static function addService($params)
    {
       
        $service = new GeneralServices;
      
        $service->name = $params['name'];
        $service->task_id = $params['task_id'];
        $service->is_active = $params['is_active'];

        $result = $service->save();

        return $result;
    }

    public static function updateService($params)
    {
        $params_update = $params;
        unset($params_update['id']);
        $affectedRows = self::where('id', $params['id'])->update($params_update);
        return $affectedRows;
    }
    
}