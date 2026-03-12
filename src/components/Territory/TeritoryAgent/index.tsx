"use client";

import React from "react";
import SearchBar from "@/components/_atoms/SearchBar";
import AssignedAgentList from "@/components/List/AssignedAgentList";

export default function TeritoryAgent() {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-lg font-black tracking-tight text-gray-900">Assigned Agent</h2>

			<div className="flex-1">
				<SearchBar placeholder="Search" containerClassName="w-full" />
				<AssignedAgentList />
			</div>
		</div>
	);
}
