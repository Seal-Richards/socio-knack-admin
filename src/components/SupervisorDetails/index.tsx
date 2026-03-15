"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileHeader from "./ProfileHeader";
import ProfileSettings from "./ProfileSettings";
import TerritoryAndTeam from "./TerritoryAndTeam";
import PerformanceMetrics from "./PerformanceMetrics";
import SystemAccess from "./SystemAccess";

interface SupervisorDetailsProps {
	id: string;
}

export default function SupervisorDetails({ id: _id }: SupervisorDetailsProps) {
	// Mock supervisor data based on design screenshot
	const supervisorData = {
		name: "Sarah Johnson",
		role: "Supervisor",
		status: "Active",
		email: "sarahjohnson@gmail.com",
		phone: "09088888888",
		address: "Albingrey street off shore, AB",
		avatar: "/assets/images/admin-avatar.png",
		directReports: 45,
		assignedZones: "Ikeja, Maryland, Ogba",
		memberSince: "Jan 25th, 2026",
	};

	return (
		<div className="flex w-full flex-col gap-6 lg:gap-8">
			<ProfileHeader supervisor={supervisorData} />

			<Tabs defaultValue="profile-settings" className="w-full">
				<TabsList className="hide-scrollbar mb-6 flex h-auto w-full justify-start gap-2 overflow-x-auto rounded-full bg-gray-50/50 p-1.5 md:w-max">
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
					<TabsTrigger
						value="system-access"
						className="rounded-full px-6 py-2.5 text-[14px] font-bold text-gray-500 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
					>
						System Access & Security
					</TabsTrigger>
				</TabsList>

				<TabsContent value="profile-settings" className="mt-0 outline-none">
					<ProfileSettings />
				</TabsContent>

				<TabsContent value="territory-team" className="mt-0 outline-none">
					<TerritoryAndTeam />
				</TabsContent>

				<TabsContent value="performance-metrics" className="mt-0 outline-none">
					<PerformanceMetrics />
				</TabsContent>

				<TabsContent value="system-access" className="mt-0 outline-none">
					<SystemAccess />
				</TabsContent>
			</Tabs>
		</div>
	);
}
