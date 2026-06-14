// src/components/Sidebar/index.tsx

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { toast } from "@/lib/toast";
import { clearAuth } from "@/utils/auth";
import { MENU_ITEMS, BOTTOM_MENU_ITEMS, LOGOUT_ITEM } from "@/constants/SidebarMenuItems";
import cn from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { teamRequests } from "@/lib/requests/team";
import { useGetMe } from "@/hooks/useProfile";

type MenuItem = {
	label: string;
	icon: React.ComponentType<any>;
	href: string;
};

type NavItemProps = {
	item: MenuItem;
	isActive: boolean;
	locked?: boolean;
	isLogout?: boolean;
	onClick: (e: React.MouseEvent<any>) => void;
};

function NavItem({ item, isActive, locked = false, isLogout = false, onClick }: NavItemProps) {
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
			<button onClick={onClick} className={commonClasses}>
				<item.icon className="size-5" />
				<span className="tracking-wide">{item.label}</span>
			</button>
		);
	}

	return (
		<Link href={item.href} onClick={onClick} className={commonClasses}>
			<item.icon className={cn("h-5 w-5", isActive ? "text-[#1d4ea8]" : "opacity-70")} />
			<span className="flex-1 tracking-wide">{item.label}</span>
			{locked && (
				<Icon
					icon="solar:lock-bold"
					className={cn("size-4", "animate-pulse", "text-yellow-500", "opacity-90")}
				/>
			)}
		</Link>
	);
}

export default function Sidebar({ className }: { className?: string }) {
	const pathname = usePathname();
	const queryClient = useQueryClient();

	const [lockType, setLockType] = useState<"none" | "expired" | "kyc">("none");

	const { data: meRes } = useGetMe();
	const user = meRes?.data;
	const business = user?.business;
	const role = user?.role;

	const isTrialOrSubscribed = useMemo(() => {
		if (!role || role === "superadmin") return true;
		if (!business) return true;

		const createdAtDate = business.createdAt ? new Date(business.createdAt) : null;
		const isTrialActive = createdAtDate
			? new Date().getTime() - createdAtDate.getTime() < 14 * 24 * 60 * 60 * 1000
			: false;

		const isSubscriptionActive = business.subscriptionStatus === "active";
		return isSubscriptionActive || isTrialActive;
	}, [role, business]);

	const isKycVerified = useMemo(() => {
		if (!role || role === "superadmin") return true;
		if (!business) return true;
		return business.isVerified === true;
	}, [role, business]);

	const isItemLocked = (href: string) => {
		if (href === "/dashboard" || href === "/settings") return false;
		if (role === "superadmin") return false;
		return !isTrialOrSubscribed || !isKycVerified;
	};

	const handleItemClick = (e: React.MouseEvent<any>, href: string) => {
		if (href === "/dashboard" || href === "/settings") return;
		if (role === "superadmin") return;

		if (!isTrialOrSubscribed) {
			e.preventDefault();
			setLockType("expired");
		} else if (!isKycVerified) {
			e.preventDefault();
			setLockType("kyc");
		}
	};

	const handleLogout = async () => {
		try {
			await teamRequests.logout();
		} catch (error) {
			console.error("Backend logout error:", error);
		} finally {
			clearAuth();
			queryClient.clear();
			toast.success("Logged out successfully");
			await signOut({ callbackUrl: "/login" });
		}
	};

	const getIsActive = (href: string) => {
		return pathname === href || (pathname.startsWith(href) && href !== "/dashboard");
	};

	const menuItems = MENU_ITEMS as MenuItem[];
	const bottomMenuItems = BOTTOM_MENU_ITEMS as MenuItem[];
	const logoutItem = LOGOUT_ITEM as MenuItem;

	return (
		<>
			<aside
				className={cn(
					"flex flex-col w-full lg:w-[300px] bg-[#1d4ea8] h-full lg:h-screen lg:fixed lg:left-0 lg:top-0 border-r border-white/5 text-white z-50",
					className,
				)}
			>
				<div className="flex h-20 items-center justify-center px-8 lg:h-24 lg:justify-start">
					<Link href="/dashboard" className="relative flex items-center justify-center">
						<div className="relative h-12 w-48">
							<Image
								src="/assets/images/logo_sk_white.png"
								alt="SocioKnack"
								fill
								className="object-contain"
								priority
							/>
						</div>
					</Link>
				</div>

				<div className="flex-1 space-y-1 overflow-y-auto py-8">
					{menuItems.map((item) => (
						<NavItem
							key={item.href}
							item={item}
							isActive={getIsActive(item.href)}
							locked={isItemLocked(item.href)}
							onClick={(e) => handleItemClick(e, item.href)}
						/>
					))}
				</div>

				<div className="mt-auto border-t border-white/10 pb-10 pt-6">
					{bottomMenuItems.map((item) => (
						<NavItem
							key={item.href}
							item={item}
							isActive={getIsActive(item.href)}
							locked={isItemLocked(item.href)}
							onClick={(e) => handleItemClick(e, item.href)}
						/>
					))}

					{/* Logout Item */}
					<NavItem item={logoutItem} isActive={false} isLogout onClick={handleLogout} />
				</div>
			</aside>

			{/* Lockout Modal Overlay */}
			{lockType !== "none" && (
				<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
					<div className="animate-in fade-in zoom-in-95 w-full max-w-sm rounded-2xl bg-white p-6 text-center text-gray-800 shadow-2xl duration-200">
						<div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
							<Icon icon="solar:lock-keyhole-bold-duotone" className="size-8" />
						</div>
						<h3 className="mb-2 text-lg font-bold text-gray-900">
							{lockType === "expired"
								? "Subscription Required"
								: "Verification Pending"}
						</h3>
						<p className="mb-6 text-xs font-semibold text-gray-500">
							{lockType === "expired"
								? "Please upgrade to access more feature"
								: "Please wait while your business account is being verified"}
						</p>
						<div className="flex flex-col gap-2">
							{lockType === "expired" && (
								<Link
									href="/settings"
									onClick={() => setLockType("none")}
									className="flex h-11 items-center justify-center rounded-xl bg-[#1d4ea8] text-xs font-bold text-white transition-all hover:bg-[#153a82]"
								>
									Go to Settings
								</Link>
							)}
							<button
								onClick={() => setLockType("none")}
								className="h-11 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 transition-all hover:bg-gray-50"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
