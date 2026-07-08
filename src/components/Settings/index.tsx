"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Tabs from "@/components/Tabs";
import { useGetMe } from "@/hooks/useProfile";
import { useSearchParams } from "next/navigation";
import { toast } from "@/lib/toast";
import { useVerifySubscription } from "@/hooks/useBusiness";
import OrganisationTab from "./OrganisationTab";
import ProfileTab from "./ProfileTab";
import AccessTab from "./AccessTab";
import BillingsConfigTab from "./BillingsConfigTab";

const SETTINGS_TABS = [
	{ id: "organisation", label: "Organization Identity" },
	{ id: "profile", label: "Profile Settings" },
	{ id: "access", label: "Team Access & Permission" },
	{ id: "billing", label: "Payout & Billing Configuration" },
];

export default function Settings() {
	const { data: session } = useSession();
	const role = session?.user?.role;
	const searchParams = useSearchParams();
	const verifySubscriptionMutation = useVerifySubscription();
	const [isVerifying, setIsVerifying] = useState(false);
	const verifiedTxIds = React.useRef<Record<string, boolean>>({});

	const { data: meRes } = useGetMe();
	const business = meRes?.data?.business;

	const userKycStatus = meRes?.data?.kycStatus;

	const shouldLockSettings = useMemo(() => {
		if (role !== "admin" || !business) return false;

		const createdAtDate = business.createdAt ? new Date(business.createdAt) : null;
		const isTrialActive = createdAtDate
			? new Date().getTime() - createdAtDate.getTime() < 14 * 24 * 60 * 60 * 1000
			: false;

		const isSubscriptionActive = business.subscriptionStatus === "active";
		const isSubscribedOrTrial = isSubscriptionActive || isTrialActive;
		const isKycVerified = business.isVerified === true || userKycStatus === "approved";

		return !isSubscribedOrTrial || !isKycVerified;
	}, [role, business, userKycStatus]);

	const filteredTabs = useMemo(() => {
		if (role === "supervisor" || role === "staffs") {
			return SETTINGS_TABS.filter((tab) => tab.id === "profile");
		}
		return SETTINGS_TABS;
	}, [role]);

	const tabsWithDisabled = useMemo(() => {
		return filteredTabs.map((tab) => {
			if (shouldLockSettings && tab.id !== "organisation" && tab.id !== "billing") {
				return { ...tab, disabled: true };
			}
			return tab;
		});
	}, [filteredTabs, shouldLockSettings]);

	const [activeTab, setActiveTab] = useState("organisation");

	useEffect(() => {
		const status = searchParams?.get("status");
		const transactionId = searchParams?.get("transaction_id");

		if (
			status === "successful" &&
			transactionId &&
			!verifiedTxIds.current[transactionId] &&
			!isVerifying
		) {
			verifiedTxIds.current[transactionId] = true;
			setIsVerifying(true);

			// Clean the URL synchronously to prevent verification loops on remount/re-render
			if (typeof window !== "undefined") {
				const cleanUrl = window.location.pathname;
				window.history.replaceState({}, "", cleanUrl);
			}

			const toastId = toast.loading("Verifying your subscription payment, please wait...");
			verifySubscriptionMutation.mutate(transactionId, {
				onSuccess: (res) => {
					toast.dismiss(toastId);
					if (res.success) {
						toast.success("Subscription activated successfully!");
						setActiveTab("billing");
					} else {
						toast.error(res.message || "Failed to verify subscription.");
					}
					setIsVerifying(false);
				},
				onError: (err: unknown) => {
					toast.dismiss(toastId);
					const errorMsg =
						err instanceof Error ? err.message : "Error verifying subscription.";
					toast.error(errorMsg);
					setIsVerifying(false);
				},
			});
		}
	}, [searchParams, verifySubscriptionMutation, isVerifying]);

	useEffect(() => {
		if (role === "supervisor" || role === "staffs") {
			setActiveTab("profile");
		} else {
			const tab = searchParams?.get("tab");
			if (tab && SETTINGS_TABS.some((t) => t.id === tab)) {
				setActiveTab(tab);
			} else {
				setActiveTab("organisation");
			}
		}
	}, [role, searchParams]);

	const renderTabContent = () => {
		switch (activeTab) {
			case "organisation":
				return <OrganisationTab />;
			case "profile":
				return <ProfileTab />;
			case "access":
				return <AccessTab />;
			case "billing":
				return <BillingsConfigTab />;
			default:
				return role === "supervisor" || role === "staffs" ? (
					<ProfileTab />
				) : (
					<OrganisationTab />
				);
		}
	};

	return (
		<div className="flex flex-col gap-10">
			{/* Tabs Navigation */}
			<div className="flex flex-col gap-8">
				<Tabs
					tabs={tabsWithDisabled}
					activeTab={activeTab}
					onChange={setActiveTab}
					className="w-full border-b border-gray-100 pb-0"
				/>

				{/* Dynamic Content */}
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
					{renderTabContent()}
				</div>
			</div>
		</div>
	);
}
