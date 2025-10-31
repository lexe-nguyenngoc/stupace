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

  const headers: HeadersInit = { "Content-Type": "application/json", ...requestHeaders };

  if (requestPayload) {
    restOptions.body = JSON.stringify(requestPayload);
  }

  const configs: RequestInit = { ...restOptions, headers, signal: controller.signal };

  const combinedUrl = APP_API_URL + url;
  const response = await fetch(combinedUrl, configs);
  clearTimeout(timeoutId);

  const data = await response.json();
  return data;
};

export default fetchHandler;
