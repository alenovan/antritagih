"use server";

import { auth } from "@/lib/auth";
import { UploadType } from "@/lib/zod";
import { uploadAgentCallActivity } from "@/services/transaction/agent-call-activity";
import { revalidatePath } from "next/cache";

export const uploadAgentCallActivityAction = async (data: UploadType) => {
  const session = await auth();

  const res = await uploadAgentCallActivity({
    token: session?.user.token as string,
    body: data,
  });

  if (!res.status) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidatePath("/transactional/agent-call-activity");

  return {
    success: true,
    message: "Agent Call Activity Added",
  };
};
