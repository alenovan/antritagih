import fetchAPI, { ApiParameter } from "../api";

export async function getCheckDebiturs({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return fetchAPI<GeneralAPIFetchResponse<CheckDebitur[]>>({
    type: "server",
    method: "GET",
    endpoint: "/transactional/check-debitur",
    token: token,
    queryParams: query,
  });
}
