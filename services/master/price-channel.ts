import fetchAPI, { ApiParameter } from "../api";

export async function getPriceChannels({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return fetchAPI<GeneralAPIFetchResponse<PriceChannel[]>>({
    type: "server",
    method: "GET",
    endpoint: "/master/price-channel",
    token: token,
    queryParams: query,
  });
}

export async function getPriceChannel({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIFetchResponse<PriceChannel>>({
    type: "server",
    method: "GET",
    endpoint: `/master/price-channel/${id}`,
    token: token,
  });
}

export async function createPriceChannel({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/master/price-channel`,
    token: token,
    body: body,
  });
}

export async function updatePriceChannel({
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
    endpoint: `/master/price-channel/${id}`,
    token: token,
    body: body,
  });
}

export async function deletePriceChannel({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/master/price-channel/${id}`,
    token: token,
  });
}
