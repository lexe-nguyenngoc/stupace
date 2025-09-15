import React from "react";

import SignInForm from "@/components/forms/sign-in-form";

const SignIn = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
      </div>

      <div className="mx-auto w-full max-w-[500px]">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
