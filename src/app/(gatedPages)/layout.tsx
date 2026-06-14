// src/app/(gatedPages)/layout.tsx
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function GatedPagesLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();
	// console.log("SESSION in layout:", session ? "Exists" : "Null");

	if (!session?.user) {
		// console.log("No session user found, redirecting to /login");
		redirect("/login");
	}

	return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
