interface RequestOptions extends RequestInit {
  timeout?: number;
  requestPayload?: unknown;
}

const fetchHandler = async <T>(url: string, options: RequestOptions): Promise<T> => {
  const { timeout = 5000, requestPayload, headers: requestHeaders, ...restOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const headers: HeadersInit = { "Content-Type": "application/json", ...requestHeaders };

  if (requestPayload) {
    restOptions.body = JSON.stringify(requestPayload);
  }

  const configs: RequestInit = { ...restOptions, headers, signal: controller.signal };

  const response = await fetch(url, configs);
  clearTimeout(timeoutId);

  const data = await response.json();
  return data;
};

export default fetchHandler;
