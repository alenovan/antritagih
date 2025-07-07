import { auth } from "@/lib/auth";
import { getUserProfile } from "@/services/user-management/user";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, message, status } = await getUserProfile(session.user.token);

  if (status === false) {
    return NextResponse.json(
      { error: message || "Something went wrong" },
      { status: status || 400 }
    );
  }

  const responseBody = {
    id: data?.id,
    name: data?.name,
    role: { id: data?.role_id, name: data?.role.name },
    permission: data?.permission,
  };

  const stringBody = JSON.stringify(responseBody);
  const etag = crypto.createHash("md5").update(stringBody).digest("hex");

  const ifNoneMatch = request.headers.get("If-None-Match");

  if (ifNoneMatch === etag) {
    return new Response(null, {
      status: 304,
      headers: {
        ETag: etag,
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.json(responseBody, {
    status: 200,
    headers: {
      ETag: etag,
      "Content-Type": "application/json",
    },
  });
}
