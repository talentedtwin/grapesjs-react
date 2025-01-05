"use client";

import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvitePage() {
  const { login } = useKindeAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidInvite, setIsValidInvite] = useState(false);

  useEffect(() => {
    const inviteCode = searchParams.get("invite");
    if (inviteCode) {
      // Here you would typically verify the invite code with your backend
      // For this example, we'll just assume it's valid if it exists
      setIsValidInvite(true);
    } else {
      // If there's no invite code, redirect to home or show an error
      router.push("/");
    }
  }, [searchParams, router]);

  if (!isValidInvite) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Complete Your Registration</h1>
      <div className="space-y-4">
        <Button onClick={() => login("email")}>Register with Email</Button>
        <Button onClick={() => login("google")}>Register with Google</Button>
        <Button onClick={() => login("microsoft")}>
          Register with Microsoft
        </Button>
        <Button onClick={() => login("apple")}>Register with Apple</Button>
      </div>
    </div>
  );
}
