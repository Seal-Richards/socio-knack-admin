"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Tabs from "@/components/Tabs";
import { useGetMe } from "@/hooks/useProfile";
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

	const { data: meRes } = useGetMe();
	const business = meRes?.data?.business;

	const shouldLockSettings = useMemo(() => {
		if (role !== "admin" || !business) return false;

		const createdAtDate = business.createdAt ? new Date(business.createdAt) : null;
		const isTrialActive = createdAtDate
			? new Date().getTime() - createdAtDate.getTime() < 14 * 24 * 60 * 60 * 1000
			: false;

		const isSubscriptionActive = business.subscriptionStatus === "active";
		const isSubscribedOrTrial = isSubscriptionActive || isTrialActive;
		const isKycVerified = business.isVerified === true;

		return !isSubscribedOrTrial || !isKycVerified;
	}, [role, business]);

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
		if (role === "supervisor" || role === "staffs") {
			setActiveTab("profile");
		} else {
			setActiveTab("organisation");
		}
	}, [role]);

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
