type User = {
  id: number;
  name: string;
  email: string;
  status: boolean;
  role: Role;
};

type UserProfile = {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  name: string;
  email: string;
  role_id: number;
  status: number;
  role: Role;
  permission: Permission[];
};
