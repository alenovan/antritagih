import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, type User } from "./data";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      role: { id: number; name: string };
      is_active: boolean;
    } & DefaultSession["user"];
    error: string | null;
  }

  interface User {
    token: string;
    role?: { id: number; name: string };
    is_active?: boolean;
    user_id?: number;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = getUserByEmail(credentials?.email as string);
          if (user) {
            const isMatch = user?.password === credentials.password;

            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],
});
