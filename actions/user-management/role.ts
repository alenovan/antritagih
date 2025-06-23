"use server";

import { auth } from "@/lib/auth";
import { RolePermissionType, RoleType } from "@/lib/zod";
import {
  createRole,
  updateRole,
  deleteRole,
  deleteRolePermission,
  createRolePermission,
} from "@/services/user-management/role";
import { revalidatePath } from "next/cache";

export const createRoleAction = async (data: RoleType) => {
  const session = await auth();

  const res = await createRole({
    token: session?.user.token as string,
    body: data,
  });

  if (!res.status) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidatePath("/dashboard/user-management/role");

  return {
    success: true,
    message: "Role Added",
  };
};

export const createRolePermissionAction = async (
  id: number,
  data: RolePermissionType
) => {
  const session = await auth();

  const res = await createRolePermission({
    token: session?.user.token as string,
    id,
    body: data,
  });

  if (!res.success) {
    return {
      success: false,
      message: res?.message,
    };
  }

  return {
    success: true,
    message: "Update Role Permission Success",
  };
};

export const updateRoleAction = async (id: number, data: RoleType) => {
  const session = await auth();

  const res = await updateRole({
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

  revalidatePath("/dashboard/user-management/role");

  return {
    success: true,
    message: "Role Updated",
  };
};

export const deleteRoleAction = async (id: number) => {
  const session = await auth();

  const res = await deleteRole({
    token: session?.user.token as string,
    id,
  });

  if (!res.success) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidatePath("/dashboard/user-management/role");

  return {
    success: true,
    message: "Role Deleted",
  };
};

export const deleteRolePermissionAction = async (
  id: number,
  idPermission: number
) => {
  const session = await auth();

  const res = await deleteRolePermission({
    token: session?.user.token as string,
    id,
    idPermission,
  });

  if (!res.success) {
    return {
      success: false,
      message: res?.message,
    };
  }

  return {
    success: true,
    message: "Delete Role Permission Success",
  };
};
