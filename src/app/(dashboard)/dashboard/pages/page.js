import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

async function getPages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pages`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }
  return res.json();
}

export default async function Pages() {
  const pages = await getPages();
  console.log("pages", pages);
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pages</h1>
        <Link href="/dashboard/create-page">
          <Button>Create Page</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell>{page.name}</TableCell>
              <TableCell>
                {new Date(page.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/page-editor?id=${page.id}`}>
                  <Button variant="outline">Edit Content</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
