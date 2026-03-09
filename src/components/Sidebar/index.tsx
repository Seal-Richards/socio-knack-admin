// src/components/Sidebar/index.tsx
/* eslint-disable react/no-unstable-nested-components, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment */

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner"; // Import sonner
import { clearAuth } from "@/utils/auth"; // Import your existing auth util
import { MENU_ITEMS, BOTTOM_MENU_ITEMS, LOGOUT_ITEM } from "@/constants/SidebarMenuItems";
import cn from "@/lib/utils";

export default function Sidebar({ className }: { className?: string }) {
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = () => {
		clearAuth();
		toast.success("Logged out successfully");
		router.push("/");
	};

	const NavItem = ({ item, isLogout = false }: { item: any; isLogout?: boolean }) => {
		const isActive =
			pathname === item.href ||
			(pathname.startsWith(item.href) && item.href !== "/dashboard");

		const commonClasses = cn(
			"flex items-center gap-4 px-6 py-3.5 text-sm font-medium transition-all duration-200 w-full text-left",
			"text-white/60 hover:text-white hover:bg-white/5",
			isActive &&
				!isLogout &&
				"bg-white text-[#1d4ea8] hover:bg-white hover:text-[#1d4ea8] shadow-sm",
			isLogout && "text-red-400 hover:bg-red-500/10 hover:text-red-300 mt-auto",
		);

		if (isLogout) {
			return (
				<button onClick={handleLogout} className={commonClasses}>
					<item.icon className="size-5" />
					<span className="tracking-wide">{item.label}</span>
				</button>
			);
		}

		return (
			<Link href={item.href} className={commonClasses}>
				<item.icon className={cn("h-5 w-5", isActive ? "text-[#1d4ea8]" : "opacity-70")} />
				<span className="tracking-wide">{item.label}</span>
			</Link>
		);
	};

	return (
		<aside
			className={cn(
				"hidden lg:flex flex-col w-[300px] bg-[#1d4ea8] h-screen fixed left-0 top-0 border-r border-white/5 text-white z-50",
				className,
			)}
		>
			<div className="flex h-24 items-center px-8">
				<div className="relative h-10 w-full">
					<Link href="/dashboard" className="flex items-center gap-2">
						<div className="relative size-10">
							<Image
								src="/assets/images/logo_sk_white.png"
								alt="SK"
								fill
								className="object-contain"
								priority
							/>
						</div>
						<span className="text-2xl font-black tracking-tight">SocioKnack</span>
					</Link>
				</div>
			</div>

			<div className="flex-1 space-y-1 overflow-y-auto py-8">
				{MENU_ITEMS.map((item) => (
					<NavItem key={item.href} item={item} />
				))}
			</div>

			<div className="mt-auto border-t border-white/10 pb-10 pt-6">
				{BOTTOM_MENU_ITEMS.map((item) => (
					<NavItem key={item.href} item={item} />
				))}

				{/* Logout Item */}
				<NavItem item={LOGOUT_ITEM} isLogout />
			</div>
		</aside>
	);
}
