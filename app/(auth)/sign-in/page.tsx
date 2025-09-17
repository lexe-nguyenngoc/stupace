import React from "react";

import SignInForm from "@/components/forms/sign-in-form";
import SocialsSignIn from "@/components/socials-sign-in";

const SignIn = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
      </div>

      <div className="mx-auto w-full max-w-[500px]">
        <SignInForm />

        <div className="mt-4 mb-2 flex items-center">
          <hr className="flex-1 border-gray-200 dark:border-gray-900" />
          <span className="px-2 text-sm text-slate-500 dark:text-slate-400">Or</span>
          <hr className="flex-1 border-gray-200 dark:border-gray-900" />
        </div>

        <SocialsSignIn />
      </div>
    </div>
  );
};

export default SignIn;
