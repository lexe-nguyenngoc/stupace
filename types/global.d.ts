interface ErrorResponse {
  success: false;
  status: number;
  message: string;
}

interface SuccessResponse<T> {
  success: true;
  status: number;
  data: T;
}

type ApiResponse<T = unknown> = ErrorResponse | SuccessResponse<T>;
