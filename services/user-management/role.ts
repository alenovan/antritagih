import fetchAPI, { ApiParameter } from "../api";

export async function getRoles({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return {
    status: true,
    message: "success",
    data: [
      {
        id: 1,
        name: "Admin Role",
      },
    ],
  };
  return fetchAPI<GeneralAPIFetchResponse<Role[]>>({
    type: "server",
    method: "GET",
    endpoint: "/user-management/role",
    token: token,
    queryParams: query,
  });
}

export async function getRole({ token, id }: { token: string; id: number }) {
  return fetchAPI<GeneralAPIFetchResponse<Role>>({
    type: "server",
    method: "GET",
    endpoint: `/user-management/role/${id}`,
    token: token,
  });
}

export async function createRole({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/user-management/role`,
    token: token,
    body: body,
  });
}

export async function createRolePermission({
  token,
  id,
  body,
}: {
  token: string;
  id: number;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/user-management/role/${id}/permissions`,
    token: token,
    body: body,
  });
}

export async function updateRole({
  token,
  id,
  body,
}: {
  token: string;
  id: number;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "PUT",
    endpoint: `/user-management/role/${id}`,
    token: token,
    body: body,
  });
}

export async function deleteRole({ token, id }: { token: string; id: number }) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/user-management/role/${id}`,
    token: token,
  });
}

export async function deleteRolePermission({
  token,
  id,
  idPermission,
}: {
  token: string;
  id: number;
  idPermission: number;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/user-management/role/${id}/permissions/${idPermission}`,
    token: token,
  });
}
