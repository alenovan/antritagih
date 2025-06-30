import fetchAPI, { ApiParameter } from "../api";

export async function getUsers({
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
        name: "Admin",
        email: "admin@example.com",
        status: true,
        role: {
          id: 1,
          name: "Admin",
        },
      },
    ],
  };
  return fetchAPI<GeneralAPIFetchResponse<User[]>>({
    type: "server",
    method: "GET",
    endpoint: "/user-management/user",
    token: token,
    queryParams: query,
  });
}

export async function getUser({ token, id }: { token: string; id: number }) {
  return fetchAPI<GeneralAPIFetchResponse<User>>({
    type: "server",
    method: "GET",
    endpoint: `/user-management/user/${id}`,
    token: token,
  });
}

export async function getUserProfile(token: string) {
  return fetchAPI<GeneralAPIFetchResponse<User>>({
    type: "server",
    method: "GET",
    endpoint: `/user-management/user/profile`,
    token: token,
  });
}

export async function createUser({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/user-management/user`,
    token: token,
    body: body,
  });
}

export async function updateUser({
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
    endpoint: `/user-management/user/${id}`,
    token: token,
    body: body,
  });
}

export async function deleteUser({ token, id }: { token: string; id: number }) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/user-management/user/${id}`,
    token: token,
  });
}
