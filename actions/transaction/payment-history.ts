"use server";

import { auth } from "@/lib/auth";
import { UploadType } from "@/lib/zod";
import { uploadPaymentHistory } from "@/services/transaction/payment-history";
import { revalidatePath } from "next/cache";

export const uploadPaymentHistoryAction = async (data: UploadType) => {
  const session = await auth();

  const res = await uploadPaymentHistory({
    token: session?.user.token as string,
    body: data,
  });

  if (!res.status) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidatePath("/transactional/payment-history");

  return {
    success: true,
    message: "Agent Call Activity Added",
  };
};
