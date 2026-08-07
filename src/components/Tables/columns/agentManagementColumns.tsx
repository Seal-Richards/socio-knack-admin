"use client";

import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { ROUTES } from "@/constants/routes";
import { createColumns } from "./columnFactory";
import { ActionCell } from "../cells/ActionCells";
import type { TableColumns } from "./definitions";

export interface Agent {
	id: string | number;
	name: string;
	email: string;
	territory: string;
	isOnline: boolean;
	profileStatus: string;
	kycStatus?: string;
	lastActivity: string;
	avatar: string;
}

export const getAgentManagementColumns = (
	onDelete: (id: string | number) => void,
): TableColumns<Agent> =>
	createColumns<Agent>([
		{
			id: "agent",
			header: "Agent",
			cell: ({ row }) => {
				const agent = row.original;
				return (
					<div className="flex items-center gap-3">
						<DynamicAvatar
							name={agent.name}
							image={agent.avatar}
							className="size-10 rounded-full border border-gray-100"
						/>
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
				<span className="text-[13px] font-medium text-gray-500">
					{getValue() as string}
				</span>
			),
		},
		{
			id: "territory",
			header: "Territory",
			accessorKey: "territory",
			cell: ({ getValue }) => (
				<span className="text-[13px] font-medium text-gray-600">
					{getValue() as string}
				</span>
			),
		},
		{
			id: "isOnline",
			header: "Activity Status",
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
			id: "profileStatus",
			header: "Profile Status",
			accessorKey: "profileStatus",
			cell: ({ getValue }) => {
				const status = ((getValue() as string) || "pending").toLowerCase();
				let badgeClass = "border border-orange-100 bg-orange-50 text-orange-600";
				let label = "Pending";

				if (status === "active") {
					badgeClass = "border border-green-100 bg-green-50 text-green-600";
					label = "Active";
				} else if (status === "suspended") {
					badgeClass = "border border-gray-150 bg-gray-100 text-gray-600";
					label = "Suspended";
				} else if (status === "rejected") {
					badgeClass = "border border-red-100 bg-red-50 text-red-600";
					label = "Rejected";
				}

				return (
					<div
						className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeClass}`}
					>
						{label}
					</div>
				);
			},
		},
		{
			id: "kycStatus",
			header: "KYC Status",
			accessorKey: "kycStatus",
			cell: ({ getValue }) => {
				const status = (getValue() as string) || "unverified";
				let badgeClass = "border border-gray-150 bg-gray-100 text-gray-600";
				let label = "Unverified";

				if (status === "approved") {
					badgeClass = "border border-green-100 bg-green-50 text-green-600";
					label = "Approved";
				} else if (status === "pending") {
					badgeClass = "border border-orange-100 bg-orange-50 text-orange-600";
					label = "Pending Approval";
				} else if (status === "rejected") {
					badgeClass = "border border-red-100 bg-red-50 text-red-600";
					label = "Rejected";
				} else if (status === "notStarted") {
					badgeClass = "border border-gray-150 bg-gray-100 text-gray-600";
					label = "Not Started";
				}

				return (
					<div
						className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeClass}`}
					>
						{label}
					</div>
				);
			},
		},
		{
			id: "lastActivity",
			header: "Last Activity",
			accessorKey: "lastActivity",
			cell: ({ getValue }) => (
				<span className="text-[13px] font-medium text-gray-500">
					{getValue() as string}
				</span>
			),
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<ActionCell
					id={row.original.id}
					viewHref={ROUTES.AGENT_DETAILS(row.original.id)}
					onDelete={() => onDelete(row.original.id)}
				/>
			),
		},
	]);
