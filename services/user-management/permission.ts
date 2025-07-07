import fetchAPI, { ApiParameter } from "../api";

export async function getPermissions({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
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
