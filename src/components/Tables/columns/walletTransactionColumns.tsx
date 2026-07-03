"use client";

import type { TransactionData } from "@/lib/requests/wallet";
import { createColumns } from "./columnFactory";
import type { TableColumns } from "./definitions";

export const walletTransactionColumns: TableColumns<TransactionData> =
	createColumns<TransactionData>([
		{
			id: "date",
			accessorKey: "createdAt",
			header: "Date",
			cell: ({ getValue }) => {
				const dateVal = getValue() as string;
				if (!dateVal) return <span className="text-gray-400">N/A</span>;
				const formatted = new Date(dateVal).toLocaleDateString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				});
				return <span className="text-[13px] font-medium text-gray-500">{formatted}</span>;
			},
		},
		{
			id: "type",
			accessorKey: "type",
			header: "Type",
			cell: ({ getValue, row }) => {
				const typeVal = (getValue() as string).toLowerCase();
				const { category } = row.original;
				const isCredit = typeVal === "credit";

				const badgeColor = isCredit
					? "bg-green-50 text-green-700 border-green-100"
					: "bg-red-50 text-red-700 border-red-100";

				return (
					<div className="flex flex-col gap-0.5">
						<span
							className={`inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}
						>
							{typeVal}
						</span>
						<span className="text-[11px] font-bold capitalize text-gray-400">
							{category.replace(/([A-Z])/g, " $1")}
						</span>
					</div>
				);
			},
		},
		{
			id: "description",
			accessorKey: "description",
			header: "Description",
			cell: ({ getValue }) => (
				<span className="line-clamp-1 text-[13px] font-bold text-gray-800">
					{getValue() as string}
				</span>
			),
		},
		{
			id: "amount",
			accessorKey: "amount",
			header: "Amount",
			cell: ({ getValue, row }) => {
				const amountVal = getValue() as number;
				const isCredit = row.original.type === "credit";
				const prefix = isCredit ? "+" : "-";
				const color = isCredit
					? "text-green-600 font-extrabold"
					: "text-gray-900 font-extrabold";

				return (
					<span className={`text-[14px] ${color}`}>
						{prefix}₦{amountVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
					</span>
				);
			},
		},
		{
			id: "status",
			accessorKey: "status",
			header: "Status",
			cell: ({ getValue }) => {
				const status = (getValue() as string).toLowerCase();
				let badgeClass = "bg-orange-50 text-orange-600 border border-orange-100";
				let statusLabel = "Pending";

				if (status === "completed" || status === "success") {
					badgeClass = "bg-green-50 text-green-600 border border-green-100";
					statusLabel = "Completed";
				} else if (status === "failed") {
					badgeClass = "bg-red-50 text-red-600 border border-red-100";
					statusLabel = "Failed";
				} else if (status === "reversed") {
					badgeClass = "bg-blue-50 text-blue-600 border border-blue-100";
					statusLabel = "Reverted";
				}

				return (
					<div
						className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badgeClass}`}
					>
						{statusLabel}
					</div>
				);
			},
		},
	]);
