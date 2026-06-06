"use client";

import React, { useState } from "react";
import TableLayoutWrapper from "@/components/List/TableLayoutWrapper";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import { Icon } from "@iconify/react";
import { reportPayoutColumns } from "@/components/Tables/columns/reportPayoutColumns";
import Pagination from "@/components/_atoms/Pagination";
import { useGetReportsPayoutList } from "@/hooks/useReportsPayout";

export default function ReportPayoutList() {
	const { data: listRes, isLoading } = useGetReportsPayoutList();
	const payouts = listRes?.data || [];

	const [searchQuery, setSearchQuery] = useState("");
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const selectedCount = Object.keys(rowSelection).filter((key) => rowSelection[key]).length;

	// Filter data
	const filteredData = payouts.filter(
		(item) =>
			item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// Pagination Math
	const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
	const paginatedPayouts = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	// Calculate total incentive to be paid for selected rows
	const selectedTotal = Object.keys(rowSelection).reduce((sum, key) => {
		if (rowSelection[key]) {
			const index = parseInt(key, 10);
			const item = paginatedPayouts[index];
			if (item) {
				const amountNum = parseFloat(item.incentiveAmount.replace(/[^\d.]/g, "")) || 0;
				return sum + amountNum;
			}
		}
		return sum;
	}, 0);

	// Reset page counter
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
		setRowSelection({}); // reset row selection on search
	};

	const filterActions = (
		<div className="flex w-full flex-wrap items-center justify-between gap-4">
			<div className="flex flex-wrap items-center gap-3">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 p-0 text-gray-400">
					<Icon icon="lucide:sliders-horizontal" className="size-5" />
				</div>
				<SearchBar
					placeholder="Search"
					value={searchQuery}
					onChange={handleSearchChange}
					containerClassName="w-full lg:w-96"
				/>
			</div>
		</div>
	);

	if (isLoading) {
		return (
			<div className="flex h-32 items-center justify-center rounded-3xl bg-white p-6 shadow-sm">
				<div className="size-6 animate-spin rounded-full border-2 border-[#1d4ea8] border-t-transparent" />
			</div>
		);
	}

	return (
		<TableLayoutWrapper title="" filters={filterActions} className="gap-0">
			<Table
				columns={reportPayoutColumns as any[]}
				data={paginatedPayouts}
				onRowSelectionChange={setRowSelection}
				emptyState={{
					title: "No Payouts to Report",
					description: "There are currently no agent payouts requiring approval.",
					icon: "solar:wad-of-money-bold-duotone",
				}}
			/>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				className="mt-4"
			/>

			{selectedCount > 0 && (
				<div className="animate-in fade-in slide-in-from-bottom-4 mt-8 flex items-center justify-between border-t border-gray-50 pt-8 duration-300">
					<div className="flex flex-col gap-1">
						<p className="text-[17px] font-black text-gray-900">
							{selectedCount} Agent{selectedCount > 1 ? "s" : ""} selected | Total to
							be paid: ₦
							{selectedTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
