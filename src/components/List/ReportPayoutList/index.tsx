"use client";

import React, { useState } from "react";
import TableLayoutWrapper from "@/components/List/TableLayoutWrapper";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import { Icon } from "@iconify/react";
import {
	reportPayoutColumns,
	type ReportPayout,
} from "@/components/Tables/columns/reportPayoutColumns";

const mockData: ReportPayout[] = [
	{
		id: "1",
		agentName: "Kolawole James",
		territory: "Yaba Zone",
		kpiScore: "75%",
		basePay: "₦15,000",
		bonuses: "₦2,000",
		deductions: "NO",
		netPayout: "₦17,000",
		status: "Ready",
	},
	{
		id: "2",
		agentName: "Adewole Grace",
		territory: "Ikeja Zone",
		kpiScore: "65%",
		basePay: "₦15,000",
		bonuses: "₦800",
		deductions: "NO",
		netPayout: "₦15,800",
		status: "Pending",
	},
];

export default function ReportPayoutList() {
	const [searchQuery, setSearchQuery] = useState("");
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

	const selectedCount = Object.keys(rowSelection).filter((key) => rowSelection[key]).length;

	const filterActions = (
		<div className="flex w-full flex-wrap items-center justify-between gap-4">
			<div className="flex flex-wrap items-center gap-3">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 p-0 text-gray-400">
					<Icon icon="lucide:sliders-horizontal" className="size-5" />
				</div>
				<SearchBar
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					containerClassName="w-full lg:w-96"
				/>
			</div>
		</div>
	);

	return (
		<TableLayoutWrapper title="" filters={filterActions} className="gap-0">
			<Table
				columns={reportPayoutColumns as any[]}
				data={mockData}
				onRowSelectionChange={setRowSelection}
				emptyState={{
					title: "No Payouts to Report",
					description: "There are currently no agent payouts requiring approval.",
					icon: "solar:wad-of-money-bold-duotone",
				}}
			/>

			{selectedCount > 0 && (
				<div className="animate-in fade-in slide-in-from-bottom-4 mt-8 flex items-center justify-between border-t border-gray-50 pt-8 duration-300">
					<div className="flex flex-col gap-1">
						<p className="text-[17px] font-black text-gray-900">
							{selectedCount} Agents selected | Total to be paid: ₦
							{(selectedCount * 2409).toLocaleString()}
						</p>
						<p className="text-sm font-medium text-gray-500">
							You are about to authorize payment to {selectedCount} agent
							{selectedCount > 1 ? "s" : ""}.
						</p>
					</div>
					<button className="rounded-xl bg-[#10b981] px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
						Approve & Execute Payout
					</button>
				</div>
			)}
		</TableLayoutWrapper>
	);
}
