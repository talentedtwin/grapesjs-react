"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export default function KindeProviderWrapper({ children }) {
  return <KindeProvider>{children}</KindeProvider>;
}
