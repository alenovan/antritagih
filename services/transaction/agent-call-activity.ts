import fetchAPI, { ApiParameter } from "../api";

export async function getAgentCallActivitys({
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
        created_at: new Date("2025-06-01 00:00:00"),
        updated_at: new Date("2025-06-01 00:00:00"),
        client_id: 1,
        session_id: "sess-202506141530",
        client_name: "PT Sukses Bersama",
        account_number: "ACC987654321",
        virtual_account: "VA1234567890",
        customer_name: "John Doe",
        jumlah_tagihan: 1500000.0,
        phone_number: "081234567890",
        call_reason: "Penagihan",
        call_situation: "Diangkat",
        call_status: "PTP",
        tgl_aksi: new Date("2025-06-14 15:30:00"),
        flags: "urgent",
        agent: "Agent01",
        call_type: "Outbound",
        duration_call: "00:05:45",
        comment: "Customer berjanji bayar tanggal 16.",
        remark: "Terlihat kooperatif, follow-up H+2.",
        account_status: "Menunggak",
        channel: "WhatsApp",
        channel_cost: 300.0,
      },
    ],
  };
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
  return {
    status: true,
    message: "success",
    data: {
      id: 1,
      created_at: new Date("2025-06-01 00:00:00"),
      updated_at: new Date("2025-06-01 00:00:00"),
      client_id: 1,
      session_id: "sess-202506141530",
      client_name: "PT Sukses Bersama",
      account_number: "ACC987654321",
      virtual_account: "VA1234567890",
      customer_name: "John Doe",
      jumlah_tagihan: 1500000.0,
      phone_number: "081234567890",
      call_reason: "Penagihan",
      call_situation: "Diangkat",
      call_status: "PTP",
      tgl_aksi: new Date("2025-06-14 15:30:00"),
      flags: "urgent",
      agent: "Agent01",
      call_type: "Outbound",
      duration_call: "00:05:45",
      comment: "Customer berjanji bayar tanggal 16.",
      remark: "Terlihat kooperatif, follow-up H+2.",
      account_status: "Menunggak",
      channel: "WhatsApp",
      channel_cost: 300.0,
    },
  };
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
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/transactional/agent-call-activity/upload`,
    token: token,
    body: body,
  });
}
