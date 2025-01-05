import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { FcGoogle } from "react-icons/fc";
import EmailInput from "./components/EmailLoginInput";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function Dashboard() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <EmailInput />
            <Button variant="outline" className="w-full">
              <LoginLink
                className="w-full flex items-center justify-center"
                authUrlParams={{
                  connection_id:
                    process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE || "",
                }}
              >
                <FcGoogle className="mr-5" />
                Login with Google
              </LoginLink>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <RegisterLink className="ml-5">Create account</RegisterLink>
          </div>
        </div>
      </div>
      <div className="bg-muted lg:block">
        <Image
          src="/pexels-markusspiske-1089440.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
