import fetchAPI from "./api";

export async function userSignIn(body: Record<string, string>) {
  return fetchAPI<GeneralAPIFetchResponse<SignInResponse>>({
    body: body,
    method: "POST",
    endpoint: "/auth/login",
    type: "server",
  });
}

export async function userRefreshToken(token: string) {
  return fetchAPI<GeneralAPIFetchResponse<SignInResponse>>({
    type: "server",
    method: "POST",
    endpoint: "/auth/refresh-token",
    token: token,
  });
}
