type GeneralAPIResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};

type Meta = {
  RowsPerPage: number;
  PreviousPage: number;
  CurrentPage: number;
  NextPage: number;
  TotalPages: number;
  TotalRecords: number;
};
