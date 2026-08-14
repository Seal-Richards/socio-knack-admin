"use client";

import React, { useState } from "react";
import TableLayoutWrapper from "@/components/List/TableLayoutWrapper";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import { Icon } from "@iconify/react";
import { reportPayoutColumns } from "@/components/Tables/columns/reportPayoutColumns";
import Pagination from "@/components/_atoms/Pagination";
import { useGetReportsPayoutList } from "@/hooks/useReportsPayout";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { type DateRange } from "react-day-picker";

const PAYOUT_TABS = [
	{ id: "All", label: "All" },
	{ id: "Pending", label: "Pending" },
	{ id: "Paid", label: "Paid" },
	{ id: "Approved", label: "Approved" },
	{ id: "Rejected", label: "Rejected" },
	{ id: "Cancelled", label: "Cancelled" },
];

export default function ReportPayoutList() {
	const { data: listRes, isLoading } = useGetReportsPayoutList();
	const payouts = listRes?.data || [];

	const [activeTab, setActiveTab] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		setCurrentPage(1);
		setRowSelection({});
	};

	const [date, setDate] = useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});

	const selectedCount = Object.keys(rowSelection).filter((key) => rowSelection[key]).length;

	// Filter data by search query, date range, and active status tab
	const filteredData = payouts.filter((item) => {
		const matchesSearch =
			item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());

		if (!matchesSearch) return false;

		if (date?.from && item.date) {
			const itemDate = new Date(item.date);
			const start = startOfDay(date.from);
			const end = date.to ? endOfDay(date.to) : endOfDay(date.from);
			if (!isWithinInterval(itemDate, { start, end })) return false;
		}

		if (activeTab !== "All") {
			if (activeTab.toLowerCase() !== item.status.toLowerCase()) {
				return false;
			}
		}

		return true;
	});

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

	const getDateLabel = () => {
		if (!date?.from) {
			return <span className="text-gray-400">Filter by Date</span>;
		}
		if (date.to) {
			return (
				<span>
					{format(date.from, "LLL dd, yyyy")} - {format(date.to, "LLL dd, yyyy")}
				</span>
			);
		}
		return <span>{format(date.from, "LLL dd, yyyy")}</span>;
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
					containerClassName="w-full lg:w-80"
				/>
				<Popover>
					<PopoverTrigger asChild>
						<button
							type="button"
							className="flex h-11 items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none"
						>
							<Icon icon="lucide:calendar" className="size-4 text-gray-400" />
							{getDateLabel()}
							{date?.from ? (
								<button
									type="button"
									aria-label="Clear date filter"
									onClick={(e) => {
										e.stopPropagation();
										setDate(undefined);
									}}
									className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
								>
									<Icon icon="lucide:x" className="size-3.5" />
								</button>
							) : (
								<Icon icon="lucide:chevron-down" className="size-4 text-gray-400" />
							)}
						</button>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto rounded-2xl border border-gray-100 bg-white p-0 shadow-lg"
						align="start"
					>
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={setDate}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>
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
			<div className="mb-6 flex w-full overflow-hidden rounded-[2rem] bg-gray-50/50 p-2 lg:w-fit">
				{PAYOUT_TABS.map((tab) => {
					const isActive = activeTab === tab.id;
					return (
						<button
							key={tab.id}
							type="button"
							onClick={() => handleTabChange(tab.id)}
							className={`flex h-10 min-w-28 items-center justify-center rounded-3xl text-[13px] font-bold transition-all duration-200 ${
								isActive
									? "bg-white text-[#1d4ea8] shadow-sm"
									: "text-gray-400 hover:text-gray-600"
							}`}
						>
							{tab.label}
						</button>
					);
				})}
			</div>

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
