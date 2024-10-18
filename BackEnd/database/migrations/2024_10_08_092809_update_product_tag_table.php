<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('product_tag', function (Blueprint $table) {
            // Xóa cột id
            $table->dropColumn('id');

            // Thêm khóa chính từ cặp product_id và tag_id
            $table->primary(['product_id', 'tag_id']);
        });
    }

    public function down()
    {
        Schema::table('product_tag', function (Blueprint $table) {
            // Khôi phục lại cột id nếu rollback migration
            $table->id();

            // Xóa khóa chính product_id và tag_id
            $table->dropPrimary(['product_id', 'tag_id']);
        });
    }
};
