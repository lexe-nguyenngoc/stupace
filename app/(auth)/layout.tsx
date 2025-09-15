import Link from "next/link";
import React from "react";

import ThemeToggle from "@/components/theme-toggle";
import ROUTES from "@/constants/routes";

const AuthLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col backdrop-blur-lg">
      <div className="absolute inset-0 -z-1 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100 opacity-60 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-100 opacity-60 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-pink-100 opacity-40 blur-2xl"></div>
        <div className="absolute right-1/3 bottom-1/4 h-24 w-24 rounded-full bg-yellow-100 opacity-50 blur-xl"></div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 h-6 w-6 rotate-45 bg-blue-300 opacity-20"></div>
        <div className="absolute bottom-32 left-16 h-8 w-8 rotate-12 bg-purple-300 opacity-25"></div>
        <div className="absolute top-1/2 right-12 h-4 w-4 rounded-full bg-pink-300 opacity-30"></div>
        <div className="absolute right-1/4 bottom-20 h-5 w-5 rotate-45 bg-yellow-300 opacity-25"></div>
      </div>

      <header className="flex justify-between p-4">
        <Link href={ROUTES.home}>
          <h3 className="text-3xl font-bold">Stupace</h3>
        </Link>

        <ThemeToggle />
      </header>

      {children}
    </main>
  );
};

export default AuthLayout;
