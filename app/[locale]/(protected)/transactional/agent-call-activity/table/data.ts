// data.ts

export type AgentCallActivityData = {
  id: string | number;
  created_at: string; // Date and time of creation
  updated_at: string; // Date and time of last update
  client_id: number; // Client ID
  session_id: string; // Session ID for tracking calls
  client_name: string; // Client name
  account_number: string; // Account number
  virtual_account: string; // Virtual account number
  customer_name: string; // Customer name
  jumlah_tagihan: number; // Total amount to be billed
  phone_number: string; // Customer's phone number
  call_reason: string; // Reason for the call
  call_situation: string; // Status of the call (e.g., answered, missed)
  call_status: string; // Current status of the call (e.g., PTP)
  tgl_aksi: string; // Date and time when action was taken
  flags: string; // Flags related to the call (e.g., urgent)
  agent: string; // The agent handling the call
  call_type: string; // Type of the call (e.g., outbound, inbound)
  duration_call: string; // Duration of the call (formatted as hh:mm:ss)
  comment: string; // Comments about the call
  remark: string; // Remarks on the customer behavior or follow-up instructions
  account_status: string; // Account status (e.g., overdue, current)
  channel: string; // Communication channel (e.g., WhatsApp, Phone)
  channel_cost: number; // Cost associated with the channel used
};

export const data: AgentCallActivityData[] = [
  {
    id: 1,
    created_at: "2025-06-01 00:00:00",
    updated_at: "2025-06-01 00:00:00",
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
    tgl_aksi: "2025-06-14 15:30:00",
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
];
