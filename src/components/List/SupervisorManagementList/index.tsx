"use client";

import { useState } from "react";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import DynamicFilter from "@/components/_atoms/DynamicFilter";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { supervisorManagementColumns } from "@/components/Tables/columns/supervisorManagementColumns";
import {
	DUMMY_SUPERVISORS,
	TERRITORY_OPTIONS,
	STATUS_OPTIONS,
} from "@/constants/supervisorManagement";
import TableLayoutWrapper from "../TableLayoutWrapper";

export default function SupervisorManagementList() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedTerritory, setSelectedTerritory] = useState<string>();
	const [selectedStatus, setSelectedStatus] = useState<string>();

	const filterActions = (
		<div className="flex w-full flex-wrap items-center justify-between gap-4">
			<div className="flex flex-wrap items-center gap-3">
				<SearchBar
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					containerClassName="w-full lg:w-64"
				/>
				<div className="flex items-center gap-2">
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

			<div className="flex items-center gap-3">
				<Button className="h-11 w-full gap-2 rounded-xl border border-gray-200 bg-white px-6 text-[14px] font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 lg:w-auto">
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
			<Table columns={supervisorManagementColumns as any[]} data={DUMMY_SUPERVISORS} />
		</TableLayoutWrapper>
	);
}
