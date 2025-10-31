"use server";

import { signIn } from "@/auth";

import fetchHandler from "../fetch";

import type { SignUp, SignUpVerify } from "@/lib/validators/auth.validator";

export const signUp = async (requestPayload: SignUp): Promise<ApiResponse> => {
  const response = await fetchHandler("/auth/sign-up", { method: "POST", requestPayload });
  return response;
};

export const signUpVerify = async (
  requestPayload: SignUpVerify,
): Promise<ApiResponse<{ email: string }>> => {
  const response = await fetchHandler<{ email: string }>("/auth/sign-up/completion", {
    method: "POST",
    requestPayload,
  });

  return response;
};

export const signInWithCredentials = async (email: string, password: string) => {
  await signIn("credentials", { email, password });
};
