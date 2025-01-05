import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { getAccessToken } = getKindeServerSession();
  const token = await getAccessToken();

  try {
    const response = await fetch(
      `${process.env.KINDE_ISSUER_URL}/api/v1/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return NextResponse.json(data.users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { getToken } = getKindeServerSession();
  const token = await getToken();

  try {
    const { email } = await req.json();

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
          redirect_url: `${process.env.KINDE_SITE_URL}/dashboard`,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to invite user");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error inviting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
