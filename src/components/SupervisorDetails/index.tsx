"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetSupervisorById } from "@/hooks/useTeam";
import { useGetMe } from "@/hooks/useProfile";
import ProfileHeader from "./ProfileHeader";
import ProfileSettings from "./ProfileSettings";
import TerritoryAndTeam from "./TerritoryAndTeam";
import PerformanceMetrics from "./PerformanceMetrics";
import SystemAccess from "./SystemAccess";
import KycStatus from "./KycStatus";
import Compliance from "./Compliance";

interface SupervisorDetailsProps {
	id: string;
}

export default function SupervisorDetails({ id }: SupervisorDetailsProps) {
	const { data: supervisorRes, isLoading } = useGetSupervisorById(id);
	const { data: meRes } = useGetMe();
	const rawSupervisor = supervisorRes?.data;
	const currentUser = meRes?.data;

	const supervisorData = {
		id: rawSupervisor?.id || id,
		name: rawSupervisor
			? `${rawSupervisor.firstName || ""} ${rawSupervisor.lastName || ""}`.trim()
			: "Loading...",
		role: rawSupervisor?.role === "staffs" ? "Staff" : rawSupervisor?.role || "Supervisor",
		status: rawSupervisor?.status || "pending",
		email: rawSupervisor?.email || "",
		phone: rawSupervisor?.phone || "",
		address: rawSupervisor?.city
			? `${rawSupervisor.city}, ${rawSupervisor.state || ""}`
			: "N/A",
		avatar: rawSupervisor?.avatar || "/assets/images/admin-avatar.png",
		directReports: rawSupervisor?.agentCount || 0,
		assignedZones: rawSupervisor?.assignedZones || "Unassigned",
		memberSince: rawSupervisor?.createdAt
			? new Date(rawSupervisor.createdAt).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				})
			: "N/A",
		raw: rawSupervisor,
	};

	const isOwnProfile =
		currentUser?.id === rawSupervisor?.id ||
		currentUser?.id === rawSupervisor?._id ||
		(currentUser?.role === "supervisor" && currentUser?.id === id);

	const isOwnKycPending = isOwnProfile && currentUser?.kycStatus !== "approved";
	const defaultTab = isOwnKycPending ? "compliance" : "profile-settings";

	if (isLoading) {
		return (
			<div className="flex h-60 items-center justify-center rounded-[2.5rem] bg-white">
				<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col gap-6 lg:gap-8">
			<ProfileHeader supervisor={supervisorData} />

			<Tabs defaultValue={defaultTab} className="w-full">
				<TabsList className="hide-scrollbar mb-6 flex h-auto w-full justify-start gap-2 overflow-x-auto rounded-full bg-gray-50/50 p-1.5 md:w-max">
					{!isOwnKycPending && (
						<>
							<TabsTrigger
								value="profile-settings"
								className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
							>
								Profile Settings
							</TabsTrigger>
							<TabsTrigger
								value="territory-team"
								className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
							>
								Territory & Team
							</TabsTrigger>
							<TabsTrigger
								value="performance-metrics"
								className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
							>
								Performance Metrics
							</TabsTrigger>
						</>
					)}
					<TabsTrigger
						value="kyc-status"
						className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
					>
						KYC Status
					</TabsTrigger>
					<TabsTrigger
						value="compliance"
						className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
					>
						Compliance
					</TabsTrigger>
					{!isOwnKycPending && (
						<TabsTrigger
							value="system-access"
							className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
						>
							System Access & Security
						</TabsTrigger>
					)}
				</TabsList>

				{!isOwnKycPending && (
					<>
						<TabsContent value="profile-settings" className="mt-0 outline-none">
							<ProfileSettings supervisor={supervisorData} />
						</TabsContent>

						<TabsContent value="territory-team" className="mt-0 outline-none">
							<TerritoryAndTeam supervisor={supervisorData} />
						</TabsContent>

						<TabsContent value="performance-metrics" className="mt-0 outline-none">
							<PerformanceMetrics supervisor={supervisorData} />
						</TabsContent>
					</>
				)}

				<TabsContent value="kyc-status" className="mt-0 outline-none">
					<KycStatus supervisor={supervisorData} />
				</TabsContent>

				<TabsContent value="compliance" className="mt-0 outline-none">
					<Compliance supervisor={supervisorData} />
				</TabsContent>

				{!isOwnKycPending && (
					<TabsContent value="system-access" className="mt-0 outline-none">
						<SystemAccess />
					</TabsContent>
				)}
			</Tabs>
		</div>
	);
}
