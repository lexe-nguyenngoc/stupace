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
    await updateTokensToCookie(response.data);
  }

  return response;
};

export const updateTokensToCookie = async (data: {
  accessToken: string;
  refreshToken: string;
  sessionUser?: SessionUser;
}) => {
  const cookieStore = await cookies();
  const { accessToken, refreshToken, sessionUser } = data;

  cookieStore.set("access_token", accessToken, { secure: true, httpOnly: true });
  cookieStore.set("refresh_token", refreshToken, { secure: true, httpOnly: true });

  if (sessionUser) {
    cookieStore.set("session", Buffer.from(JSON.stringify(sessionUser)).toString("base64"), {
      secure: true,
      httpOnly: true,
    });
  }
};

type RefreshTokenReturn = Promise<ApiResponse<{ accessToken: string; refreshToken: string }>>;

export const refreshToken = async (): RefreshTokenReturn => {
  const refreshResponse = await fetchHandler<{ accessToken: string; refreshToken: string }>(
    "/auth/refresh-token",
    {
      method: "POST",
      retryOnUnauthorized: false,
    },
  );

  if (refreshResponse.success) {
    await updateTokensToCookie(refreshResponse.data);
  }

  return refreshResponse;
};
