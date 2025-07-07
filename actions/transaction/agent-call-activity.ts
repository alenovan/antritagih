"use server";

import { auth } from "@/lib/auth";
import { UploadType } from "@/lib/zod";
import {
  getAgentCallActivity,
  uploadAgentCallActivity,
} from "@/services/transaction/agent-call-activity";
import { revalidateLocalizedPath } from "@/utils/revalidate";

export const getAgentCallActivityAction = async (id: number) => {
  const session = await auth();

  const data = await getAgentCallActivity({
    token: session?.user.token as string,
    id,
  });

  return data;
};

export const uploadAgentCallActivityAction = async (data: UploadType) => {
  const session = await auth();

  if (!session?.user?.token) {
    return {
      status: false,
      message: "User is not authenticated or token is missing",
    };
  }

  const res = await uploadAgentCallActivity({
    token: session.user.token,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message || "Upload failed",
    };
  }

  revalidateLocalizedPath("/transactional/agent-call-activity");

  return {
    status: true,
    message: "Upload Data Added",
  };
};
