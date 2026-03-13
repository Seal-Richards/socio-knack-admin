"use client";

import React from "react";
import AgentsWidget from "@/components/_widgets/Agents";
import TerritorySalesWidget from "@/components/_widgets/TerritorySales";
import ComplianceWidget from "@/components/_widgets/ComplianceSales";
import PendingActionsWidget from "@/components/_widgets/PendingActions";
import Table from "@/components/Tables";
import { AGENT_LIST } from "@/constants/dashboard";
import TableLayoutWrapper from "@/components/List/TableLayoutWrapper";
import SearchBar from "@/components/_atoms/SearchBar";
import {
	dashboardAgentColumns,
	type Agent,
} from "@/components/Tables/columns/dashboardAgentColumns";
import DashboardTaskList from "@/components/List/DashboardTaskList";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import DashboardQuickActions from "../_widgets/DashboardQuickActions";

export default function Admin() {
	return (
		<div className="flex flex-col gap-8">
			{/* Top Bar - Inline Alignment */}
			<div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl font-black tracking-tight text-gray-900 lg:text-[32px]">
						Welcome back, Kenny
					</h1>
					<span className="text-2xl lg:text-[32px]">👋</span>
				</div>
				<Button className="h-11 gap-2 rounded-xl bg-[#1d4ea8] px-5 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 lg:h-12 lg:px-6 lg:text-[15px]">
					<Icon icon="lucide:plus" className="size-4" />
					Create New Task
				</Button>
			</div>

			{/* Metrics Section */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
				<AgentsWidget label="My Agents" value="42" activeCount="40 Active" />
				<TerritorySalesWidget label="Today's Territory Sales" value="₦850,000" />
				<ComplianceWidget label="Team Compliance" value="94%" />
				<PendingActionsWidget label="Pending Actions" value="2" />
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div className="flex h-full flex-col">
					<TableLayoutWrapper
						title="My Agent List"
						className="h-full rounded-none border-none bg-transparent p-0 shadow-none"
						filters={
							<SearchBar
								placeholder="Search"
								aria-label="Search agents"
								containerClassName="w-full"
							/>
						}
					>
						<Table columns={dashboardAgentColumns} data={AGENT_LIST as Agent[]} />
					</TableLayoutWrapper>
				</div>
				<div className="flex h-full flex-col">
					<DashboardQuickActions />
				</div>
			</div>

			<DashboardTaskList />
		</div>
	);
}
