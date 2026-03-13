"use client";

import React, { useState } from "react";
import TableLayoutWrapper from "@/components/List/TableLayoutWrapper";
import Table from "@/components/Tables";
import Tabs from "@/components/Tabs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
	userManagementColumns,
	type UserManagementData,
} from "@/components/Tables/columns/userManagementColumns";

const DUMMY_USERS: UserManagementData[] = [
	{
		id: "1",
		name: "Sarah John",
		mail: "sarajohn@gmail.com",
		activityType: "Reset Password",
		status: "Active",
		stamp: "12 Jan, 2026 | 12:19 AM",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: "2",
		name: "Kelvin Oti",
		mail: "kelvinoti@gmail.com",
		activityType: "Task Check-in",
		status: "Active",
		stamp: "12 Jan, 2026 | 1:20 PM",
		avatar: "/assets/images/admin-avatar.png",
	},
];

const USER_TABS = [
	{ id: "agent", label: "Agent" },
	{ id: "admin", label: "Admin" },
];

export default function UserManagementList() {
	const [activeTab, setActiveTab] = useState("agent");

	return (
		<TableLayoutWrapper
			title=""
			filters={
				<div className="flex w-full items-center justify-between">
					<Tabs
						tabs={USER_TABS}
						activeTab={activeTab}
						onChange={setActiveTab}
						className="border-none"
					/>
					<Button className="h-11 gap-2 rounded-xl bg-[#1e288e] px-6 text-[14px] font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95">
						<Icon icon="solar:export-bold" className="size-4" />
						Export Activity
					</Button>
				</div>
			}
			className="gap-0"
		>
			<Table columns={userManagementColumns as any[]} data={DUMMY_USERS} />
		</TableLayoutWrapper>
	);
}
