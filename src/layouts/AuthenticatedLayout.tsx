// src/layouts/AuthenticatedLayout.tsx

"use client";

import React, { useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useGetMe } from "@/hooks/useProfile";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import cn from "@/lib/utils";

type AuthenticatedLayoutProps = {
	children: React.ReactNode;
};

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
	const { data: meRes, isLoading } = useGetMe();
	const pathname = usePathname();

	const user = meRes?.data;
	const business = user?.business;
	const role = user?.role;

	// Subscription expiration check
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

	// KYC check (admin role only)
	const isKycVerified = useMemo(() => {
		if (!role || role === "superadmin") return true;
		if (role === "supervisor" || role === "staffs") return true;
		if (!business) return true;
		return business.isVerified === true || user?.kycStatus === "approved";
	}, [role, business, user?.kycStatus]);

	// Team member pending check
	const isPendingTeamKyc = useMemo(() => {
		if (role !== "supervisor" && role !== "staffs") return false;
		return user?.kycStatus !== "approved";
	}, [role, user?.kycStatus]);

	// Gating logic
	const blockType = useMemo(() => {
		if (isLoading || !user) return null;
		if (role === "superadmin") return null;
		if (pathname === "/settings" || pathname === "/help") return null;

		// 1. Expiration check takes precedence
		if (!isTrialOrSubscribed) {
			return "expired";
		}

		// 2. Business KYC check
		if (role === "admin" && !isKycVerified) {
			return "kyc";
		}

		// 3. Team Member pending review (cannot access anything except settings and dashboard)
		if (isPendingTeamKyc && pathname !== "/dashboard" && pathname !== "/help") {
			return "pending_team_kyc";
		}

		return null;
	}, [isLoading, user, role, pathname, isTrialOrSubscribed, isKycVerified, isPendingTeamKyc]);

	const getLockContent = (type: "expired" | "kyc" | "pending_team_kyc") => {
		if (type === "expired") {
			return {
				title: "Subscription Expired",
				description:
					"Your platform subscription or free trial has expired. To restore access to all platform features, please renew or upgrade your plan.",
				icon: "solar:shield-warning-bold-duotone",
				iconColor: "text-red-500",
				bgGradient: "from-red-500/10 to-transparent",
				ctaLabel: "Configure Billing & Upgrade",
				ctaHref: "/settings?tab=billing",
			};
		}
		if (type === "pending_team_kyc") {
			return {
				title: "Identity Verification Required",
				description:
					"Your team account is currently awaiting verification approval from your Business Owner. You can manage your profile settings in the meantime.",
				icon: "solar:user-block-bold-duotone",
				iconColor: "text-amber-500",
				bgGradient: "from-amber-500/10 to-transparent",
				ctaLabel: "Manage Profile",
				ctaHref: "/settings",
			};
		}
		// kyc
		return {
			title: "Account Under Review",
			description:
				"Your business onboarding details and verification documents are currently being processed by our compliance team. Some features will remain locked until review is complete.",
			icon: "solar:hourglass-line-bold-duotone",
			iconColor: "text-blue-500",
			bgGradient: "from-blue-500/10 to-transparent",
			ctaLabel: "Check Onboarding Status",
			ctaHref: "/settings",
		};
	};

	const renderMainContent = () => {
		if (blockType) {
			const lock = getLockContent(blockType);
			return (
				<div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
					<div
						className={cn(
							"relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 text-center shadow-xl",
							"animate-in fade-in zoom-in-95 duration-500",
						)}
					>
						<div
							className={`absolute -right-20 -top-20 size-60 rounded-full bg-gradient-to-br ${lock.bgGradient} blur-3xl`}
						/>

						<div
							className={cn(
								"relative mx-auto mb-6 flex size-20 items-center justify-center rounded-[2rem] bg-gray-50 shadow-inner",
								lock.iconColor,
							)}
						>
							<Icon icon={lock.icon} className="size-10" />
						</div>

						<h2 className="relative mb-3 text-2xl font-black tracking-tight text-gray-900">
							{lock.title}
						</h2>
						<p className="relative mb-8 text-sm font-medium leading-relaxed text-gray-500">
							{lock.description}
						</p>

						<div className="relative flex flex-col gap-3">
							<Link
								href={lock.ctaHref}
								className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1d4ea8] text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] hover:bg-[#153a82] active:scale-[0.99]"
							>
								{lock.ctaLabel}
								<Icon icon="solar:arrow-right-bold" className="size-4" />
							</Link>
						</div>
					</div>
				</div>
			);
		}

		return children;
	};

	return (
		<div className="min-h-screen bg-gray-50/50">
			{/* Sidebar - Fixed Position */}
			<Sidebar className="hidden lg:block" />

			{/* Main Content Area - Pushed right by sidebar width on desktop */}
			<div className="flex min-h-screen flex-col transition-all duration-300 lg:pl-[300px]">
				<Navbar />

				<main className="flex-1 overflow-x-hidden p-4 lg:p-8">
					{isLoading ? (
						<div className="flex h-64 items-center justify-center">
							<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
						</div>
					) : (
						renderMainContent()
					)}
				</main>
			</div>
		</div>
	);
}
