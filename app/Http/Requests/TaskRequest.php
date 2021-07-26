<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TaskRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            // 'data' => 'required',
            // 'data.context' => 'required|array',
            // 'data.context.displayId' => 'required|string',
            // 'data.context.section.uniqueName' => 'required|string',
            // 'data.context.href' => 'required|string',
            // 'data.context.fields.body' => 'required|array',
            // 'data.context.fields.title' => 'required|string',
            // 'data.context.fields.leadtext' => 'required|string',
            // 'data.context.published' => 'required',
            // 'data.context.teaserImages' => 'required|array'
        ];
    }

    public function failedValidation($validator) 
    { 
        $response = [
            'status' => false,
            'errors' => $validator->errors()->all()
        ];
        throw new HttpResponseException(response()->json($response, 400));
    }
}