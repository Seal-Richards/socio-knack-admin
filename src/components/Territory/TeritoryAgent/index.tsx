"use client";

import React, { useState } from "react";
import SearchBar from "@/components/_atoms/SearchBar";
import AssignedAgentList from "@/components/List/AssignedAgentList";
import type { TerritoryData } from "@/types/territory";

interface TeritoryAgentProps {
	selectedZone: TerritoryData | null;
}

export default function TeritoryAgent({ selectedZone }: TeritoryAgentProps) {
	const [searchQuery, setSearchQuery] = useState("");

	if (!selectedZone) return null;

	const allAgents = selectedZone.assignedAgents || [];
	const filteredAgents = allAgents.filter((agent) => {
		const fullName = `${agent.firstName || ""} ${agent.lastName || ""}`.toLowerCase();
		const email = (agent.email || "").toLowerCase();
		const query = searchQuery.toLowerCase();
		return fullName.includes(query) || email.includes(query);
	});

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="text-lg font-black tracking-tight text-gray-900">Assigned Agent</h2>

			<div className="w-full flex-1">
				<SearchBar
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					containerClassName="w-full"
				/>
				<AssignedAgentList agents={filteredAgents} />
			</div>
		</div>
	);
}
