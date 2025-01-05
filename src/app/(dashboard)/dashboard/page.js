import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated) {
    redirect("/api/auth/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link href="/dashboard/pages">Pages</Link>
        </li>
        <li>
          <Link href="/dashboard/users">Users</Link>
        </li>
      </ul>
      {/* Add a list of existing pages here */}
    </div>
  );
}
