<?php

namespace App\Exceptions;

use HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

<<<<<<< HEAD
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ValidationException) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $exception->errors()
            ], 422);
        }

        if ($request->expectsJson()) {
            $statusCode = $exception instanceof HttpException ? $exception->getStatusCode() : 500;

            return response()->json([
                'message' => $exception->getMessage() ?: 'Đã xảy ra lỗi.',
                'status' => 'error'
            ], $statusCode);
        }

        return parent::render($request, $exception);
    }

=======
    // Trả ra dữ liệu dưới dạng json
    protected function shouldReturnJson($request, Throwable $e)
    {
        return true;
    }
>>>>>>> 9abc656e79262d5caedc132d325e26ba909f08a8
}
