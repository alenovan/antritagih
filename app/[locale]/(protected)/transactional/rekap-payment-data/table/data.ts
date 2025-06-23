// data.ts

export type PaymentData = {
  id: string | number;
  created_at: string; // Date and time of creation
  updated_at: string; // Date and time of last update
  client_id: number; // ID of the client
  client_name: string; // Name of the client
  account_number: string; // Account number
  debitur_name: string; // Debitur (borrower's) name
  due_date: string; // Payment due date
  nominal: number; // Payment amount
  agent_name: string; // Name of the agent
  keterangan: string; // Description of the payment
  discount_percent: number; // Discount percentage
  note: string; // Additional notes
  data_status: string; // Status of the payment data
};

export const data: PaymentData[] = [
  {
    id: 1,
    created_at: "2025-06-01T00:00:00",
    updated_at: "2025-06-01T00:00:00",
    client_id: 1,
    client_name: "PT Sukses Bersama",
    account_number: "ACC123456789",
    debitur_name: "John Doe",
    due_date: "2025-06-15",
    nominal: 1200000.0,
    agent_name: "Agent01",
    keterangan: "FULL PAYMENT",
    discount_percent: 5.0,
    note: "Pembayaran lunas, diberikan diskon karena telat 30 hari.",
    data_status: "new",
  },
];
