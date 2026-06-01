"use client";

import React from "react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { ROUTES } from "@/constants/routes";
import { createColumns } from "./columnFactory";
import { ActionCell } from "../cells/ActionCells";
import type { TableColumns } from "./definitions";

export interface Supervisor {
	id: string | number;
	name: string;
	email: string;
	territory: string;
	agentCount: number;
	complianceScore: string;
	lastActivity: string;
	avatar: string;
}

export const supervisorManagementColumns: TableColumns<Supervisor> = createColumns<Supervisor>([
	{
		id: "supervisor",
		header: "Supervisor",
		cell: ({ row }) => {
			const supervisor = row.original;
			return (
				<div className="flex items-center gap-3">
					<DynamicAvatar
						name={supervisor.name}
						image={supervisor.avatar}
						className="size-10 shrink-0 rounded-full border border-gray-100"
					/>
					<span className="text-[14px] font-bold text-gray-800">{supervisor.name}</span>
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
		id: "agentCount",
		header: "Agent count",
		accessorKey: "agentCount",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as number}</span>
		),
	},
	{
		id: "complianceScore",
		header: "Compliance Score",
		accessorKey: "complianceScore",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
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
				viewHref={ROUTES.SUPERVISOR_DETAILS(row.original.id)}
				onDelete={() => {
					/* DELETE ACTION */
				}}
			/>
		),
	},
]);
