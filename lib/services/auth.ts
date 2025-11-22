"use server";

import { cookies } from "next/headers";

import fetchHandler from "../fetch";

import type { SignIn, SignUp, SignUpVerify } from "@/lib/validators/auth.validator";

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

export const signInWithCredentials = async (requestPayload: SignIn) => {
  const response = await fetchHandler<SignInResponse>("/auth/sign-in", {
    method: "POST",
    requestPayload,
  });

  if (response.success) {
    const cookieStore = await cookies();

    cookieStore.set("access_token", response.data.accessToken, { secure: true, httpOnly: true });
    cookieStore.set("refresh_token", response.data.refreshToken, { secure: true, httpOnly: true });
    cookieStore.set("session", Buffer.from(JSON.stringify(response.data.data)).toString("base64"), {
      secure: true,
      httpOnly: true,
    });
  }

  return response;
};
