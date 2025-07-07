"use client";

import { useAuthorization } from "@/hooks/use-authorization";

type AuthorizedComponentProps = {
  resource: string | string[];
  action: "create" | "read" | "update" | "delete";
  children: React.ReactNode;
};

/**
 * This component will render its children if the user has the given permission
 * for the given resource. Otherwise, it will render nothing.
 *
 * @param {string} resource The resource to check
 * @param {"create" | "read" | "update" | "delete"} action The action to check
 * @param {React.ReactNode} children The children to render if the user is authorized
 */

export function AuthorizedComponent({
  resource,
  action,
  children,
}: AuthorizedComponentProps) {
  const { hasPermission } = useAuthorization();

  const isAuthorized = Array.isArray(resource)
    ? resource.some((res) => hasPermission(res, action))
    : hasPermission(resource, action);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
