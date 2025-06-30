"use server";

import { auth } from "@/lib/auth";
import { PriceChannelType } from "@/lib/zod";
import {
  createPriceChannel,
  updatePriceChannel,
  deletePriceChannel,
} from "@/services/master/price-channel";
import { revalidateLocalizedPath } from "@/utils/revalidate";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const createPriceChannelAction = async (data: PriceChannelType) => {
  const session = await auth();

  const res = await createPriceChannel({
    token: session?.user.token as string,
    body: {
      ...data,
      effective_start_date: format(
        data.effective_start_date,
        "yyyy-MM-dd HH:mm:ss"
      ),
      effective_end_date: format(
        data.effective_start_date,
        "yyyy-MM-dd HH:mm:ss"
      ),
    },
  });

  if (res.success === false) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/price-channel");

  return {
    success: true,
    message: "PriceChannel Added",
  };
};

export const updatePriceChannelAction = async (
  id: number,
  data: PriceChannelType
) => {
  const session = await auth();

  const res = await updatePriceChannel({
    token: session?.user.token as string,
    id,
    body: {
      ...data,
      effective_start_date: format(
        data.effective_start_date,
        "yyyy-MM-dd HH:mm:ss"
      ),
      effective_end_date: format(
        data.effective_start_date,
        "yyyy-MM-dd HH:mm:ss"
      ),
    },
  });

  if (res.success === false) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/price-channel");

  return {
    success: true,
    message: "PriceChannel Updated",
  };
};

export const deletePriceChannelAction = async (id: number) => {
  const session = await auth();

  const res = await deletePriceChannel({
    token: session?.user.token as string,
    id,
  });

  if (res.success === false) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/price-channel");

  return {
    success: true,
    message: "PriceChannel Deleted",
  };
};
