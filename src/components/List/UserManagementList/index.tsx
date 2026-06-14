"use client";

import React, { useState } from "react";
import TableLayoutWrapper from "@/components/List/TableLayoutWrapper";
import Table from "@/components/Tables";
import { useGetStaff } from "@/hooks/useTeam";
import {
	userManagementColumns,
	type UserManagementData,
} from "@/components/Tables/columns/userManagementColumns";
import Pagination from "@/components/_atoms/Pagination";

export default function UserManagementList() {
	const [, setRowSelection] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const { data: staffRes, isLoading } = useGetStaff();
	const rawStaff = staffRes?.data || [];

	const mappedUsers: UserManagementData[] = rawStaff.map((user) => ({
		id: user.id || user._id || "",
		name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
		mail: user.email,
		activityType: user.position || "Staff Member",
		status: user.status === "active" || user.isVerified ? "Active" : "Inactive",
		stamp: user.createdAt
			? new Date(user.createdAt).toLocaleString("en-US", {
					day: "2-digit",
					month: "short",
					year: "numeric",
					hour: "numeric",
					minute: "2-digit",
					hour12: true,
				})
			: "N/A",
		avatar: user.avatar || "/assets/images/admin-avatar.png",
	}));

	// Pagination Math
	const totalPages = Math.max(1, Math.ceil(mappedUsers.length / itemsPerPage));
	const paginatedUsers = mappedUsers.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	return (
		<TableLayoutWrapper
			title=""
			filters={
				<div className="flex w-full items-center justify-end">
					{/* <Button className="h-11 gap-2 rounded-xl bg-[#1e288e] px-6 text-[14px] font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95">
						<Icon icon="solar:export-bold" className="size-4" />
						Export Activity
					</Button> */}
				</div>
			}
			className="gap-0"
		>
			{isLoading ? (
				<div className="flex h-40 items-center justify-center rounded-[2.5rem] bg-white">
					<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
				</div>
			) : (
				<>
					<Table
						columns={userManagementColumns as any[]}
						data={paginatedUsers}
						onRowSelectionChange={setRowSelection}
						emptyState={{
							title: "No Users Found",
							description: "There are currently no users found in the system.",
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
			)}
		</TableLayoutWrapper>
	);
}
