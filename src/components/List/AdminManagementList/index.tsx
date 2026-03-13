"use client";

import React, { useState } from "react";
import TableLayoutWrapper from "@/components/List/TableLayoutWrapper";
import Table from "@/components/Tables";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
	adminManagementColumns,
	type AdminManagementData,
} from "@/components/Tables/columns/adminManagementColumns";

const DUMMY_ADMINS: AdminManagementData[] = [
	{
		id: "1",
		name: "John Dea",
		role: "Supervisor",
		activityType: "Assign Agent",
		status: "Active",
		stamp: "12 Jan, 2026 | 8:10 AM",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: "2",
		name: "Kelvin Oti",
		role: "Supervisor",
		activityType: "Approve Task Report",
		status: "Active",
		stamp: "12 Jan, 2026 | 10:15 AM",
		avatar: "/assets/images/admin-avatar.png",
	},
];

export default function AdminManagementList() {
	const [, setRowSelection] = useState({});

	return (
		<TableLayoutWrapper
			title=""
			filters={
				<div className="flex w-full items-center justify-end">
					<Button className="h-11 gap-2 rounded-xl bg-[#1e288e] px-6 text-[14px] font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95">
						<Icon icon="solar:export-bold" className="size-4" />
						Export Activity
					</Button>
				</div>
			}
			className="gap-0"
		>
			<Table
				columns={adminManagementColumns as any[]}
				data={DUMMY_ADMINS}
				onRowSelectionChange={setRowSelection}
			/>
		</TableLayoutWrapper>
	);
}
