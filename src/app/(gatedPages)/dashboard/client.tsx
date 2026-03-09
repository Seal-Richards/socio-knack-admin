"use client";

import { useState } from "react";
import RouteWrapper from "@/layouts/RouteWrapper";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import MetricCard from "@/components/_widgets/MetricCard";
import Tabs from "@/components/Tabs";
import Table from "@/components/Tables";
import TaskList from "@/components/List/TaskList";
import { DASHBOARD_METRICS, ONGOING_TASKS, AGENT_LIST } from "@/constants/dashboard";
import Image from "next/image";

export default function DashboardClient() {
	const [activeTab, setActiveTab] = useState("Ongoing");

	const taskTabs = [
		{ id: "Ongoing", label: "Ongoing" },
		{ id: "Today", label: "Today" },
		{ id: "Upcoming", label: "Upcoming" },
		{ id: "Completed", label: "Completed" },
		{ id: "Missed", label: "Missed" },
	];

	const agentColumns = [
		{
			header: "Agent Name",
			accessor: "name",
			render: (row: Record<string, any>) => (
				<div className="flex items-center gap-2.5">
					<div className="relative size-8 overflow-hidden rounded-full border border-gray-100">
						<Image
							src={row.avatar as string}
							alt={row.name as string}
							fill
							className="object-cover"
						/>
					</div>
					<span className="font-bold text-gray-700">{row.name as string}</span>
				</div>
			),
		},
		{
			header: "Status",
			accessor: "status",
			render: (row: Record<string, any>) => (
				<div className="flex items-center gap-2">
					<div
						className={`size-2 rounded-full ${row.status === "Active" ? "bg-green-500" : "bg-orange-400"}`}
					/>
					<span className="text-[13px] font-bold text-gray-600">
						{row.status as string}
					</span>
				</div>
			),
		},
		{
			header: "Last Check-in",
			accessor: "lastCheckIn",
			render: (row: Record<string, any>) => (
				<span className="text-[13px] font-bold text-gray-400">
					{row.lastCheckIn as string}
				</span>
			),
		},
	];

	return (
		<RouteWrapper>
			<div className="flex w-full flex-col gap-10 p-2">
				{/* Welcome Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<h1 className="text-3xl font-black tracking-tight text-gray-900">
							Welcome back, Kenny
						</h1>
						<span className="text-3xl">👋</span>
					</div>

					<Button className="h-12 gap-2 rounded-xl bg-[#1d4ea8] px-6 text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95">
						<Icon icon="lucide:plus" className="size-4" />
						Create New Task
					</Button>
				</div>

				{/* Metrics Grid */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{DASHBOARD_METRICS.map((metric) => (
						<MetricCard
							key={metric.label}
							{...metric}
							color={metric.color as "blue" | "green" | "purple" | "orange"}
						/>
					))}
				</div>

				{/* Tasks Section */}
				<div className="flex flex-col gap-6 rounded-[2.5rem] border border-gray-50 bg-white p-8 shadow-sm">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-6">
							<div className="flex size-10 items-center justify-center rounded-full bg-[#eef1f8] text-[#1d4ea8]">
								<Icon icon="lucide:clock" className="size-5" />
							</div>
							<Tabs
								tabs={taskTabs}
								activeTab={activeTab}
								onChange={setActiveTab}
								className="border-none"
							/>
						</div>
						<button className="flex items-center gap-2 text-[13px] font-bold text-[#1d4ea8] hover:underline">
							<Icon icon="solar:eye-bold" className="size-4" />
							See More
						</button>
					</div>

					<TaskList tasks={ONGOING_TASKS} />
				</div>

				{/* Bottom Grid: Agent List + Map */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Agent List */}
					<div className="flex flex-col gap-8 rounded-[2.5rem] border border-gray-50 bg-white p-10 shadow-sm">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-black tracking-tight text-gray-900">
								My Agent List
							</h3>
						</div>

						<div className="relative">
							<Icon
								icon="lucide:search"
								className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400"
							/>
							<input
								type="text"
								placeholder="Search"
								aria-label="Search agents"
								className="h-12 w-full rounded-xl border border-gray-100 bg-gray-50/50 pl-11 pr-4 text-[14px] font-medium transition-all focus:border-[#1d4ea8]/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1d4ea8]/5"
							/>
						</div>

						<Table columns={agentColumns} data={AGENT_LIST} />
					</div>

					{/* Map Placeholder */}
					<div className="flex flex-col gap-6 rounded-[2.5rem] border border-gray-50 bg-white p-10 shadow-sm">
						<h3 className="text-xl font-black tracking-tight text-gray-900">
							Live Territory Map
						</h3>
						<div className="relative min-h-[300px] flex-1 overflow-hidden rounded-3xl border border-gray-100 bg-[#f4f7fc]">
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="relative size-full opacity-60">
									<Icon
										icon="solar:map-bold-duotone"
										className="absolute inset-0 size-full text-[#1d4ea8]/10"
									/>
									<div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border-4 border-[#1d4ea8]/20 bg-[#1d4ea8]/5" />
								</div>
								<span className="z-10 text-[15px] font-bold text-[#1d4ea8]/40">
									Territory Live Map
								</span>
							</div>
						</div>

						<div className="mt-4 border-t border-gray-50 pt-6">
							<div className="mb-4 flex items-center justify-between">
								<h4 className="text-[17px] font-black tracking-tight text-gray-900">
									Pending Approvals
								</h4>
							</div>
							<div className="flex gap-4">
								<button className="border-b-2 border-[#1d4ea8] pb-1 text-[13px] font-bold text-[#1d4ea8]">
									KYC Verifications
								</button>
								<button className="pb-1 text-[13px] font-bold text-gray-400">
									Dispute Resolutions
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</RouteWrapper>
	);
}
