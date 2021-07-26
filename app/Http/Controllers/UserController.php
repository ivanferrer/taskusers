<?php

namespace App\Http\Controllers;

use App\User;
use App\Facades\Helpers;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{

    private $user;
    private $request;

    public function __construct()
    {
        $this->user = new User;
        $this->request = new UserRequest;
    }

    public function store(Request $request)
    {
        $data = $request->json()->all();

       // dd($data);

        if(isset($data['all']) &&  $data['all'] === true) {
            return [
                'listUsers' => $this->user::getAllUsersByListStatus([1, 0])
            ];
        }

        if (isset($data['actives']) &&  $data['actives'] === true) {
            return $this->user::getAllUsersByListStatus([1]);
        }
        if (isset($data['actives']) &&  $data['actives'] === false) {
            return $this->user::getAllUsersByListStatus([0]);
        }

        return [
            'listUsers' => $this->user::getAllUsersByListStatus([1, 0])
        ];

    }

    public function show(Request $request) {
        $id = request('id');
        if(isset($id)) {
            return $this->user::getUser($id);
        }
        return [];

    }

    public function insert(Request $request)
    {
        $data = $request->json()->all();
        return $this->user::addUser($data);
        
    }

    public function update(Request $request)
    {
        $data = $request->json()->all();
        return $this->user::updateUser($data);
    }

    public function delete(Request $request)
    {
        $data = $request->json()->all();
        return $this->user::deleteUser($data);
    }
   
}
