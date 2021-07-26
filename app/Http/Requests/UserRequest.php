<?php

namespace App\Http\Requests;

use App\Rules\Integer;
use Illuminate\Support\Facades\Validator;
use App\Facades\Helpers;
use Illuminate\Support\Str;

class UserRequest
{
    public function validPayload($data)
    {
        $rules = [
            'all' => ['boolean'],
            'actives' => ['boolean'],
            'name' => ['required', 'string'],
            'username' => ['required', 'string'],
            'password' => [ 'string'],
            'role' => ['required', 'string'],
            'is_active' => ['required',  new Integer],
        ];
        return Helpers::validationRequest(Validator::make( $data, $rules));
    }

    public function rulesUpdate($data)
    {
        $rules = $this->rules($data);
        $updateRules = [];

        if (count($rules))
            foreach($rules as $k => $rule)  {
                if (isset($data[$k]) ) {
                    $updateRules[$k] = $rule;
                }
            }

        return $updateRules;
    }

    public function rules()
    {
        return [
            'all' => ['boolean'],
            'actives' => ['boolean'],
            'name' => ['required', 'string'],
            'username' => ['required', 'string'],
            'password' => ['string'],
            'role' => ['required', 'string'],
            'is_active' => ['required',  new Integer],
        ];
    }

}