"use server";

import { cookies } from "next/headers";

export const session = async () => {
  const cookiesInstance = await cookies();

  const token = cookiesInstance.get("access_token")?.value;
  const refreshToken = cookiesInstance.get("refresh_token")?.value;
  const userDataString = cookiesInstance.get("session")?.value;

  if (!token || !refreshToken || !userDataString) {
    return { success: false, user: null };
  }

  try {
    const userDataStringDecoded = Buffer.from(userDataString, "base64").toString("utf-8");
    const userData = JSON.parse(userDataStringDecoded);
    return { success: true, user: userData };
  } catch {
    return { success: false, user: null };
  }
};
