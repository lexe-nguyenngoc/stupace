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

interface SessionUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  data: SessionUser;
}
