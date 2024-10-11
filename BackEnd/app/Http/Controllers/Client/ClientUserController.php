<?php

namespace App\Http\Controllers\Client;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ClientUserController extends Controller
{
    public function updateUserInfo(Request $request, string $id)
    {
        // Định nghĩa các quy tắc validation
        $validatedData = $request->validate([
            "name" => "required|max:255",
            "email" => "required|email|max:255|unique:users,email," . $id, // Kiểm tra email duy nhất, bỏ qua người dùng hiện tại
            "phone" => "required|max:255",
            "address" => "required|max:255",
            "avatar" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048" // Kiểm tra file ảnh
        ]);

        if ($request->isMethod("PUT")) {
            $param = $validatedData; 
            $user = User::findOrFail($id);

            if ($request->hasFile("avatar")) {
                if ($user->hasFile && Storage::disk("public")->exists($user->avatar)) {
                    Storage::disk("public")->delete($user->avatar);
                }
                
                $filepath = $request->file("avatar")->store("uploads/users", "public");
                $param["avatar"] = $filepath;
            } else {
                $param["avatar"] = $user->avatar; 
            }

            unset($param["password"]); 

            $updated = $user->update($param); 

            if ($updated) {
                return response()->json(['message' => 'User updated info successfully']);
            } else {
                return response()->json(['message' => 'Failed to update user info'], 500);
            }
        }

        return response()->json(['message' => 'Invalid request method'], 405);
    }


    public function updatePassword(Request $request, string $id)
    {
        // Định nghĩa các quy tắc validation
        $validatedData = $request->validate([
            "password" => "required|string|min:8|confirmed", // Mật khẩu bắt buộc, tối thiểu 8 ký tự, phải xác nhận
        ]);

        if ($request->isMethod("PUT")) {
            $user = User::findOrFail($id);

            // Mã hóa mật khẩu mới
            $param['password'] = bcrypt($validatedData['password']); // Sử dụng mật khẩu đã được xác thực

            $user->update($param);

            return response()->json(['message' => 'Password updated successfully']);
        }

        return response()->json(['message' => 'Invalid request method'], 405);
    }


}


