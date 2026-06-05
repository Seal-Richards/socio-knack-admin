"use client";

import { useState } from "react";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import DynamicFilter from "@/components/_atoms/DynamicFilter";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
	agentManagementColumns,
	type Agent,
} from "@/components/Tables/columns/agentManagementColumns";
import { STATUS_OPTIONS } from "@/constants/agentManagement";
import { useGetAgents } from "@/hooks/useAgent";
import { useGetTerritories } from "@/hooks/useTerritory";
import Pagination from "@/components/_atoms/Pagination";
import TableLayoutWrapper from "../TableLayoutWrapper";

export default function AgentManagementList() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedTerritory, setSelectedTerritory] = useState<string>();
	const [selectedStatus, setSelectedStatus] = useState<string>();
	const [sortBy, setSortBy] = useState<"all" | "az">("all");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const { data: agentsRes, isLoading: loadingAgents } = useGetAgents();
	const { data: territoriesRes, isLoading: loadingTerritories } = useGetTerritories();

	const isLoading = loadingAgents || loadingTerritories;
	const territories = territoriesRes?.data || [];

	const formattedAgents: Agent[] = (agentsRes?.data || []).map((agent) => {
		const name = `${agent.firstName || ""} ${agent.lastName || ""}`.trim();

		// Calculate zones from territories list
		const agentId = agent._id || agent.id;
		const agentTerritories = territories.filter((t) =>
			t.assignedAgents?.some((a) => (a._id || a.id) === agentId),
		);

		let territory = "Unassigned";
		if (agentTerritories.length === 1) {
			territory = agentTerritories[0]?.name || "Unnamed Zone";
		} else if (agentTerritories.length > 1) {
			territory = `${agentTerritories.length} Zones`;
		}

		// Formatted last activity date
		let lastActivity = "No activity yet";
		if (agent.updatedAt) {
			const d = new Date(agent.updatedAt);
			lastActivity = `${d.toLocaleDateString("en-US", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			})} | ${d.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			})}`;
		}

		return {
			id: agentId,
			name,
			email: agent.email || "",
			territory,
			isOnline: agent.isOnline || false,
			profileStatus: agent.status || "pending",
			lastActivity,
			avatar: agent.avatar || "/assets/images/admin-avatar.png",
		};
	});

	// Filter agents
	let filteredTeam = formattedAgents.filter((u) => {
		const matchesSearch =
			u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			u.email.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			!selectedStatus ||
			selectedStatus === "all" ||
			u.profileStatus.toLowerCase() === selectedStatus.toLowerCase();

		// Find actual territories this agent is assigned to for matching
		const agentId = u.id;
		const agentTerrs = territories.filter((t) =>
			t.assignedAgents?.some((a) => (a._id || a.id) === agentId),
		);

		const matchesTerritory =
			!selectedTerritory ||
			selectedTerritory === "all" ||
			(selectedTerritory === "Unassigned" && agentTerrs.length === 0) ||
			agentTerrs.some((t) => t.name.toLowerCase() === selectedTerritory.toLowerCase());

		return matchesSearch && matchesStatus && matchesTerritory;
	});

	// Handle Alphabetical sorting
	if (sortBy === "az") {
		filteredTeam = [...filteredTeam].sort((a, b) => a.name.localeCompare(b.name));
	}

	// Dynamically build territory list from territories API list
	const territoryOptions = [
		{ label: "All Territories", value: "all" },
		...territories.map((t) => ({ label: t.name, value: t.name })),
		{ label: "Unassigned", value: "Unassigned" },
	];

	// Pagination Math
	const totalPages = Math.max(1, Math.ceil(filteredTeam.length / itemsPerPage));
	const paginatedTeam = filteredTeam.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	// Helper status/territory selection to reset page counter to 1
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	const handleTerritorySelect = (val?: string) => {
		setSelectedTerritory(val);
		setCurrentPage(1);
	};

	const handleStatusSelect = (val?: string) => {
		setSelectedStatus(val);
		setCurrentPage(1);
	};

	const filterActions = (
		<div className="flex w-full flex-wrap items-center justify-between gap-4">
			<div className="flex flex-wrap items-center gap-3">
				<SearchBar
					placeholder="Search"
					value={searchQuery}
					onChange={handleSearchChange}
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
						<button
							onClick={() => setSortBy("all")}
							className={`h-10 px-4 text-[13px] font-bold ${sortBy === "all" ? "bg-[#1d4ea8] text-white" : "text-gray-500 hover:bg-gray-50"}`}
						>
							All
						</button>
						<button
							onClick={() => setSortBy("az")}
							className={`h-10 border-l border-gray-100 px-4 text-[13px] font-bold ${sortBy === "az" ? "bg-[#1d4ea8] text-white" : "text-gray-500 hover:bg-gray-50"}`}
						>
							A-Z
						</button>
					</div>
					<DynamicFilter
						label="Territory"
						options={territoryOptions}
						selected={selectedTerritory}
						onSelect={handleTerritorySelect}
						className="shrink-0"
					/>
					<DynamicFilter
						label="Status"
						options={STATUS_OPTIONS}
						selected={selectedStatus}
						onSelect={handleStatusSelect}
						className="shrink-0"
					/>
				</div>
			</div>

			<Button className="h-11 w-full gap-2 rounded-xl bg-[#1d4ea8] px-6 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 lg:w-auto">
				<Icon icon="solar:export-bold" className="size-4 text-white" />
				Export
			</Button>
		</div>
	);

	return (
		<TableLayoutWrapper
			title=""
			filters={filterActions}
			className="gap-0" // Remove standard gap since slots handle header
		>
			{isLoading ? (
				<div className="flex h-40 items-center justify-center">
					<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
				</div>
			) : (
				<>
					<Table
						columns={agentManagementColumns as any[]}
						data={paginatedTeam}
						emptyState={{
							title: "No Agents Found",
							description: "There are currently no agents matching your filters.",
							icon: "solar:user-speak-bold-duotone",
						}}
					/>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
						className="mt-4"
					/>
				</>
			)}
		</TableLayoutWrapper>
	);
}
