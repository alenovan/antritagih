"use server";

import { revalidatePath } from "next/cache";

export const postMessageAction = async (id: string, message: string) => {
  const response = await postMessage(id, message);
  revalidatePath("/");
  return response;
};
