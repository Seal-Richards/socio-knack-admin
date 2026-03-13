"use client";

import React, { useState } from "react";
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
	const [activeTab, setActiveTab] = useState("organisation");

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
				return <OrganisationTab />;
		}
	};

	return (
		<div className="flex flex-col gap-10">
			{/* Tabs Navigation */}
			<div className="flex flex-col gap-8">
				<Tabs
					tabs={SETTINGS_TABS}
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
