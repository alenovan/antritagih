"use server";

import { auth } from "@/lib/auth";
import { UploadType } from "@/lib/zod";
import { uploadPaymentHistory } from "@/services/transaction/payment-history";
import { revalidateLocalizedPath } from "@/utils/revalidate";

export const uploadPaymentHistoryAction = async (data: UploadType) => {
  const session = await auth();

  const res = await uploadPaymentHistory({
    token: session?.user.token as string,
    body: data,
  });

  if (res.success === false) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/transactional/payment-history");

  return {
    success: true,
    message: "Agent Call Activity Added",
  };
};
