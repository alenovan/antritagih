import fetchAPI from "../api";

export async function deleteUploadClient({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "DELETE",
    endpoint: `/transactional/uploaded-file/${id}`,
    token: token,
  });
}
