"use server";

import { auth } from "@/lib/auth";
import { ClientType } from "@/lib/zod";
import {
  createClient,
  updateClient,
  deleteClient,
} from "@/services/master/client";
import { revalidatePath } from "next/cache";

export const createClientAction = async (data: ClientType) => {
  const session = await auth();

  const res = await createClient({
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
    message: "Client Added",
  };
};

export const updateClientAction = async (id: number, data: ClientType) => {
  const session = await auth();

  const res = await updateClient({
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
    message: "Client Updated",
  };
};

export const deleteClientAction = async (id: number) => {
  const session = await auth();

  const res = await deleteClient({
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
    message: "Client Deleted",
  };
};
