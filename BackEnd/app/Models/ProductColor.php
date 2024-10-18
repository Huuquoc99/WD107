<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
<<<<<<< HEAD
use Illuminate\Database\Eloquent\SoftDeletes;
=======
>>>>>>> hoa10

class ProductColor extends Model
{
    use HasFactory;
<<<<<<< HEAD

    // use SoftDeletes;

    protected $fillable = [
        "name",
        "color_code",
        "status",
    ];

    protected $casts = [
        "status" => "boolean",
    ];
=======
>>>>>>> hoa10
}
