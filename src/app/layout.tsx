// src/app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import "../styles/globals.css";
import cn from "@/lib/utils";
import "../styles/fonts.css";
import ReactQueryProvider from "@src/providers/ReactQueryProvider";
import { Toaster } from "@src/components/ui/sonner";
import { type ReactNode } from "react";

const jakarta = PlusJakartaSans({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "Socio Knack Admin",
	description: "Admin dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased text-[#1a1a1a]",
					jakarta.variable,
				)}
			>
				<ReactQueryProvider>
					{children}
					<Toaster richColors position="top-right" />
				</ReactQueryProvider>
			</body>
		</html>
	);
}
