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

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const signIn = async (requestPayload: SignIn) => {
  const response = await fetchHandler<SignInResponse>("/auth/sign-in", {
    method: "POST",
    requestPayload,
  });

  if (response.success) {
    const cookieStore = await cookies();

    cookieStore.set("access_token", response.data.accessToken, { secure: true, httpOnly: true });
    cookieStore.set("refresh_token", response.data.refreshToken, { secure: true, httpOnly: true });
  }

  return response;
};

export const signInWithCredentials = async (requestPayload: SignIn) => {
  const response = await fetchHandler<{
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
  }>("/auth/sign-in", { method: "POST", requestPayload });

  return response;
};
