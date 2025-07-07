import fetchAPI, { ApiParameter } from "../api";

export async function getPaymentHistorys({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return fetchAPI<GeneralAPIFetchResponse<PaymentHistory[]>>({
    type: "server",
    method: "GET",
    endpoint: "/transactional/payment-history",
    token: token,
    queryParams: query,
  });
}

export async function getPaymentHistory({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIFetchResponse<PaymentHistory>>({
    type: "server",
    method: "GET",
    endpoint: `/transactional/payment-history/${id}`,
    token: token,
  });
}
