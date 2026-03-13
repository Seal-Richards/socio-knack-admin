"use client";

import React, { useState } from "react";
import Table from "@/components/Tables";
import SearchBar from "@/components/_atoms/SearchBar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
	accessManagementColumns,
	type AccessManagementData,
} from "@/components/Tables/columns/accessManagementColumns";
import InviteTeamModal from "@/components/_modals/InviteTeamModal";

import DynamicFilter from "@/components/_atoms/DynamicFilter";

const mockData: AccessManagementData[] = [
	{
		id: 1,
		name: "Victor Kenny",
		email: "designbyprose@gmail.com",
		location: "Lagos Mainland",
		role: "Super Admin",
		status: "Active",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: 2,
		name: "Victor Kenny",
		email: "designbyprose@gmail.com",
		location: "Lagos Mainland",
		role: "Finance Officer",
		status: "Active",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: 3,
		name: "Anabel John",
		email: "anajohn@gmail.com",
		location: "Lagos Mainland",
		role: "Supervisor",
		status: "Active",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: 4,
		name: "Grace Praise",
		email: "gracepraise@gmail.com",
		location: "Lagos Mainland",
		role: "Region Manager",
		status: "Active",
		avatar: "/assets/images/admin-avatar.png",
	},
];

export default function AccessManagementList() {
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterType, setFilterType] = useState("all");

	return (
		<div className="flex flex-col gap-6">
			<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<div className="mb-10 flex flex-wrap items-center justify-between gap-6">
					<h3 className="text-[17px] font-bold text-gray-800">
						Team Access & Permissions
					</h3>
					<div className="flex flex-wrap items-center gap-4">
						<SearchBar
							placeholder="Search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							containerClassName="w-64 h-12"
						/>
						<div className="flex items-center gap-2 rounded-xl border border-gray-100 p-1">
							<button className="flex size-10 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-gray-50">
								<Icon icon="solar:filter-bold" className="size-5" />
							</button>
						</div>
						<div className="flex items-center gap-1.5 rounded-xl border border-gray-100 p-1">
							<button
								onClick={() => setFilterType("all")}
								className={`h-9 rounded-lg px-4 text-[13px] font-bold transition-all ${
									filterType === "all"
										? "bg-[#1d4ea8] text-white shadow-md"
										: "text-gray-500 hover:bg-gray-50"
								}`}
							>
								All
							</button>
							<button
								onClick={() => setFilterType("az")}
								className={`h-9 rounded-lg px-4 text-[13px] font-bold transition-all ${
									filterType === "az"
										? "bg-[#1d4ea8] text-white shadow-md"
										: "text-gray-500 hover:bg-gray-50"
								}`}
							>
								A-Z
							</button>
						</div>
						<DynamicFilter
							label="Status"
							options={[
								{ label: "Active", value: "active" },
								{ label: "Inactive", value: "inactive" },
							]}
							className="h-11 border-gray-100"
						/>
						<DynamicFilter
							label="Role"
							options={[
								{ label: "Admin", value: "admin" },
								{ label: "Supervisor", value: "supervisor" },
							]}
							className="h-11 border-gray-100"
						/>
						<Button
							onClick={() => setIsInviteModalOpen(true)}
							className="h-11 gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-6 text-[13px] font-bold text-[#1d4ea8] shadow-none transition-all hover:bg-blue-50 active:scale-95"
						>
							<Icon icon="lucide:plus-circle" className="size-4" />
							Invite Team Member
						</Button>
					</div>
				</div>

				<div className="overflow-hidden">
					<Table columns={accessManagementColumns} data={mockData} />
				</div>
			</div>

			<InviteTeamModal
				isOpen={isInviteModalOpen}
				onClose={() => setIsInviteModalOpen(false)}
			/>
		</div>
	);
}
