"use server";

import ssrFetch from "../ssrFetch";

export const getAllUsers = async () => {
  const response = await ssrFetch<{ email: string }>("/users", { method: "GET" });

  return response;
};
