import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { getAccessToken } = getKindeServerSession();
  const token = await getAccessToken();

  try {
    const { email } = await req.json();

    // Generate a unique invite code
    const inviteCode = crypto.randomBytes(16).toString("hex");

    const response = await fetch(
      `${process.env.KINDE_ISSUER_URL}/api/v1/invite`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          redirect_url: `${process.env.KINDE_SITE_URL}/invite?invite=${inviteCode}`,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to invite user");
    }

    const data = await response.json();

    // Here you would typically save the inviteCode to your database
    // associated with the invited email address

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error inviting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
