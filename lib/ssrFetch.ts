import { redirect } from "next/navigation";

import { ROUTES } from "./constants";
import fetchHandler, { RequestOptions } from "./fetch";

const ssrFetch = async <T>(url: string, options: RequestOptions) => {
  const response = await fetchHandler<T>(url, options);

  if (response.status === 401) {
    return redirect(ROUTES.refreshToken);
  }

  return response;
};

export default ssrFetch;
