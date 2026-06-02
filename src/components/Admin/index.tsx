"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AgentsWidget from "@/components/_widgets/Agents";
import TerritorySalesWidget from "@/components/_widgets/TerritorySales";
import ComplianceWidget from "@/components/_widgets/ComplianceSales";
import PendingActionsWidget from "@/components/_widgets/PendingActions";
import Table from "@/components/Tables";
import TableLayoutWrapper from "@/components/List/TableLayoutWrapper";
import SearchBar from "@/components/_atoms/SearchBar";
import {
	dashboardAgentColumns,
	type Agent,
} from "@/components/Tables/columns/dashboardAgentColumns";
import TaskStatusTab from "@/components/Task/TaskStatusTab";
import { useGetDashboardStats } from "@/hooks/useDashboard";
import { useSocketAgentTracking } from "@/hooks/useDashboard/useSocketAgentTracking";
import { useGetAgents } from "@/hooks/useAgent";
import { useGetMe } from "@/hooks/useProfile";
import DashboardQuickActions from "../_widgets/DashboardQuickActions";

export default function Admin() {
	const { data: session } = useSession();
	const { data: meRes } = useGetMe();
	const profile = meRes?.data;

	const fullName = profile
		? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
		: (session?.user?.name ?? "");

	const router = useRouter();

	// Initialize WebSockets for real-time agent tracking
	useSocketAgentTracking();

	const { data: dashboardStats } = useGetDashboardStats();
	const { data: agentsRes } = useGetAgents();

	const stats = dashboardStats?.data;
	const agents = ((agentsRes?.data as unknown as Agent[]) || []).map((agent) => ({
		...agent,
		id: agent._id,
	}));

	return (
		<div className="flex flex-col gap-8">
			{/* Top Bar - Inline Alignment */}
			<div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl font-black tracking-tight text-gray-900 lg:text-[32px]">
						Welcome back, {fullName || "there"}
					</h1>
					<span className="text-2xl lg:text-[32px]">👋</span>
				</div>
			</div>

			{/* Metrics Section */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
				<AgentsWidget
					label="My Agents"
					value={stats?.totalAgents?.toString() || "0"}
					activeCount={`${stats?.activeAgents || 0} Active`}
				/>
				<TerritorySalesWidget
					label="Today's Territory Sales"
					value={`₦${(stats?.todayTerritorySales || 0).toLocaleString()}`}
				/>
				<ComplianceWidget
					label="Completed Tasks/Visits"
					value={stats?.completedVisits?.toString() || "0"}
				/>
				<PendingActionsWidget
					label="Pending Tasks"
					value={stats?.pendingVisits?.toString() || "0"}
				/>
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
							data={agents}
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

			<TaskStatusTab onSeeMore={() => router.push("/all-task")} />
		</div>
	);
}
