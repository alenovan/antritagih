"use server";

import { auth } from "@/lib/auth";
import { ClientType } from "@/lib/zod";
import {
  createClient,
  updateClient,
  deleteClient,
} from "@/services/master/client";
import { revalidateLocalizedPath } from "@/utils/revalidate";

export const createClientAction = async (data: ClientType) => {
  const session = await auth();

  const res = await createClient({
    token: session?.user.token as string,
    body: data,
  });

  if (res.success === false) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/client");

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

  if (res.success === false) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/client");

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

  if (res.success === false) {
    return {
      success: res.success,
      message: res?.message,
    };
  }
  revalidateLocalizedPath("/master/client");

  return {
    success: true,
    message: "Client Deleted",
  };
};
