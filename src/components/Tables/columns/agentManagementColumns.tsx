"use client";

import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import { createColumns } from "./columnFactory";
import { ActionCell } from "../cells/ActionCells";
import type { TableColumns } from "./definitions";

export interface Agent {
	id: string | number;
	name: string;
	email: string;
	territory: string;
	status: "Active" | "Idle" | "Inactive";
	lastActivity: string;
	avatar: string;
}

export const agentManagementColumns: TableColumns<Agent> = createColumns<Agent>([
	{
		id: "agent",
		header: "Agent",
		cell: ({ row }) => {
			const agent = row.original;
			return (
				<div className="flex items-center gap-3">
					<div className="relative size-10 overflow-hidden rounded-full border border-gray-100">
						<Image src={agent.avatar} alt={agent.name} fill className="object-cover" />
					</div>
					<span className="text-[14px] font-bold text-gray-800">{agent.name}</span>
				</div>
			);
		},
	},
	{
		id: "email",
		header: "Mail Address",
		accessorKey: "email",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-500">{getValue() as string}</span>
		),
	},
	{
		id: "territory",
		header: "Territory",
		accessorKey: "territory",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
	},
	{
		id: "status",
		header: "Status",
		accessorKey: "status",
		cell: ({ getValue }) => {
			const status = getValue() as string;
			return (
				<div
					className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
						status === "Active"
							? "border border-green-100 bg-green-50 text-green-600"
							: "border border-orange-100 bg-orange-50 text-orange-600"
					}`}
				>
					{status}
				</div>
			);
		},
	},
	{
		id: "lastActivity",
		header: "Last Activity",
		accessorKey: "lastActivity",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-500">{getValue() as string}</span>
		),
	},
	{
		id: "actions",
		header: "",
		cell: ({ row }) => (
			<ActionCell
				id={row.original.id}
				viewHref={ROUTES.AGENT_DETAILS(row.original.id)}
				onDelete={() => {
					/* DELETE ACTION */
				}}
			/>
		),
	},
]);
