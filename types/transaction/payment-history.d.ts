type PaymentHistory = {
  id: number;
  created_at: Date;
  updated_at: Date;
  client_id: number;
  client_name: string;
  account_number: string;
  debitur_name: string;
  due_date: Date;
  nominal: number;
  agent_name: string;
  keterangan: string;
  discount_percent: number;
  note: string;
  data_status: string;
};
