import fetchAPI, { ApiParameter } from "../api";

export async function getClients({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return fetchAPI<GeneralAPIFetchResponse<Client[]>>({
    type: "server",
    method: "GET",
    endpoint: "/master/client",
    token: token,
    queryParams: query,
  });
}

export async function getClient({ token, id }: { token: string; id: number }) {
  return fetchAPI<GeneralAPIFetchResponse<Client>>({
    type: "server",
    method: "GET",
    endpoint: `/master/client/${id}`,
    token: token,
  });
}

export async function createClient({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/master/client`,
    token: token,
    body: body,
  });
}

export async function updateClient({
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
    endpoint: `/master/client/${id}`,
    token: token,
    body: body,
  });
}

export async function deleteClient({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/master/client/${id}`,
    token: token,
  });
}
