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
        if ($request->isMethod("PUT")) {
            $param = $request->except("_token", "_method");
            $user = User::findOrFail($id);

            if ($request->hasFile("avatar")) {
                if ($user->hasFile && Storage::disk("public")->exists($user->avatar)) {
                    Storage::disk("public")->delete($user->avatar);
                }
                $filepath = $request->file("avatar")->store("uploads/users", "public");
                $param["avatar"] = $filepath;
            } else {
                $param["avatar"] = $user->avatar; // Giữ nguyên avatar nếu không có tệp mới
            }

            unset($param["password"]); // Giữ nguyên password nếu không thay đổi

            $updated = $user->update($param); // Cập nhật thông tin người dùng

            if ($updated) {
                return response()->json(['message' => 'User updated info successfully']);
            } else {
                return response()->json(['message' => 'Failed to update user info'], 500);
            }
        }

        return response()->json(['message' => 'Invalid request method'], 405);
    }
}