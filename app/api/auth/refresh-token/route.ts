import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants";
import { authService } from "@/lib/services";

export const GET = async () => {
  const response = await authService.refreshToken();

  if (response.success === false) {
    return redirect(ROUTES.signIn);
  }

  redirect("/");
};
