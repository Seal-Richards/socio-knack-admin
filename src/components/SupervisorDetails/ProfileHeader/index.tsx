"use client";

import React from "react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { Icon } from "@iconify/react";

interface ProfileHeaderProps {
	supervisor: {
		name: string;
		role: string;
		status: string;
		email: string;
		phone: string;
		address: string;
		avatar: string;
		directReports: number;
		assignedZones: string;
		memberSince: string;
	};
}

export default function ProfileHeader({ supervisor }: ProfileHeaderProps) {
	return (
		<div className="flex flex-col gap-6 lg:gap-8">
			{/* Top Bar: Basic Info */}
			<div className="flex flex-col items-start gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:gap-6 md:p-10">
				<DynamicAvatar
					name={supervisor.name}
					image={supervisor.avatar}
					className="size-[4.5rem] shrink-0 rounded-full border-4 border-white shadow-md sm:size-[5.5rem]"
				/>
				<div className="flex w-full flex-col gap-3 sm:gap-2">
					<div className="flex flex-wrap items-center gap-2 sm:gap-4">
						<h1 className="text-[18px] font-bold text-gray-800 sm:text-[20px]">
							{supervisor.name}
						</h1>
						<div className="flex flex-wrap items-center gap-2 border-gray-200 sm:gap-4 sm:border-l sm:pl-4">
							<span className="text-[13px] font-medium text-gray-500">
								{supervisor.role}
							</span>
							<div className="flex items-center gap-2 border-l border-gray-200 pl-2 sm:pl-4">
								<span
									className={`rounded-full px-3 py-1 text-[11px] font-bold capitalize ${
										supervisor.status === "active"
											? "bg-green-50 text-green-600"
											: "bg-orange-50 text-orange-600"
									}`}
								>
									{supervisor.status}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 sm:gap-6">
						<div className="flex items-center gap-2">
							<Icon
								icon="solar:letter-bold-duotone"
								className="size-4 text-gray-400"
							/>
							{supervisor.email}
						</div>
						<div className="flex items-center gap-2">
							<Icon
								icon="solar:phone-bold-duotone"
								className="size-4 text-gray-400"
							/>
							{supervisor.phone}
						</div>
						<div className="flex items-center gap-2">
							<Icon
								icon="solar:map-point-bold-duotone"
								className="size-4 text-gray-400"
							/>
							{supervisor.address}
						</div>
					</div>
				</div>
			</div>

			{/* Metric Cards */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
				{/* My Agents */}
				<div className="flex flex-col gap-2 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md lg:p-8">
					<span className="text-[14px] font-medium text-gray-600">My Agents</span>
					<div className="text-[28px] font-black tracking-tight text-gray-900 lg:text-[32px]">
						{supervisor.directReports}
					</div>
				</div>

				{/* Assigned Zones */}
				<div className="flex flex-col gap-2 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md lg:p-8">
					<span className="text-[14px] font-medium text-gray-600">Assigned Zones</span>
					<div className="text-[20px] font-bold leading-tight tracking-tight text-gray-900 lg:text-[24px]">
						{supervisor.assignedZones}
					</div>
				</div>

				{/* Member Since */}
				<div className="flex flex-col gap-2 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md lg:p-8">
					<span className="text-[14px] font-medium text-gray-600">Member Since</span>
					<div className="text-[20px] font-bold leading-tight tracking-tight text-gray-900 lg:text-[24px]">
						{supervisor.memberSince}
					</div>
				</div>
			</div>
		</div>
	);
}
