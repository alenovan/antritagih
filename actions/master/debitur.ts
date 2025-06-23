"use server";

import { auth } from "@/lib/auth";
import { DebiturType } from "@/lib/zod";
import {
  createDebitur,
  updateDebitur,
  deleteDebitur,
} from "@/services/master/debitur";
import { revalidatePath } from "next/cache";

export const createDebiturAction = async (data: DebiturType) => {
  const session = await auth();

  const res = await createDebitur({
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
    message: "Debitur Added",
  };
};

export const updateDebiturAction = async (id: number, data: DebiturType) => {
  const session = await auth();

  const res = await updateDebitur({
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
    message: "Debitur Updated",
  };
};

export const deleteDebiturAction = async (id: number) => {
  const session = await auth();

  const res = await deleteDebitur({
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
    message: "Debitur Deleted",
  };
};
