import type { Agent } from "@/components/Tables/columns/agentManagementColumns";

export const DUMMY_AGENTS: Agent[] = [
	{
		id: 1,
		name: "Kolawole James",
		email: "kolawolejames@gmail.com",
		territory: "Yaba, Zone 10",
		status: "Active",
		lastActivity: "12 Jan, 2026 | 8:30 AM",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: 2,
		name: "Adewole Grace",
		email: "adewolegrace@gmail.com",
		territory: "Ikeja, Zone 12",
		status: "Active",
		lastActivity: "12 Jan, 2026 | 10:15 AM",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: 3,
		name: "Sharon Chichi",
		email: "sharochichi@gmail.com",
		territory: "Victoria Island, Zone 1",
		status: "Active",
		lastActivity: "12 Jan, 2026 | 10:17 AM",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: 4,
		name: "Kelvin Oti",
		email: "kelvinoti@gmail.com",
		territory: "Yaba, Zone 10",
		status: "Active",
		lastActivity: "12 Jan, 2026 | 12:09 PM",
		avatar: "/assets/images/admin-avatar.png",
	},
];

export const TERRITORY_OPTIONS = [
	{ label: "All Territories", value: "all" },
	{ label: "Yaba, Zone 10", value: "yaba-10" },
	{ label: "Ikeja, Zone 12", value: "ikeja-12" },
	{ label: "Victoria Island, Zone 1", value: "vi-1" },
];

export const STATUS_OPTIONS = [
	{ label: "All Status", value: "all" },
	{ label: "Active", value: "Active" },
	{ label: "Idle", value: "Idle" },
	{ label: "Inactive", value: "Inactive" },
];
