"use client";

import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function RegisterPage() {
  const { login } = useKindeAuth();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
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
