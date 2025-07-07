import fetchAPI, { ApiParameter } from "../api";

export async function getClientParents({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return fetchAPI<GeneralAPIFetchResponse<Client[]>>({
    type: "server",
    method: "GET",
    endpoint: "/master/client/parent",
    token: token,
    queryParams: query,
  });
}

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

export async function getClientParent({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIFetchResponse<Client>>({
    type: "server",
    method: "GET",
    endpoint: `/master/client/parent/${id}`,
    token: token,
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

export async function createClientParent({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/master/client/parent`,
    token: token,
    body: body,
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

export async function updateClientParent({
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
    endpoint: `/master/client/parent/${id}`,
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

export async function deleteClientParent({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/master/client/parent/${id}`,
    token: token,
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
