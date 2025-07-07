"use server";

import { auth } from "@/lib/auth";
import {
  getPaymentHistory
} from "@/services/transaction/payment-history";

export const getPaymentHistoryAction = async (id: number) => {
  const session = await auth();

  const data = await getPaymentHistory({
    token: session?.user.token as string,
    id,
  });

  return data;
};
