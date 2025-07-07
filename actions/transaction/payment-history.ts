"use server";

import { auth } from "@/lib/auth";
import { UploadType } from "@/lib/zod";
import {
  getPaymentHistory,
  uploadPaymentHistory,
} from "@/services/transaction/payment-history";
import { revalidateLocalizedPath } from "@/utils/revalidate";

export const getPaymentHistoryAction = async (id: number) => {
  const session = await auth();

  const data = await getPaymentHistory({
    token: session?.user.token as string,
    id,
  });

  return data;
};

export const uploadPaymentHistoryAction = async (data: UploadType) => {
  const session = await auth();

  const res = await uploadPaymentHistory({
    token: session?.user.token as string,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/transactional/payment-history");

  return {
    status: res.status,
    message: "Agent Call Activity Added",
  };
};
