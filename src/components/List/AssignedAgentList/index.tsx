"use client";

import React, { useState } from "react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import Table from "@/components/Tables";
import { type ColumnDef } from "@tanstack/react-table";
import Pagination from "@/components/_atoms/Pagination";

interface Agent {
	id: string;
	name: string;
	avatar: string;
	status: "Active" | "Idle";
	lastCheckIn: string;
}

const agents: Agent[] = [
	{
		id: "1",
		name: "Sharon C.",
		avatar: "/assets/images/admin-avatar.png",
		status: "Active",
		lastCheckIn: "5m ago @Total Ikeja",
	},
	{
		id: "2",
		name: "Adewole G.",
		avatar: "/assets/images/admin-avatar.png",
		status: "Idle",
		lastCheckIn: "4m ago @Mary Land",
	},
	{
		id: "3",
		name: "Kolawole J.",
		avatar: "/assets/images/admin-avatar.png",
		status: "Active",
		lastCheckIn: "23m ago @Total Ikeja",
	},
	{
		id: "4",
		name: "Kelvin O.",
		avatar: "/assets/images/admin-avatar.png",
		status: "Idle",
		lastCheckIn: "14m ago @Total Ikeja",
	},
];

const columns: ColumnDef<Agent>[] = [
	{
		accessorKey: "name",
		header: "Agent Name",
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<DynamicAvatar
					name={row.original.name}
					image={row.original.avatar}
					className="size-8 shrink-0 rounded-full"
				/>
				<span className="text-[13px] font-bold text-gray-700">{row.original.name}</span>
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div
					className={`size-2 rounded-full ${
						row.original.status === "Active" ? "bg-[#10b981]" : "bg-[#f59e0b]"
					}`}
				/>
				<span className="text-[13px] font-medium text-gray-600">{row.original.status}</span>
			</div>
		),
	},
	{
		accessorKey: "lastCheckIn",
		header: "Last Check-in",
		cell: ({ row }) => (
			<span className="text-[13px] font-medium text-gray-500">
				{row.original.lastCheckIn}
			</span>
		),
	},
];

export default function AssignedAgentList() {
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
				columns={columns}
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
