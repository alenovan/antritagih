import { UploadType } from "@/lib/zod";
import fetchAPI, { ApiParameter } from "../api";

export async function getAgentCallActivitys({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return fetchAPI<GeneralAPIFetchResponse<AgentCallActivity[]>>({
    type: "server",
    method: "GET",
    endpoint: "/transactional/agent-call-activity",
    token: token,
    queryParams: query,
  });
}

export async function getAgentCallActivity({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIFetchResponse<AgentCallActivity>>({
    type: "server",
    method: "GET",
    endpoint: `/transactional/agent-call-activity/${id}`,
    token: token,
  });
}

export async function uploadAgentCallActivity({
  token,
  body,
}: {
  token: string;
  body: UploadType;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/transactional/uploaded-file`,
    token: token,
    body: body,
  });
}

export async function getUploadActivity({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return fetchAPI<GeneralAPIFetchResponse<Upload[]>>({
    type: "server",
    method: "GET",
    endpoint: `/transactional/uploaded-file`,
    token: token,
    queryParams: query,
  });
}
