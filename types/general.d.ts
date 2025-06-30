type GeneralAPIResponse = {
  message: string;
  status: boolean;
};

type GeneralAPIFetchResponse<T> = {
  message: string;
  status: boolean;
  data: T;
  meta?: Meta;
};

type Meta = {
  per_page: number;
  prev_page: number;
  page: number;
  next_page: number;
  last_page: number;
  total_records: number;
};
