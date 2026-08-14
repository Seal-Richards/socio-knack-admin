"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ROUTES } from "@/constants/routes";
import { createColumns } from "./columnFactory";
import type { TableColumns } from "./definitions";
import { ActionCell } from "../cells/ActionCells";

export type ReportPayout = {
	id: string;
	taskTitle: string;
	agentName: string;
	agentEmail: string;
	territory: string;
	successRate: string;
	incentiveAmount: string;
	status: "paid" | "pending" | "failed";
	date?: string;
};

export const reportPayoutColumns: TableColumns<ReportPayout> = createColumns<ReportPayout>([
	{
		id: "select",
		header: "",
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
	},
	{
		id: "taskTitle",
		accessorKey: "taskTitle",
		header: "Task / Visit",
		cell: ({ getValue }) => (
			<span className="text-[14px] font-bold text-gray-800">{getValue() as string}</span>
		),
	},
	{
		id: "agentName",
		accessorKey: "agentName",
		header: "Agent Name",
		cell: ({ getValue }) => (
			<span className="text-[14px] font-bold text-gray-800">{getValue() as string}</span>
		),
	},
	{
		id: "territory",
		accessorKey: "territory",
		header: "Territory",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
	},
	{
		id: "successRate",
		accessorKey: "successRate",
		header: "Task success rates",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
	},
	{
		id: "incentiveAmount",
		accessorKey: "incentiveAmount",
		header: "Incentive Amount",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
	},
	{
		id: "status",
		accessorKey: "status",
		header: "Status",
		cell: ({ getValue }) => {
			const status = (getValue() as string).toLowerCase();
			let badgeClass = "bg-orange-50 text-orange-600 border border-orange-100";
			let statusLabel = "Pending";

			if (status === "paid" || status === "completed") {
				badgeClass = "bg-green-50 text-green-600 border border-green-100";
				statusLabel = "Paid";
			} else if (status === "approved") {
				badgeClass = "bg-green-50 text-green-600 border border-green-100";
				statusLabel = "Approved";
			} else if (status === "failed") {
				badgeClass = "bg-red-50 text-red-600 border border-red-100";
				statusLabel = "Failed";
			} else if (status === "rejected") {
				badgeClass = "bg-red-50 text-red-600 border border-red-100";
				statusLabel = "Rejected";
			} else if (status === "cancelled") {
				badgeClass = "bg-gray-50 text-gray-500 border border-gray-150";
				statusLabel = "Cancelled";
			}

			return (
				<div
					className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${badgeClass}`}
				>
					{statusLabel}
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "",
		cell: ({ row }) => (
			<ActionCell id={row.original.id} viewHref={ROUTES.REPORT_DETAILS(row.original.id)} />
		),
	},
]);
