"use client";

import React, { useState, useEffect, useMemo } from "react";
import Tabs from "@/components/Tabs";
import OverviewTab from "./OverviewTab";
import DashboardTab from "./DashboardTab";
import TasksTab from "./TasksTab";
import UsersTab from "./UsersTab";
import ProductsTab from "./ProductsTab";
import FinanceTab from "./FinanceTab";
import SecurityTab from "./SecurityTab";

const TABS_CONFIG = [
	{ id: "overview", label: "Overview & Onboarding" },
	{ id: "dashboard", label: "Dashboard & Metrics" },
	{ id: "tasks", label: "Tasks & Territories" },
	{ id: "users", label: "User Management" },
	{ id: "products", label: "Products & Stock" },
	{ id: "finance", label: "Ledger & Payouts" },
	{ id: "security", label: "Security & PINs" },
];

const ANCHORS_CONFIG: Record<string, { id: string; label: string }[]> = {
	overview: [
		{ id: "system-overview", label: "System Architecture" },
		{ id: "admin-registration", label: "Admin Registration Flow" },
		{ id: "supervisor-onboarding", label: "Supervisor Onboarding" },
		{ id: "verification-states", label: "Account Verification States" },
	],
	dashboard: [
		{ id: "kpis", label: "KPI Metric Cards" },
		{ id: "visualizations", label: "Analytical Charts" },
		{ id: "realtime-feed", label: "Real-time Auditing" },
	],
	tasks: [
		{ id: "scheduling", label: "Scheduling Visits/Tasks" },
		{ id: "approval-flow", label: "Supervisor Review & Approval" },
		{ id: "territories", label: "Territory Control & Bounds" },
		{ id: "map-tracking", label: "Real-time Map Tracking" },
	],
	users: [
		{ id: "roles", label: "User Roles & Permissions" },
		{ id: "upgrades", label: "Role Upgrade Flow" },
		{ id: "suspension", label: "Suspension & Incident Logging" },
		{ id: "cascade-deletion", label: "Cascade Deletion & Reassignment" },
	],
	products: [
		{ id: "creation", label: "Creating Products & Services" },
		{ id: "quantities", label: "Stock Quantity Logic" },
		{ id: "visibility", label: "Agent Visibility Constraints" },
	],
	finance: [
		{ id: "logs", label: "Transaction Ledger Logs" },
		{ id: "payouts", label: "Supervisor Payout Approval" },
		{ id: "wallet", label: "Wallet & Settlement Bank" },
	],
	security: [
		{ id: "otp", label: "OTP Login Verification" },
		{ id: "security-pin", label: "6-Digit Security PIN" },
		{ id: "payment-pin", label: "4-Digit Payment PIN" },
	],
};

export default function Help() {
	const [activeTab, setActiveTab] = useState("overview");
	const [activeAnchor, setActiveAnchor] = useState("");

	const anchors = useMemo(() => ANCHORS_CONFIG[activeTab] ?? [], [activeTab]);

	const handleTabChange = (id: string) => {
		setActiveTab(id);
		// Scroll to top of the content area
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Track which section is in view
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 200;
			const currentActive = anchors.find((anchor) => {
				const element = document.getElementById(anchor.id);
				if (!element) return false;
				const { offsetTop } = element;
				const { offsetHeight } = element;
				return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
			});

			if (currentActive) {
				setActiveAnchor(currentActive.id);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [anchors]);

	const renderTabContent = () => {
		switch (activeTab) {
			case "overview":
				return <OverviewTab />;
			case "dashboard":
				return <DashboardTab />;
			case "tasks":
				return <TasksTab />;
			case "users":
				return <UsersTab />;
			case "products":
				return <ProductsTab />;
			case "finance":
				return <FinanceTab />;
			case "security":
				return <SecurityTab />;
			default:
				return <OverviewTab />;
		}
	};

	return (
		<div className="flex flex-col gap-6 p-4 md:gap-8 md:p-10">
			{/* Page Header */}
			<div className="flex flex-col gap-1.5">
				<h2 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl">
					Documentation Hub & Guides
				</h2>
				<p className="text-[13px] font-semibold text-gray-500 sm:text-[14px]">
					Operating manual for SocioKnack Admin authentication, user workflows, and system
					settings.
				</p>
			</div>

			{/* Tabs Header */}
			<Tabs tabs={TABS_CONFIG} activeTab={activeTab} onChange={handleTabChange} />

			{/* Two Column Layout: Left Sticky Anchor Navigation, Right Detailed Text */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
				{/* Left Sidebar Anchors Index */}
				<div className="hidden lg:col-span-3 lg:block">
					<div className="sticky top-[100px] flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
						<span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
							In This Section
						</span>
						<nav className="flex flex-col gap-3">
							{anchors.map((anchor) => {
								const isActive = activeAnchor === anchor.id;
								return (
									<a
										key={anchor.id}
										href={`#${anchor.id}`}
										className={`group flex items-center gap-2 border-l-2 py-0.5 pl-3 text-[13px] font-bold transition-all duration-200 ${
											isActive
												? "border-[#1d4ea8] text-[#1d4ea8]"
												: "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600"
										}`}
									>
										{anchor.label}
									</a>
								);
							})}
						</nav>
					</div>
				</div>

				{/* Right Side Content Section */}
				<div className="flex flex-col gap-8 lg:col-span-9">{renderTabContent()}</div>
			</div>
		</div>
	);
}
