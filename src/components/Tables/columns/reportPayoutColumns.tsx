"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { createColumns } from "./columnFactory";
import type { TableColumns } from "./definitions";

export type ReportPayout = {
	id: string;
	agentName: string;
	territory: string;
	kpiScore: string;
	basePay: string;
	bonuses: string;
	deductions: string;
	netPayout: string;
	status: "Ready" | "Pending";
};

export const reportPayoutColumns: TableColumns<ReportPayout> = createColumns<ReportPayout>([
	{
		id: "select",
		header: "", // Usually the Select All logic is handled in the table or specific cell
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
		id: "kpiScore",
		accessorKey: "kpiScore",
		header: "KPI Score",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
	},
	{
		id: "basePay",
		accessorKey: "basePay",
		header: "Base Pay",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
	},
	{
		id: "bonuses",
		accessorKey: "bonuses",
		header: "Bonuses",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
	},
	{
		id: "deductions",
		accessorKey: "deductions",
		header: "Deductions",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-medium text-gray-600">{getValue() as string}</span>
		),
	},
	{
		id: "netPayout",
		accessorKey: "netPayout",
		header: "Net Payout",
		cell: ({ getValue }) => (
			<span className="text-[13px] font-bold text-gray-900">{getValue() as string}</span>
		),
	},
	{
		id: "status",
		accessorKey: "status",
		header: "Status",
		cell: ({ getValue }) => {
			const status = getValue() as string;
			return (
				<div
					className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${
						status === "Ready"
							? "bg-green-50 text-green-600"
							: "bg-orange-50 text-orange-600"
					}`}
				>
					{status}
				</div>
			);
		},
	},
]);
