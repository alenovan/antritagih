"use server";

import { auth } from "@/lib/auth";
import { UploadType } from "@/lib/zod";
import { uploadAgentCallActivity } from "@/services/transaction/agent-call-activity";
import { revalidateLocalizedPath } from "@/utils/revalidate";

export const uploadAgentCallActivityAction = async (data: UploadType) => {
  const session = await auth();

  const res = await uploadAgentCallActivity({
    token: session?.user.token as string,
    body: data,
  });

  if (res.success === false) {
    return {
      success: false,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/transactional/agent-call-activity");

  return {
    success: true,
    message: "Agent Call Activity Added",
  };
};
