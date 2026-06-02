"use client";

import type { ColumnDef } from "@tanstack/react-table";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";

export interface Agent {
	_id: string;
	id?: string;
	firstName: string;
	lastName: string;
	isOnline?: boolean;
	avatar?: string;
	lastCheckInTime?: string;
}

export const dashboardAgentColumns: ColumnDef<Agent>[] = [
	{
		header: "Agent Name",
		accessorKey: "firstName",
		cell: ({ row }) => {
			const agent = row.original;
			const fullName = `${agent.firstName} ${agent.lastName}`;
			return (
				<div className="flex items-center gap-2.5">
					<DynamicAvatar
						name={fullName}
						image={agent.avatar}
						className="size-8 shrink-0 rounded-full border border-gray-100"
					/>
					<span className="font-bold text-gray-700">{fullName}</span>
				</div>
			);
		},
	},
	{
		header: "Status",
		accessorKey: "isOnline",
		cell: ({ row }) => {
			const { isOnline } = row.original;
			const statusText = isOnline ? "Active" : "Offline";
			return (
				<div className="flex items-center gap-2">
					<div
						className={`size-2 rounded-full ${isOnline ? "bg-green-500" : "bg-orange-400"}`}
					/>
					<span className="text-[13px] font-bold text-gray-600">{statusText}</span>
				</div>
			);
		},
	},
	{
		header: "Last Check-in",
		accessorKey: "lastCheckInTime",
		cell: ({ row }) => {
			const time = row.original.lastCheckInTime;
			let displayTime = "N/A";
			if (time) {
				const date = new Date(time);
				displayTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
			}
			return <span className="text-[13px] font-bold text-gray-400">{displayTime}</span>;
		},
	},
];
