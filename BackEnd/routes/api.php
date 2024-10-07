<?php

use App\Http\Controllers\Admin\CatalogueController;
use App\Http\Controllers\Admin\ProductCapacityController;
use App\Http\Controllers\Admin\ProductColorController;
use App\Http\Controllers\Admin\ProductController;
use App\Models\Catalogue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource("admin/catalogue", CatalogueController::class);
// Route::apiResource("admin/productColor", controller: ProductColorController::class);
Route::apiResource("admin/product", ProductController::class);
Route::apiResource("admin/product-variant/color", ProductColorController::class);
Route::apiResource("admin/product-variant/capacity", ProductCapacityController::class);


