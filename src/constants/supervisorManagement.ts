import type { Supervisor } from "@/components/Tables/columns/supervisorManagementColumns";

export const DUMMY_SUPERVISORS: Supervisor[] = [
	{
		id: 1,
		name: "Sarah John",
		email: "SarahJohn@gmail.com",
		territory: "Yaba, Zone",
		agentCount: 45,
		isOnline: true,
		profileStatus: "active",
		lastActivity: "12 Jan, 2026 | 10:15 AM",
		avatar: "/assets/images/admin-avatar.png",
	},
	{
		id: 2,
		name: "Kelvin Oti",
		email: "kelvinoti@gmail.com",
		territory: "Ikeja, Zone",
		agentCount: 23,
		isOnline: false,
		profileStatus: "active",
		lastActivity: "12 Jan, 2026 | 10:15 AM",
		avatar: "/assets/images/admin-avatar.png",
	},
];

export const TERRITORY_OPTIONS = [
	{ label: "All Territories", value: "all" },
	{ label: "Yaba, Zone", value: "yaba" },
	{ label: "Ikeja, Zone", value: "ikeja" },
];

export const STATUS_OPTIONS = [
	{ label: "All Status", value: "all" },
	{ label: "Active", value: "Active" },
	{ label: "Inactive", value: "Inactive" },
];
