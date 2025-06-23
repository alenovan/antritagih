import fetchAPI, { ApiParameter } from "../api";

export async function getDebiturs({
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
        client_id: 1,
        account_number: "ACC123456",
        identity_number: "ID9876543210",
        product_type: "Kredit Motor",
        fee: 250000.0,
        name: "John Doe",
        mobile_phone: "081234567890",
        email: "john.doe@example.com",
        address: "Jl. Mawar No. 123, Jakarta",
        province: "DKI Jakarta",
        gender: "L",
        mariage_status: "Menikah",
        spouse_name: "Jane Doe",
        profession: "Karyawan Swasta",
        emergency_contact: "Budi",
        emergency_phone1: "0811223344",
        emergency_phone2: "0811334455",
        company_name: "PT Sukses Selalu",
        asset_desc: "Motor Yamaha NMAX 155cc",
        asset_category: "Kendaraan Bermotor",
        license_plate: "B1234XYZ",
        color: "Hitam",
        manufacturing_year: 2021,
        next_installment_number: 5,
        last_paid_date: "2025-05-15",
        last_paid_due_date: "2025-05-10",
        due_date: "2025-06-15",
        zone: "Jakarta Selatan",
        tenur: 24,
        branch_location: "Cabang Fatmawati",
        installment_amount: 950000.0,
        total_debt: 22800000.0,
        remaining_debt: 13300000.0,
        status: 1,
        call_status: "PTP",
        client: {
          id: 1,
          name: "BAF",
        },
      },
    ],
  };
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
