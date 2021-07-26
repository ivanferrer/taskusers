<?php

namespace App;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';
    public $timestamps = false;
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'username',
        'password',
        'role',
        'is_active'
    ];

    protected $hidden = [];


    public static function checkUser($username, $active = 0)
    {
        if ($active != null)
            return self::where('username', $username)->where('is_active', $active)->limit(1)->get();

        return self::where('username', $username)->limit(1)->get();
    }
    public function dataOnly($data)
    {
        return Arr::only($data, [
            'id',
            'name',
            'username',
            'password',
            'role',
            'is_active'
        ]);
    }

    public static function getAllUsersByListStatus($status)
    {
        return self::whereIn('is_active', $status)->get();
    }

    public static function getAllUsers()
    {
        return self::all();
    }

    public static function getUser($id)
    {
        return self::where('id', $id)->first();
    }

    public static function hasUserExists($data)
    {
        return ($this::find($data['id'])->first()) ? true : false;
    }

    public static function hasUsernameExists($username)
    {
        try {
            if (self::where('username', $username)->exists())
                return [
                    'message' => self::lang('This username already exists, please enter another.'),
                    'status' => false
                ];

            return [
                'message' => self::lang('Username valid!'),
                'status' => true
            ];
        } catch (\Throwable $th) {
            return [
                'message' => ['error' => $th->getMessage()],
                'status' => false
            ];
        }
    }

    public static function hasUsernameExistsAndNotIsOwner($username, $id)
    {
        try {
            if (self::where('username', $username)->where('id', $id)->exists())
                return [
                    'message' => self::lang('Username valid!'),
                    'status' => true
                ];
            elseif (self::where('username', $username)->exists())
                return [
                    'message' => self::lang('This username already exists, please enter another.'),
                    'status' => false
                ];

            return [
                'message' => self::lang('Username valid!'),
                'status' => true
            ];
        } catch (\Throwable $th) {
            return [
                'message' => ['error' => $th->getMessage()],
                'status' => false
            ];
        }
    }


    public static function runQueryDirect($query)
    {
        $result = DB::select($query);
        return $result;
    }

    public static function addUser($params)
    {
       
        $resultExist = self::hasUsernameExists($params['username']);

        if ($resultExist['status'] === false) {
            return $resultExist;
        } else {

            $user = new User;
 
            $user->name = $params['name'];
            $user->username = $params['username'];
            $user->password = $params['password'];
            $user->role = $params['role'];
            $user->is_active = $params['is_active'];
            $result = $user->save();

            return [
                'status' => true,
                'id' => $result
            ];
        }

       

    }

    public static function updateUser($params)
    {
        $resultExist = self::hasUsernameExistsAndNotIsOwner($params['username'], $params['id']);

        if ($resultExist['status'] === false) {
              return $resultExist;
        } else {
            $id = $params['id'];
            $params_update = $params;
            unset($params_update['id']);
            $affectedRows = self::where('id', $id)->update($params_update);
            return [
                'status' => true,
                'id' => $affectedRows
            ];
        }
    }

    private static function lang($text, $lang='pt-BR') {
        switch ($lang) {
            case 'pt-BR':
                $translates = [
                    ['This username already exists, please enter another.', 'O nome de usuário já existe, por favor digite outro usuário.'],
                    ['Username Valid!','Usuário válido!']
                ];
                break;
                default:
                return $text;
        }
        if (isset($translates) && count($translates)) {
            foreach($translates as $k => $textOption) {
                if ($textOption[0] === $text) {
                   return $textOption[1];
                }
            }
        }
       
    }

    public static function deleteUser($params) 
    {
        try {
            $id= $params['id'];
            $affectedRows = [
                'status' => true,
                'id' => self::where('id', $id)
                ->update(['is_active' => 2])
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