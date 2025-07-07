"use server";

import { auth } from "@/lib/auth";
import { ClientParentType, ClientType } from "@/lib/zod";
import {
  createClient,
  updateClient,
  deleteClient,
  createClientParent,
  updateClientParent,
  deleteClientParent,
} from "@/services/master/client";
import { revalidateLocalizedPath } from "@/utils/revalidate";

export const createClientParentAction = async (data: ClientParentType) => {
  const session = await auth();

  const res = await createClientParent({
    token: session?.user.token as string,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/client/parent");

  return {
    status: res.status,
    message: "Client Parent Added",
  };
};

export const createClientAction = async (data: ClientType) => {
  const session = await auth();

  const res = await createClient({
    token: session?.user.token as string,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/client");

  return {
    status: res.status,
    message: "Client Added",
  };
};

export const updateClientParentAction = async (
  id: number,
  data: ClientParentType
) => {
  const session = await auth();

  const res = await updateClientParent({
    token: session?.user.token as string,
    id,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/client/parent");

  return {
    status: res.status,
    message: "Client Parent Updated",
  };
};

export const updateClientAction = async (id: number, data: ClientType) => {
  const session = await auth();

  const res = await updateClient({
    token: session?.user.token as string,
    id,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/client");

  return {
    status: res.status,
    message: "Client Updated",
  };
};

export const deleteClientParentAction = async (id: number) => {
  const session = await auth();

  const res = await deleteClientParent({
    token: session?.user.token as string,
    id,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }
  revalidateLocalizedPath("/master/client/parent");

  return {
    status: res.status,
    message: "Client Parent Deleted",
  };
};

export const deleteClientAction = async (id: number) => {
  const session = await auth();

  const res = await deleteClient({
    token: session?.user.token as string,
    id,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }
  revalidateLocalizedPath("/master/client");

  return {
    status: res.status,
    message: "Client Deleted",
  };
};
