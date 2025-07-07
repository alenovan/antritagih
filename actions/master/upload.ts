"use server";

import { auth } from "@/lib/auth";
import { deleteUploadClient } from "@/services/master/upload";
import { revalidateLocalizedPath } from "@/utils/revalidate";

export const deleteUploadAction = async (id: number) => {
  const session = await auth();

  const res = await deleteUploadClient({
    token: session?.user.token as string,
    id,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }
  revalidateLocalizedPath("/transactional/upload");

  return {
    status: res.status,
    message: "Client Deleted",
  };
};
