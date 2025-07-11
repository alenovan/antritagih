import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});

export const clientParentSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  parent_client_id: z.coerce.number(),
});

export const debiturSchema = z.object({
  client_id: z.number().min(1, "Client is required"),
  account_number: z.string().trim().min(1, "Account Number is required"),
  identity_number: z.string().trim().min(1, "Identity Number is required"),
  product_type: z.string().trim().min(1, "Product Type is required"),
  fee: z.coerce.number().min(1, "Fee is required"),
  name: z.string().trim().min(1, "Name is required"),
  mobile_phone: z.string().trim().min(1, "Mobile Phone is required"),
  email: z.string().trim().min(1, "Email is required"),
  address: z.string().trim().min(1, "Address is required"),
  province: z.string().trim().min(1, "Province is required"),
  gender: z.string().trim().min(1, "Gender is required"),
  mariage_status: z.string().trim().min(1, "Mariage Status is required"),
  spouse_name: z.string().trim().min(1, "Spouse Name is required"),
  profession: z.string().trim().min(1, "Profession is required"),
  emergency_contact: z.string().trim().min(1, "Emergency Contact is required"),
  emergency_phone1: z.string().trim().min(1, "Emergency Phone 1 is required"),
  emergency_phone2: z.string().trim().min(1, "Emergency Phone 2 is required"),
  company_name: z.string().trim().min(1, "Company Name is required"),
  asset_desc: z.string().trim().min(1, "Asset Desc is required"),
  asset_category: z.string().trim().min(1, "Asset Category is required"),
  license_plate: z.string().trim().min(1, "License Plate is required"),
  color: z.string().trim().min(1, "Color is required"),
  manufacturing_year: z.coerce
    .number()
    .min(1, "Manufacturing Year is required"),
  next_installment_number: z.coerce
    .number()
    .min(1, "Next Installment Number is required"),
  last_paid_date: z.date(),
  last_paid_due_date: z.date(),
  due_date: z.date(),
  zone: z.string().trim().min(1, "Zone is required"),
  tenur: z.coerce.number().min(1, "Tenur is required"),
  branch_location: z.string().trim().min(1, "Branch Location is required"),
  installment_amount: z.coerce
    .number()
    .min(1, "Installment Amount is required"),
  total_debt: z.coerce.number().min(1, "Total Debt is required"),
  remaining_debt: z.coerce.number().min(1, "Remaining Debt is required"),
  status: z.coerce.number().min(1, "Status is required"),
  call_status: z.string().trim().min(1, "Call Status is required"),
  payment_status: z.string().trim().min(1, "Payment Status is required"),
});

export const debiturAdditionalSchema = z.object({
  debitur_id: z.number().min(1, "Debitur is required"),
  data: z.string().trim().min(1, "Data is required"),
  source: z.string().trim().min(1, "Source is required"),
  identifier: z.string().trim().min(1, "Identifier is required"),
});

export const priceChannelSchema = z.object({
  channel: z.string().trim().min(1, "Channel is required"),
  fee: z.coerce.number().min(1, "Fee is required"),
  effective_start_date: z.date(),
  effective_end_date: z.date(),
});

export const userSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  role_id: z.number().min(1, "Role is required"),
  email: z.string().trim().min(1, "Email is required"),
  password: z.string().trim().min(1, "Password is required"),
  status: z.boolean(),
});

export const roleSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export const rolePermissionSchema = z.object({
  permission_id: z.number().min(1, "Permission is required"),
});

export const checkDebiturSchema = z.object({
  identity_number: z.string().trim().min(1, "Indentity number is required"),
});

export const uploadSchema = z.object({
  identifier: z.string().trim().min(1, "Identity number is required"),
  client_id: z.number().optional(),
  month: z.string().trim().min(1, "Month is required"),
  filename: z.array(z.string().trim().min(1, "Filename cannot be empty")),
});

export type ClientType = z.infer<typeof clientSchema>;
export type ClientParentType = z.infer<typeof clientParentSchema>;
export type DebiturType = z.infer<typeof debiturSchema>;
export type DebiturAdditionalType = z.infer<typeof debiturAdditionalSchema>;
export type PriceChannelType = z.infer<typeof priceChannelSchema>;
export type UserType = z.infer<typeof userSchema>;
export type RoleType = z.infer<typeof roleSchema>;
export type RolePermissionType = z.infer<typeof rolePermissionSchema>;
export type CheckDebiturType = z.infer<typeof checkDebiturSchema>;
export type UploadType = z.infer<typeof uploadSchema>;
export type AuthType = z.infer<typeof authSchema>;
