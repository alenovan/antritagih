import fetchAPI, { ApiParameter } from "../api";

export async function getPaymentHistorys({
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
        client_name: "PT Sukses Bersama",
        account_number: "ACC123456789",
        debitur_name: "John Doe",
        due_date: new Date("2025-06-14 15:30:00"),
        nominal: 1200000.0,
        agent_name: "Agent01",
        keterangan: "FULL PAYMENT",
        discount_percent: 5.0,
        note: "Pembayaran lunas, diberikan diskon karena telat 30 hari.",
        data_status: "new",
      },
    ],
  };
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
  return {
    status: true,
    message: "success",
    data: {
      id: 1,
      created_at: new Date("2025-06-01T00:00:00"),
      updated_at: new Date("2025-06-01T00:00:00"),
      client_id: 1,
      client_name: "PT Sukses Bersama",
      account_number: "ACC123456789",
      debitur_name: "John Doe",
      due_date: new Date("2025-06-15"),
      nominal: 1200000.0,
      agent_name: "Agent01",
      keterangan: "FULL PAYMENT",
      discount_percent: 5.0,
      note: "Pembayaran lunas, diberikan diskon karena telat 30 hari.",
      data_status: "new",
    },
  };
  return fetchAPI<GeneralAPIFetchResponse<PaymentHistory>>({
    type: "server",
    method: "GET",
    endpoint: `/transactional/payment-history/${id}`,
    token: token,
  });
}

export async function uploadPaymentHistory({
  token,
  body,
}: {
  token: string;
  body: Record<string, string | number | boolean>;
}) {
  return fetchAPI<GeneralAPIResponse>({
    type: "server",
    method: "POST",
    endpoint: `/transactional/payment-history/upload`,
    token: token,
    body: body,
  });
}
