type ClientDetail = {
  client_id?: number;
  account_number?: string;
  identiy_number?: string;
  product_type?: string;
  fee?: number;
  asset_desc?: string;
  asset_category?: string;
  license_plate?: string;
  color?: string;
  manufacturing_year?: number;
  next_installment_number?: number;
  last_paid_date?: string; // Format: YYYY-MM-DD
  last_paid_due_date?: string; // Format: YYYY-MM-DD
  due_date?: string; // Format: YYYY-MM-DD
  zone?: string;
  tenur?: number;
  branch_location?: string;
  installment_amount?: number;
  total_debt?: number;
  remaining_debt?: number;
  status?: number;
  call_status?: string;
  client?: Client;
};

type Proviling = {
  identiy_number?: string;
  name?: string;
  mobile_phone?: string;
  email?: string;
  address?: string;
  province?: string;
  gender?: string;
  mariage_status?: string;
  spouse_name?: string;
  profession?: string;
  emergency_contact?: string;
  emergency_phone1?: string;
  emergency_phone2?: string;
  company_name?: string;
  clients?: ClientDetail[];
};
