import { cookies } from "next/headers";

import { APP_API_URL } from "./constants";

interface RequestOptions extends RequestInit {
  timeout?: number;
  requestPayload?: unknown;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

const fetchHandler = async <T>(url: string, options: RequestOptions): Promise<ApiResponse<T>> => {
  const { timeout = 5000, requestPayload, headers: requestHeaders, ...restOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const tokens: Record<string, string> = await (async () => {
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

    const data = await response.json();
    return data;
  } catch {
    return { success: false, status: 500, message: "Server error" };
  }
};

export default fetchHandler;
