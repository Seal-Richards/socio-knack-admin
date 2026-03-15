"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Map from "@/components/Map";

// Mock data matching the UI directory
const AGENT_MOCK_DATA = [
	{
		id: 1,
		name: "Sharon C.",
		status: "Active",
		lastCheckIn: "5m ago @Total Ikeja",
		avatar: "/assets/images/admin-avatar.png",
		statusColor: "green",
	},
	{
		id: 2,
		name: "Adewole G.",
		status: "Idle",
		lastCheckIn: "4m ago @Mary Land",
		avatar: "/assets/images/admin-avatar.png",
		statusColor: "orange",
	},
	{
		id: 3,
		name: "Kolawole J.",
		status: "Active",
		lastCheckIn: "23m ago @Total Ikeja",
		avatar: "/assets/images/admin-avatar.png",
		statusColor: "green",
	},
	{
		id: 4,
		name: "Kelvin O.",
		status: "Idle",
		lastCheckIn: "14m ago @Total Ikeja",
		avatar: "/assets/images/admin-avatar.png",
		statusColor: "orange",
	},
];

export default function TerritoryAndTeam() {
	return (
		<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-10">
			<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">Personal Profile</h3>
			<div className="h-px w-full bg-gray-100" />

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
				{/* Left Column: Live Territory Map */}
				<div className="flex flex-col gap-4 rounded-[2rem] border border-gray-200 p-6 md:p-8">
					<h4 className="text-[16px] font-bold text-gray-800 sm:text-[18px]">
						Live Territory Map
					</h4>
					<div className="relative min-h-[300px] w-full flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
						<Map className="size-full" />
					</div>
				</div>

				{/* Right Column: Agent Directory */}
				<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-200 p-6 md:p-8">
					<h4 className="text-[16px] font-bold text-gray-800 sm:text-[18px]">
						Agent Directory
					</h4>

					{/* Search */}
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
							<Icon icon="solar:magnifer-linear" className="size-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Search"
							aria-label="Search agents"
							className="h-12 w-full rounded-xl border border-gray-100 bg-white pl-11 pr-4 text-[13px] font-medium text-gray-700 placeholder:text-gray-400 focus:border-[#1d4ea8] focus:outline-none focus:ring-1 focus:ring-[#1d4ea8]/20"
						/>
					</div>

					{/* Custom Table/List */}
					<div className="mt-2 flex w-full flex-col gap-4">
						{/* Header row */}
						<div className="grid grid-cols-12 gap-2 border-b border-gray-100 pb-3 text-[12px] font-medium text-gray-500">
							<div className="col-span-4">Agent Name</div>
							<div className="col-span-3">Status</div>
							<div className="col-span-5">Last Check-in</div>
						</div>

						{/* Items */}
						<div className="custom-scrollbar flex max-h-[250px] flex-col gap-4 overflow-y-auto pr-2">
							{AGENT_MOCK_DATA.map((agent) => (
								<div
									key={agent.id}
									className="grid grid-cols-12 items-center gap-2 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
								>
									<div className="col-span-4 flex items-center gap-2">
										<div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-gray-100">
											<Image
												src={agent.avatar}
												alt={agent.name}
												fill
												className="object-cover"
											/>
										</div>
										<span className="truncate text-[13px] font-bold text-gray-800">
											{agent.name}
										</span>
									</div>
									<div className="col-span-3 flex items-center gap-1.5">
										<div
											className={`size-1.5 shrink-0 rounded-full ${agent.statusColor === "green" ? "bg-green-500" : "bg-orange-500"}`}
										/>
										<span className="text-[13px] font-medium text-gray-700">
											{agent.status}
										</span>
									</div>
									<div className="col-span-4 truncate text-[12px] font-medium text-gray-500">
										{agent.lastCheckIn}
									</div>
									<div className="col-span-1 flex justify-end">
										<button className="flex size-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
											<Icon icon="pepicons-pop:dots-y" className="size-5" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
