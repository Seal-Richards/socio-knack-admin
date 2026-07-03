"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetAgentById } from "@/hooks/useAgent";
import { useGetTerritories } from "@/hooks/useTerritory";
import ProfileHeader from "./ProfileHeader";
import ProfileSettings from "./ProfileSettings";
import PerformanceMetrics from "./PerformanceMetrics";
import KycStatus from "./KycStatus";
import Compliance from "./Compliance";

interface AgentDetailsProps {
	id: string;
}

export default function AgentDetails({ id }: AgentDetailsProps) {
	const { data: agentRes, isLoading: loadingAgent } = useGetAgentById(id);
	const { data: territoriesRes, isLoading: loadingTerritories } = useGetTerritories();

	const isLoading = loadingAgent || loadingTerritories;
	const rawAgent = agentRes?.data;
	const territories = territoriesRes?.data || [];

	const agentTerritories = rawAgent
		? territories.filter((t) =>
				t.assignedAgents?.some(
					(a) => (a._id || a.id) === rawAgent._id || (a._id || a.id) === rawAgent.id,
				),
			)
		: [];

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
			</div>
		);
	}

	if (!rawAgent) {
		return (
			<div className="flex h-64 items-center justify-center font-bold text-gray-500">
				Agent not found.
			</div>
		);
	}

	let statusLabel = "Inactive";
	if (rawAgent.status === "active") {
		statusLabel = "Active";
	} else if (rawAgent.status === "pending") {
		statusLabel = "Pending";
	}

	// Construct structured agent info for header display
	const agentInfo = {
		name: `${rawAgent.firstName || ""} ${rawAgent.lastName || ""}`.trim(),
		role: "Agent",
		rating: `${rawAgent.metrics?.successRate || 0}% (Task success rates)`,
		status: statusLabel,
		email: rawAgent.email || "",
		phone: rawAgent.phone || "No phone listed",
		address:
			[rawAgent.residentialAddress, rawAgent.city, rawAgent.state, rawAgent.country]
				.filter(Boolean)
				.join(", ") || "No address listed",
		avatar: rawAgent.avatar || "/assets/images/admin-avatar.png",
	};

	return (
		<div className="flex w-full flex-col gap-6">
			<ProfileHeader agent={agentInfo} />

			<Tabs defaultValue="profile-settings" className="w-full">
				<TabsList className="hide-scrollbar mb-6 flex h-auto w-full justify-start gap-2 overflow-x-auto rounded-full bg-gray-50/50 p-1.5 md:w-max">
					<TabsTrigger
						value="profile-settings"
						className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
					>
						Profile Settings
					</TabsTrigger>
					<TabsTrigger
						value="performance-metrics"
						className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
					>
						Performance Metrics
					</TabsTrigger>
					<TabsTrigger
						value="kyc-status"
						className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
					>
						KYC Status
					</TabsTrigger>
					<TabsTrigger
						value="compliance"
						className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
					>
						Compliance
					</TabsTrigger>
				</TabsList>

				<TabsContent value="profile-settings" className="mt-0 outline-none">
					<ProfileSettings agent={rawAgent} />
				</TabsContent>

				<TabsContent value="performance-metrics" className="mt-0 outline-none">
					<PerformanceMetrics metrics={rawAgent.metrics} territories={agentTerritories} />
				</TabsContent>

				<TabsContent value="kyc-status" className="mt-0 outline-none">
					<KycStatus agent={rawAgent} />
				</TabsContent>

				<TabsContent value="compliance" className="mt-0 outline-none">
					<Compliance agent={rawAgent} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
