import fetchAPI, { ApiParameter } from "../api";

export async function getCheckDebiturs({
  token,
  identityNumber,
}: {
  token: string;
  identityNumber?: string;
}) {
  return {
    status: true,
    message: "success",
    data: [
      {
        identiy_number: "ID9876543210",
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
        clients: [
          {
            client_id: 1,
            account_number: "ACC123456",
            identiy_number: "ID9876543210",
            product_type: "Kredit Motor",
            fee: 250000.0,
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
          {
            client_id: 2,
            account_number: "ACC123456",
            identiy_number: "ID9876543210",
            product_type: "Kredit Motor",
            fee: 250000.0,
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
              id: 2,
              name: "MauCash",
            },
          },
        ],
      },
    ],
  };
}

export async function getCheckDebitur({
  token,
  identity_number,
}: {
  token: string;
  identity_number: number;
}) {
  return fetchAPI<GeneralAPIFetchResponse<Client>>({
    type: "server",
    method: "GET",
    endpoint: `/master/transactional/check-debitur/${identity_number}`,
    token: token,
  });
}
