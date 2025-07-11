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
import { revalidateLocalizedPath } from "@/utils/revalidate";

export const createRoleAction = async (data: RoleType) => {
  const session = await auth();

  const res = await createRole({
    token: session?.user.token as string,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/user/role");

  return {
    status: res.status,
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

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  return {
    status: res.status,
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

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/user/role");

  return {
    status: res.status,
    message: "Role Updated",
  };
};

export const deleteRoleAction = async (id: number) => {
  const session = await auth();

  const res = await deleteRole({
    token: session?.user.token as string,
    id,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/user/role");

  return {
    status: res.status,
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

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  return {
    status: res.status,
    message: "Delete Role Permission Success",
  };
};
