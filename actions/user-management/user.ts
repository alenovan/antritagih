"use server";

import { auth } from "@/lib/auth";
import { UserType } from "@/lib/zod";
import {
  createUser,
  updateUser,
  deleteUser,
} from "@/services/user-management/user";
import { revalidatePath } from "next/cache";

export const createUserAction = async (data: UserType) => {
  const session = await auth();

  const res = await createUser({
    token: session?.user.token as string,
    body: data,
  });

  if (!res.status) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidatePath("/dashboard/user-management/user");

  return {
    success: true,
    message: "User Added",
  };
};

export const updateUserAction = async (id: number, data: UserType) => {
  const session = await auth();

  const res = await updateUser({
    token: session?.user.token as string,
    id,
    body: data,
  });

  if (!res.status) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidatePath("/dashboard/user-management/user");

  return {
    success: true,
    message: "User Updated",
  };
};

export const deleteUserAction = async (id: number) => {
  const session = await auth();

  const res = await deleteUser({
    token: session?.user.token as string,
    id,
  });

  if (!res.success) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidatePath("/dashboard/user-management/user");

  return {
    success: true,
    message: "User Deleted",
  };
};
