"use client";

import React from "react";
import { useSession } from "next-auth/react";
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
import TaskStatusTab from "@/components/Task/TaskStatusTab";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import DashboardQuickActions from "../_widgets/DashboardQuickActions";
import CreateTaskModal from "../_modals/CreateTaskModal";
import AllTaskModal from "../_modals/AllTaskModal";

export default function Admin() {
	const { data: session } = useSession();
	// Extract first name only (e.g. "Kenny" from "Kenny Osei")
	const firstName = session?.user?.name?.split(" ")[0] ?? "there";

	const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = React.useState(false);
	const [isAllTaskModalOpen, setIsAllTaskModalOpen] = React.useState(false);

	return (
		<div className="flex flex-col gap-8">
			{/* Top Bar - Inline Alignment */}
			<div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl font-black tracking-tight text-gray-900 lg:text-[32px]">
						Welcome back, {firstName}
					</h1>
					<span className="text-2xl lg:text-[32px]">👋</span>
				</div>
				<Button
					onClick={() => setIsCreateTaskModalOpen(true)}
					className="h-11 gap-2 rounded-xl bg-[#1d4ea8] px-5 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 lg:h-12 lg:px-6 lg:text-[15px]"
				>
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
						<Table
							columns={dashboardAgentColumns}
							data={AGENT_LIST as Agent[]}
							emptyState={{
								title: "No Agents Available",
								description: "You haven't added any agents to your list yet.",
								icon: "solar:users-group-rounded-bold-duotone",
							}}
						/>
					</TableLayoutWrapper>
				</div>
				<div className="flex h-full flex-col">
					<DashboardQuickActions />
				</div>
			</div>

			<TaskStatusTab onSeeMore={() => setIsAllTaskModalOpen(true)} />

			<CreateTaskModal
				isOpen={isCreateTaskModalOpen}
				onClose={() => setIsCreateTaskModalOpen(false)}
			/>

			<AllTaskModal
				isOpen={isAllTaskModalOpen}
				onClose={() => setIsAllTaskModalOpen(false)}
			/>
		</div>
	);
}
