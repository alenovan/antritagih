type ClientParent = {
  id: number;
  name: string;
};

type Client = {
  id: number;
  name: string;
  parent_client_id: number;
  parent_client: ClientParent;
};
