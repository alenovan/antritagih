import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import { userSignIn } from "@/services/auth";
import { getUserProfile } from "@/services/user-management/user";
import { locales } from "@/config";

class InvalidLoginError extends CredentialsSignin {
  static message: string;
  constructor(message?: any) {
    super();

    this.message = message;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      refresh_token: string;
      user_id: number;
      role: { id: number; name: string };
    } & DefaultSession["user"];
    error: string | null;
  }

  interface User {
    token: string;
    refresh_token: string;
    user_id?: number;
    role?: { id: number; name: string };
  }
}

const EXPIRY: number =
  typeof process.env.EXPIRY === "string"
    ? parseInt(process.env.EXPIRY)
    : process.env.EXPIRY || 60 * 60;

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
        const user = await userSignIn({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (!user.data.token && !user.status) {
          console.log("================");
          console.error(
            "error from initial login: ",
            user.message || "no token generated from server"
          );
          console.log("================");

          throw new InvalidLoginError(
            user.message || "no token generated from server"
          );
        }

        return {
          token: user.data.token,
          refresh_token: user.data.refresh_token,
        };
      },
    }),
  ],

  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const loggedIn = !!auth?.user;

      const currentLocale =
        locales.find((locale) => nextUrl.pathname.startsWith(`/${locale}`)) ||
        "en";

      let pathWithoutLocale = nextUrl.pathname;
      if (nextUrl.pathname.startsWith(`/${currentLocale}`)) {
        pathWithoutLocale =
          nextUrl.pathname.substring(`/${currentLocale}`.length) || "/";
      }

      const protectedPaths = [
        "/dashboard",
        "/master",
        "/transactional",
        "/reporting",
        "/user",
        "/history",
      ];
      const isProtected = protectedPaths.some((path) =>
        pathWithoutLocale.startsWith(path)
      );

      const publicPaths = ["/auth"];
      const isPublic = publicPaths.some((path) =>
        pathWithoutLocale.startsWith(path)
      );

      if (isProtected && !loggedIn) {
        const redirectUrl = new URL(
          `/${currentLocale}/auth/login`,
          nextUrl.origin
        );
        redirectUrl.searchParams.append("callbackUrl", nextUrl.pathname);
        return Response.redirect(redirectUrl);
      }

      if (isPublic && loggedIn) {
        return Response.redirect(
          new URL(`/${currentLocale}/dashboard`, nextUrl.origin)
        );
      }

      if (nextUrl.pathname === "/") {
        return Response.redirect(new URL(`/${currentLocale}`, nextUrl.origin));
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.token = user.token;
        token.refresh_token = user.refresh_token;
        token.issued_at = Date.now();
        token.expire_at = Date.now() + EXPIRY * 1000;
      }

      if (session?.user && trigger === "update") {
        token = {
          ...token,
          token: session.user.token,
          refresh_token: session.user.refresh_token,
          error: undefined,
        };

        return token;
      }

      if (token) {
        const [profile] = await Promise.all([
          getUserProfile(token.token as string),
        ]);

        if (profile.status === false) {
          return null;
        }

        if (profile.status) {
          token.user_id = profile?.data?.id;
          token.name = profile?.data?.name;
          token.email = profile?.data?.email;
          token.role = {
            id: profile.data?.role.id,
            name: profile.data?.role.name,
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.token = token.token as string;
        session.user.refresh_token = token.refresh_token as string;
        session.user = {
          ...session.user,
          user_id: token.user_id as number,
          name: token.name as string,
          email: token.email as string,
          role: token.role as { name: string; id: number },
        };
      }

      if (token.error) session.error = token.error as string;

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  cookies: {
    sessionToken: {
      name: `${
        process.env.NODE_ENV === "production" ? "__Secure-AntriaTagih-" : ""
      }authjs.session-token`,
      options: {
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        domain:
          process.env.NODE_ENV === "production"
            ? `${process.env.ROOT_DOMAIN}`
            : "127.0.0.1",
      },
    },
  },
});
