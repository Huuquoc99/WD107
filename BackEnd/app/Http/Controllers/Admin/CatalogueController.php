<?php

namespace App\Http\Controllers\Admin;

use App\Models\Catalogue;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
<<<<<<< HEAD
use App\Http\Requests\CatalogueRequest;
=======
>>>>>>> hoa10
use Illuminate\Support\Facades\Storage;

class CatalogueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
<<<<<<< HEAD
        //
=======
>>>>>>> hoa10
        $listCatalogue = Catalogue::withCount("products")->get();
        // $listCatalogue = Catalogue::all();
        return response()->json( $listCatalogue, 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json();
    }

    /**
     * Store a newly created resource in storage.
     */
<<<<<<< HEAD
    public function store(CatalogueRequest $request)
=======
    public function store(Request $request)
>>>>>>> hoa10
    {
        if($request->isMethod("POST"))
        {
            $param = $request->except("_token");

            if($request->hasFile("cover"))
            {
                $filepath = $request->file("cover")->store("uploads/catalogues", "public");
            }else{
                $filepath = null;
            }

            $param["cover"] = $filepath;
            Catalogue::create($param);
            
            return response()->json(['message' => 'Catalogue created successfully']);
        }
<<<<<<< HEAD
        
=======
>>>>>>> hoa10
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $catalogue = Catalogue::query()->findOrFail($id);
        return response()->json($catalogue);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $catalogue = Catalogue::findOrFail($id);
        return response()->json($catalogue);
    }

    /**
     * Update the specified resource in storage.
     */
<<<<<<< HEAD
    public function update(CatalogueRequest $request, string $id)
=======
    public function update(Request $request, string $id)
>>>>>>> hoa10
    {
        if($request->isMethod("PUT"))
        {
            $param = $request->except("_token", "_method");
            $catalogue = Catalogue::findOrFail($id);
            if($request->hasFile("cover")){
                if($catalogue->hasFile && Storage::disk("public")->exists($catalogue->cover))
                {
                    Storage::disk("public")->delete($catalogue->cover);
                }
                $filepath = $request->file("cover")->store("uploads/catalogues", "public");
            }else{
                $filepath = $catalogue->cover;
            }

            $param["cover"] = $filepath;
            $catalogue->update($param);

            if($catalogue->is_active == 0)
            {
                $catalogue->hide();
            }else{
                $catalogue->show();
            }

            return response()->json(['message' => 'Catalogue updated successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $catalogue = Catalogue::findOrFail($id);
        $catalogue->delete();
        if($catalogue->cover && Storage::disk("public")->exists($catalogue->cover))
        {
            Storage::disk("public")->delete($catalogue->cover);
        }

        return response()->json(['message' => 'Catalogue deleted successfully']);
    }
}
