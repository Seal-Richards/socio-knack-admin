"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileHeader from "./ProfileHeader";
import ProfileSettings from "./ProfileSettings";
import PerformanceMetrics from "./PerformanceMetrics";
import KycStatus from "./KycStatus";
import Compliance from "./Compliance";

interface AgentDetailsProps {
	id: string;
}

export default function AgentDetails({ id: _id }: AgentDetailsProps) {
	// Mock agent data
	const agent = {
		name: "Kolawole James",
		role: "Agent",
		rating: "4.5 (success rate)",
		status: "Active",
		email: "kolawolejames@gmail.com",
		phone: "09088888888",
		address: "Albingrey street off shore, AB",
		avatar: "/assets/images/admin-avatar.png",
	};

	return (
		<div className="flex w-full flex-col gap-6">
			<ProfileHeader agent={agent} />

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
					<ProfileSettings />
				</TabsContent>

				<TabsContent value="performance-metrics" className="mt-0 outline-none">
					<PerformanceMetrics />
				</TabsContent>

				<TabsContent value="kyc-status" className="mt-0 outline-none">
					<KycStatus />
				</TabsContent>

				<TabsContent value="compliance" className="mt-0 outline-none">
					<Compliance />
				</TabsContent>
			</Tabs>
		</div>
	);
}
