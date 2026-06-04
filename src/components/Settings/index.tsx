"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Tabs from "@/components/Tabs";
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

	const filteredTabs = useMemo(() => {
		if (role === "supervisor" || role === "staffs") {
			return SETTINGS_TABS.filter((tab) => tab.id === "profile");
		}
		return SETTINGS_TABS;
	}, [role]);

	const [activeTab, setActiveTab] = useState("profile");

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
					tabs={filteredTabs}
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
