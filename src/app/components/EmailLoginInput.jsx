"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

export default function EmailInput() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <>
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
             <Button variant="outline" className="w-full">
                <LoginLink
                    authUrlParams={{
                        connection_id:
                            process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS || "",
                        login_hint: email
                    }}
                >
                    NEXT
                </LoginLink>
             </Button>
        </>
    );
}