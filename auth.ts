import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authService } from "./lib/services";
import { authSchemas } from "./lib/validators";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = authSchemas.signIn.safeParse(credentials);

        if (parsed.error) return null;

        const response = await authService.signInWithCredentials(parsed.data);
        if (response.success === false) return null;

        return response.data;
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.type === "credentials") return true;

      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = "user-test";

      return session;
    },
  },
});
