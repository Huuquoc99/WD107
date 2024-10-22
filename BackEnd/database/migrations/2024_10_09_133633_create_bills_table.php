<?php

use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(model: Order::class)->constrained();
            $table->foreignIdFor(model: User::class)->constrained();
            $table->dateTime("order_date");
            $table->decimal("total_amount", 10, 2)->nullable();
            $table->decimal("shipping_fee", 10, 2)->nullable();
            $table->string("status", 50)->nullable();
            $table->string("payment_method", 50)->nullable();
            $table->string("shipping_address", 255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
