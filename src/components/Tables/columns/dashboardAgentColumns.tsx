"use client";

import type { ColumnDef } from "@tanstack/react-table";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";

export interface Agent {
	id: number;
	name: string;
	status: string;
	avatar: string;
	lastCheckIn: string;
}

export const dashboardAgentColumns: ColumnDef<Agent>[] = [
	{
		header: "Agent Name",
		accessorKey: "name",
		cell: ({ row }) => {
			const agent = row.original;
			return (
				<div className="flex items-center gap-2.5">
					<DynamicAvatar
						name={agent.name}
						image={agent.avatar}
						className="size-8 shrink-0 rounded-full border border-gray-100"
					/>
					<span className="font-bold text-gray-700">{agent.name}</span>
				</div>
			);
		},
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => {
			const agent = row.original;
			return (
				<div className="flex items-center gap-2">
					<div
						className={`size-2 rounded-full ${agent.status === "Active" ? "bg-green-500" : "bg-orange-400"}`}
					/>
					<span className="text-[13px] font-bold text-gray-600">{agent.status}</span>
				</div>
			);
		},
	},
	{
		header: "Last Check-in",
		accessorKey: "lastCheckIn",
		cell: ({ row }) => {
			const agent = row.original;
			return <span className="text-[13px] font-bold text-gray-400">{agent.lastCheckIn}</span>;
		},
	},
];
