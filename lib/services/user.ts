"use server";

import fetchHandler from "../fetch";

export const getAllUsers = async (): Promise<ApiResponse<{ email: string }>> => {
  const response = await fetchHandler<{ email: string }>("/users", { method: "GET" });

  return response;
};
