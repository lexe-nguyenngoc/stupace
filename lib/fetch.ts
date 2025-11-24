import { cookies } from "next/headers";

import { APP_API_URL } from "./constants";
import { authService } from "./services";

export interface RequestOptions extends RequestInit {
  timeout?: number;
  requestPayload?: unknown;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  attachToken?: boolean;
  retryOnUnauthorized?: boolean;
}

const fetchHandler = async <T>(url: string, options: RequestOptions): Promise<ApiResponse<T>> => {
  const {
    timeout = 5000,
    requestPayload,
    headers: requestHeaders,
    attachToken = true,
    retryOnUnauthorized,
    ...restOptions
  } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const tokens = await (async () => {
    if (!attachToken) return {};

    const cookie = await cookies();
    const accessToken = cookie.get("access_token")?.value;
    const refreshToken = cookie.get("refresh_token")?.value;

    const result: Record<string, string> = {};
    if (accessToken) result["access_token"] = "Bearer " + accessToken;
    if (refreshToken) result["refresh_token"] = "Bearer " + refreshToken;

    return result;
  })();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...requestHeaders,
    ...tokens,
  };

  if (requestPayload) {
    restOptions.body = JSON.stringify(requestPayload);
  }

  const configs: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
    credentials: "include",
  };

  const combinedUrl = APP_API_URL + url;
  try {
    const response = await fetch(combinedUrl, configs);
    clearTimeout(timeoutId);

    if (response.status === 401 && retryOnUnauthorized) {
      const refreshTokenResponse = await authService.refreshToken();

      if (refreshTokenResponse.success) {
        const retryResponse = await fetch(combinedUrl, {
          ...configs,
          headers: {
            ...headers,
            access_token: "Bearer " + refreshTokenResponse.data.accessToken,
            refresh_token: "Bearer " + refreshTokenResponse.data.refreshToken,
          },
        });

        const data = await retryResponse.json();
        return data;
      }
    }

    const data = await response.json();
    return data;
  } catch {
    return { success: false, status: 500, message: "Server error" };
  }
};

export default fetchHandler;
