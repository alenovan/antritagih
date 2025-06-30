"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";
import { revalidatePath } from "next/cache";
import { AuthType } from "@/lib/zod";
import { locales } from "@/config";

export const loginAction = async (data: AuthType, callbackUrl: string) => {
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      redirectTo: callbackUrl,
    });

    revalidatePath("/(dashboard)", "page");
    return response;
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return {
        error: error.message,
      };
    }
  }
};

export const logoutAction = async (callbackUrl: string) => {
  const session = await auth();

  // await userLogout(session?.user?.token as string);

  const currentLocale =
    locales.find((locale) => callbackUrl.startsWith(`/${locale}`)) || "en";

  return await signOut({
    redirectTo: `/${currentLocale}/auth/login?callbackUrl=${encodeURIComponent(
      callbackUrl
    )}`,
  });
};
