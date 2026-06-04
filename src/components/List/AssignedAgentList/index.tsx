"use client";

import React, { useState } from "react";
import Table from "@/components/Tables";
import { assignedAgentColumns } from "@/components/Tables/columns/assignedAgentColumns";
import Pagination from "@/components/_atoms/Pagination";
import type { UserProfileData } from "@/types/profile";

interface AssignedAgentListProps {
	agents: UserProfileData[];
}

export default function AssignedAgentList({ agents = [] }: AssignedAgentListProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const totalPages = Math.max(1, Math.ceil(agents.length / itemsPerPage));
	const paginatedAgents = agents.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	return (
		<>
			<Table
				columns={assignedAgentColumns}
				data={paginatedAgents}
				className="mt-4"
				emptyState={{
					title: "No Agents Assigned",
					description: "There are currently no agents assigned to this territory.",
					icon: "solar:users-group-two-rounded-bold-duotone",
				}}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				className="mt-4"
			/>
		</>
	);
}
