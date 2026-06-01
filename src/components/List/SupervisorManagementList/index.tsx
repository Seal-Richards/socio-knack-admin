"use client";

import { useState } from "react";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import DynamicFilter from "@/components/_atoms/DynamicFilter";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { supervisorManagementColumns } from "@/components/Tables/columns/supervisorManagementColumns";
import { TERRITORY_OPTIONS, STATUS_OPTIONS } from "@/constants/supervisorManagement";
import { useGetSupervisors } from "@/hooks/useTeam";
import TableLayoutWrapper from "../TableLayoutWrapper";

export default function SupervisorManagementList() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedTerritory, setSelectedTerritory] = useState<string>();
	const [selectedStatus, setSelectedStatus] = useState<string>();

	// Fetch real supervisors list from backend using React Query
	const { data: supervisorsRes, isLoading } = useGetSupervisors();

	// Map backend data to Table column definitions
	const supervisors = (supervisorsRes?.data ?? []).map((s) => ({
		id: s.id,
		name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
		email: s.email || "",
		territory: "Unassigned",
		agentCount: 0,
		complianceScore: "100%",
		lastActivity: s.status === "active" ? "Active Now" : "Inactive",
		avatar: s.avatar ?? "/assets/images/admin-avatar.png",
		status: s.status ?? "pending",
	}));

	// Perform client-side search & filters
	const filteredSupervisors = supervisors.filter((s) => {
		const matchesSearch =
			s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			s.email.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesTerritory =
			!selectedTerritory ||
			selectedTerritory === "all" ||
			s.territory.toLowerCase() === selectedTerritory.toLowerCase() ||
			(selectedTerritory === "yaba" && s.territory.toLowerCase().includes("yaba")) ||
			(selectedTerritory === "ikeja" && s.territory.toLowerCase().includes("ikeja"));

		const matchesStatus =
			!selectedStatus ||
			selectedStatus === "all" ||
			s.status.toLowerCase() === selectedStatus.toLowerCase();

		return matchesSearch && matchesTerritory && matchesStatus;
	});

	const filterActions = (
		<div className="flex w-full flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
			<div className="flex w-full flex-col gap-4 xl:w-auto xl:flex-row xl:items-center">
				<SearchBar
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					containerClassName="w-full xl:w-64"
				/>
				<div className="flex w-full flex-wrap items-center gap-3 xl:w-auto">
					<Button
						variant="ghost"
						className="size-10 shrink-0 rounded-xl border border-gray-100 p-0 hover:bg-gray-50"
					>
						<Icon icon="solar:tuning-bold-duotone" className="size-5 text-[#1d4ea8]" />
					</Button>
					<div className="flex items-center overflow-hidden rounded-xl border border-gray-100 bg-white">
						<button className="h-10 bg-[#1d4ea8] px-4 text-[13px] font-bold text-white">
							All
						</button>
						<button className="h-10 border-l border-gray-100 px-4 text-[13px] font-bold text-gray-500 hover:bg-gray-50">
							A-Z
						</button>
					</div>
					<DynamicFilter
						label="Territory"
						options={TERRITORY_OPTIONS}
						selected={selectedTerritory}
						onSelect={setSelectedTerritory}
						className="shrink-0"
					/>
					<DynamicFilter
						label="Status"
						options={STATUS_OPTIONS}
						selected={selectedStatus}
						onSelect={setSelectedStatus}
						className="shrink-0"
					/>
				</div>
			</div>

			<div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center xl:w-auto">
				<Button className="h-11 w-full gap-2 rounded-xl border border-gray-200 bg-white px-6 text-[14px] font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 sm:w-auto">
					<Icon icon="solar:user-plus-bold" className="size-4 text-gray-500" />
					Bulk Invite via CSV
				</Button>
				<Button className="h-11 w-full gap-2 rounded-xl bg-[#1d4ea8] px-6 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 lg:w-auto">
					<Icon icon="solar:export-bold" className="size-4 text-white" />
					Export Active List
				</Button>
			</div>
		</div>
	);

	return (
		<TableLayoutWrapper title="" filters={filterActions} className="gap-0">
			{isLoading ? (
				<div className="flex h-40 items-center justify-center rounded-[2.5rem] bg-white">
					<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
				</div>
			) : (
				<Table
					columns={supervisorManagementColumns}
					data={filteredSupervisors}
					emptyState={{
						title: "No Supervisors Found",
						description:
							"We couldn't find any supervisors matching your search criteria.",
						icon: "solar:user-id-bold-duotone",
					}}
				/>
			)}
		</TableLayoutWrapper>
	);
}
