import fetchAPI, { ApiParameter } from "../api";

export async function getPermissions({
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
        resource: "user",
        permission: "create",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  };
  return fetchAPI<GeneralAPIFetchResponse<Permission[]>>({
    type: "server",
    method: "GET",
    endpoint: "/user-management/permission",
    token: token,
    queryParams: query,
  });
}

export async function getPermission({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIFetchResponse<Permission>>({
    type: "server",
    method: "GET",
    endpoint: `/user-management/permission/${id}`,
    token: token,
  });
}

export async function createPermission({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/user-management/permission`,
    token: token,
    body: body,
  });
}

export async function updatePermission({
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
    endpoint: `/user-management/permission/${id}`,
    token: token,
    body: body,
  });
}

export async function deletePermission({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/user-management/permission/${id}`,
    token: token,
  });
}
