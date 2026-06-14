"use client";

import React from "react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { formatCheckInDate } from "@/utils/dateFormatter";
import type { UserProfileData } from "@/types/profile";
import { createColumns } from "./columnFactory";
import type { TableColumns } from "./definitions";

export const assignedAgentColumns: TableColumns<UserProfileData> = createColumns<UserProfileData>([
	{
		id: "name",
		header: "Agent Name",
		cell: ({ row }) => {
			const agent = row.original;
			const fullName =
				`${agent.firstName || ""} ${agent.lastName || ""}`.trim() || agent.email || "";
			return (
				<div className="flex items-center gap-3">
					<DynamicAvatar
						name={fullName}
						image={agent.avatar}
						className="size-8 shrink-0 rounded-full"
					/>
					<span className="text-[13px] font-bold text-gray-700">{fullName}</span>
				</div>
			);
		},
	},
	{
		id: "isOnline",
		header: "Status",
		accessorKey: "isOnline",
		cell: ({ row }) => {
			const agent = row.original;
			const isOnline = agent.isOnline || false;
			const statusLabel = isOnline ? "Online" : "Offline";
			return (
				<div className="flex items-center gap-2">
					<div
						className={`size-2 rounded-full ${
							isOnline ? "bg-[#10b981]" : "bg-red-500"
						}`}
					/>
					<span className="text-[13px] font-medium text-gray-600">{statusLabel}</span>
				</div>
			);
		},
	},
	{
		id: "lastCheckInTime",
		header: "Last Check-in",
		accessorKey: "lastCheckInTime",
		cell: ({ row }) => {
			const agent = row.original;
			const checkInText = formatCheckInDate(agent.lastCheckInTime || agent.lastCheckIn);

			return <span className="text-[13px] font-medium text-gray-500">{checkInText}</span>;
		},
	},
]);
