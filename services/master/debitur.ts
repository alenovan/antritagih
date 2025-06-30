import fetchAPI, { ApiParameter } from "../api";

export async function getDebiturs({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return fetchAPI<GeneralAPIFetchResponse<Debitur[]>>({
    type: "server",
    method: "GET",
    endpoint: "/master/debitur",
    token: token,
    queryParams: query,
  });
}

export async function getDebitur({ token, id }: { token: string; id: number }) {
  return fetchAPI<GeneralAPIFetchResponse<Debitur>>({
    type: "server",
    method: "GET",
    endpoint: `/master/debitur/${id}`,
    token: token,
  });
}

export async function createDebitur({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/master/debitur`,
    token: token,
    body: body,
  });
}

export async function uploadDebitur({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/master/debitur`,
    token: token,
    body: body,
  });
}

export async function updateDebitur({
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
    endpoint: `/master/debitur/${id}`,
    token: token,
    body: body,
  });
}

export async function deleteDebitur({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/master/debitur/${id}`,
    token: token,
  });
}
