import fetchAPI, { ApiParameter } from "../api";

export async function getPriceChannels({
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
        channel: "Whatsapp",
        fee: 300,
        effective_start_date: new Date("2025-01-01 00:00:00"),
        effective_end_date: new Date("2025-01-01 00:00:00"),
      },
    ],
  };
  return fetchAPI<GeneralAPIFetchResponse<PriceChannel[]>>({
    type: "server",
    method: "GET",
    endpoint: "/master/client",
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
    endpoint: `/master/client/${id}`,
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
    endpoint: `/master/client`,
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
    endpoint: `/master/client/${id}`,
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
    endpoint: `/master/client/${id}`,
    token: token,
  });
}
