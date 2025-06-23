import { swrFetcher } from "@/utils/fetcher";
import { useCallback } from "react";
import useSWR from "swr";

type PermissionReponse = {
  id: number;
  name: string;
  role: { name: string; is_admin: boolean };
  permission: Permission[];
};

export function useAuthorization() {
  const { data } = useSWR<PermissionReponse | null>(
    "/api/v1/permissions",
    swrFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const hasPermission = useCallback(
    (
      resource: string,
      action: "create" | "read" | "update" | "delete" | string
    ) => {
      if (!data) return false;
      return data?.permission?.some(
        (p) => p.resource === resource && p.permission === action
      );
    },
    [data]
  );

  const rolePermission = useCallback(
    (role: string) => {
      if (!data) return false;
      return data?.role?.name === role;
    },
    [data]
  );

  const canAccess = useCallback(
    (resource: string) => {
      return hasPermission(resource, "read");
    },
    [hasPermission]
  );

  const canCreate = useCallback(
    (resource: string) => {
      return hasPermission(resource, "create");
    },
    [hasPermission]
  );

  const canUpdate = useCallback(
    (resource: string) => {
      return hasPermission(resource, "update");
    },
    [hasPermission]
  );

  const canDelete = useCallback(
    (resource: string) => {
      return hasPermission(resource, "delete");
    },
    [hasPermission]
  );

  return {
    hasPermission,
    rolePermission,
    canAccess,
    canCreate,
    canUpdate,
    canDelete,
  };
}
