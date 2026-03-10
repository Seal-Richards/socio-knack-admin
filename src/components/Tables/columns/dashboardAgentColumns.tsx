"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

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
					<div className="relative size-8 overflow-hidden rounded-full border border-gray-100">
						<Image src={agent.avatar} alt={agent.name} fill className="object-cover" />
					</div>
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
