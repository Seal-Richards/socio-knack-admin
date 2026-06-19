"use client";

import React, { useState } from "react";
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
import Pagination from "@/components/_atoms/Pagination";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useGetBusinessSettings } from "@/hooks/useBusiness";
import cn from "@/lib/utils";
import DashboardQuickActions from "../_widgets/DashboardQuickActions";

export default function Admin() {
	const { data: session } = useSession();
	const { data: meRes, isLoading: isMeLoading } = useGetMe();
	const profile = meRes?.data;

	const fullName = profile
		? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
		: (session?.user?.name ?? "");

	const router = useRouter();

	// Initialize WebSockets for real-time agent tracking
	useSocketAgentTracking();

	const { data: dashboardStats } = useGetDashboardStats();
	const { data: agentsRes } = useGetAgents();
	const { data: businessSettingsRes, isLoading: isBusinessSettingsLoading } =
		useGetBusinessSettings();

	const stats = dashboardStats?.data;
	const agents = ((agentsRes?.data as unknown as Agent[]) || []).map((agent) => ({
		...agent,
		id: agent._id,
	}));

	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	// State for tracking if the completed onboarding card has been dismissed
	const [dismissed, setDismissed] = useState(false);

	React.useEffect(() => {
		if (profile?.id) {
			const isDismissed =
				localStorage.getItem(`onboarding_dismissed_${profile.id}`) === "true";
			setDismissed(isDismissed);
		}
	}, [profile?.id]);

	const handleDismiss = () => {
		if (profile?.id) {
			localStorage.setItem(`onboarding_dismissed_${profile.id}`, "true");
			setDismissed(true);
		}
	};

	// Onboarding calculation logic
	const role = profile?.role;
	const isOwnerIdUploaded = !!profile?.kycDocuments?.idFront || profile?.kycStatus === "approved";
	const isBusinessSetup =
		!!profile?.business?.name &&
		(!!businessSettingsRes?.data?.corporateDocuments?.cacCertificate ||
			profile?.business?.isVerified === true);
	const isBankLinked =
		!!profile?.business?.fincraAccountNumber ||
		!!businessSettingsRes?.data?.fincraAccountNumber ||
		!!businessSettingsRes?.data?.hasBankDetails ||
		profile?.business?.isVerified === true;
	const isSubscribed =
		profile?.business?.subscriptionStatus === "active" ||
		profile?.business?.isVerified === true;

	const isProfileDetailsCompleted =
		!!profile?.phone &&
		!!profile?.dob &&
		!!profile?.gender &&
		!!profile?.state &&
		!!profile?.city;

	const steps =
		role === "admin"
			? [
					{ label: "Verify Email Address", checked: true },
					{ label: "Verify Owner Identity", checked: isOwnerIdUploaded },
					{ label: "Setup Business Profile & Docs", checked: isBusinessSetup },
					{ label: "Link Settlement Bank", checked: isBankLinked },
					{ label: "Activate Platform Trial", checked: isSubscribed },
				]
			: [
					// Supervisor & Staff — Security PIN is agent-only (mobile app),
					// so only email verification + profile settings are required here.
					{ label: "Verify Email Address", checked: true },
					{ label: "Complete Profile Settings", checked: isProfileDetailsCompleted },
				];

	const completedCount = steps.filter((s) => s.checked).length;
	const totalCount = steps.length;
	const percent = Math.round((completedCount / totalCount) * 100);
	const isOnboardingComplete =
		completedCount === totalCount || profile?.business?.isVerified === true;

	const showCard =
		role &&
		["admin", "supervisor", "staffs", "staff"].includes(role) &&
		(!isOnboardingComplete || !dismissed);

	const handleCompleteOnboardingClick = () => {
		if (role === "admin") {
			router.push("/register");
		} else {
			router.push("/settings");
		}
	};

	// Filter agents by search query
	const filteredAgents = agents.filter((agent) => {
		const agentFullName = `${agent.firstName || ""} ${agent.lastName || ""}`
			.trim()
			.toLowerCase();
		return agentFullName.includes(searchQuery.toLowerCase());
	});

	// Pagination Math
	const totalPages = Math.max(1, Math.ceil(filteredAgents.length / itemsPerPage));
	const paginatedAgents = filteredAgents.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	const renderOnboardingProgress = () => {
		if (isMeLoading || isBusinessSettingsLoading) {
			return (
				<div className="w-full max-w-xl shrink-0">
					<div className="relative flex min-h-[110px] items-center justify-center rounded-[2rem] border border-blue-50/50 bg-white/60 p-5 shadow-sm backdrop-blur-sm">
						<div className="flex items-center gap-2.5 text-xs font-bold text-gray-400">
							<Icon
								icon="svg-spinners:180-ring-with-bg"
								className="size-5 animate-spin text-[#1d4ea8]"
							/>
							Checking onboarding status...
						</div>
					</div>
				</div>
			);
		}

		if (!showCard) return null;

		return (
			<div className="w-full max-w-xl shrink-0">
				<div className="relative flex flex-col gap-5 overflow-hidden rounded-[2rem] border border-blue-100/70 bg-gradient-to-br from-blue-50/40 via-white to-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row">
					{/* Left Column: Progress Info & Action */}
					<div className="flex flex-1 flex-col justify-between gap-3">
						<div className="flex items-center justify-between">
							<h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-500">
								<Icon
									icon="solar:checklist-bold-duotone"
									className="size-5 text-[#1d4ea8]"
								/>
								Onboarding Progress
							</h3>
							<span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-[#1d4ea8]">
								{percent}%
							</span>
						</div>

						{/* Progress Bar */}
						<div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
							<style>{`
								.onboarding-progress-bar-fill {
									width: ${percent}%;
								}
							`}</style>
							<div className="onboarding-progress-bar-fill h-full rounded-full bg-gradient-to-r from-blue-500 to-[#1d4ea8] transition-all duration-500" />
						</div>

						{/* Action Button / Success Badge */}
						{isOnboardingComplete ? (
							<div className="flex items-center gap-2">
								<span className="flex items-center gap-1.5 rounded-xl bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600">
									<Icon icon="solar:verified-check-bold" className="size-4" />
									Setup Completed
								</span>
								<button
									onClick={handleDismiss}
									className="flex size-8 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
									title="Dismiss panel"
									aria-label="Dismiss onboarding card"
								>
									<Icon icon="lucide:eye-off" className="size-4" />
								</button>
							</div>
						) : (
							<Button
								onClick={handleCompleteOnboardingClick}
								className="flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#1d4ea8] text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] hover:bg-[#153a82] active:scale-[0.99]"
							>
								Complete Onboarding
								<Icon
									icon="solar:arrow-right-bold"
									className="size-3.5 animate-pulse"
								/>
							</Button>
						)}
					</div>

					{/* Right Column: Mini Checklist Steps */}
					<div className="flex w-full shrink-0 flex-col justify-center gap-2 sm:w-64 sm:border-l sm:border-gray-100 sm:pl-5">
						{steps.map((step) => (
							<div key={step.label} className="flex items-center gap-2">
								<Icon
									icon={
										step.checked
											? "solar:check-circle-bold"
											: "solar:check-circle-linear"
									}
									className={cn(
										"size-4 shrink-0",
										step.checked ? "text-green-500" : "text-gray-300",
									)}
								/>
								<span
									className={cn(
										"text-[11px] font-semibold leading-none",
										step.checked
											? "text-gray-400 line-through font-normal"
											: "text-gray-600",
									)}
								>
									{step.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-8">
			{/* Top Bar - Inline Alignment */}
			<div className="flex w-full flex-col justify-between gap-6 lg:flex-row lg:items-center">
				<div className="flex shrink-0 items-center gap-3">
					<h1 className="text-2xl font-black tracking-tight text-gray-900 lg:text-[32px]">
						Welcome back, {fullName || "there"}
					</h1>
					<span className="text-2xl lg:text-[32px]">👋</span>
				</div>

				{renderOnboardingProgress()}
			</div>

			<div className="flex flex-col gap-8 lg:flex-row">
				<div className="flex flex-1 flex-col gap-8">
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
										value={searchQuery}
										onChange={handleSearchChange}
										containerClassName="w-full"
									/>
								}
							>
								<>
									<Table
										columns={dashboardAgentColumns}
										data={paginatedAgents}
										emptyState={{
											title: "No Agents Available",
											description:
												"You haven't added any agents to your list yet.",
											icon: "solar:users-group-rounded-bold-duotone",
										}}
									/>
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={setCurrentPage}
										className="mt-4"
									/>
								</>
							</TableLayoutWrapper>
						</div>
						<div className="flex h-full flex-col">
							<DashboardQuickActions />
						</div>
					</div>

					<TaskStatusTab onSeeMore={() => router.push("/all-task")} />
				</div>
			</div>
		</div>
	);
}
