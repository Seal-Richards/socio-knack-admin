export const DASHBOARD_METRICS = [
	{
		label: "My Agents",
		value: "42",
		activeCount: "40 Active",
		icon: "lucide:users",
		color: "green",
	},
	{
		label: "Today's Territory Sales",
		value: "₦850,000",
		icon: "lucide:shopping-cart",
		color: "orange",
	},
	{
		label: "Team Compliance",
		value: "94%",
		icon: "lucide:bar-chart-3",
		color: "purple",
	},
	{
		label: "Pending Actions",
		value: "2",
		icon: "lucide:check-circle",
		color: "red",
	},
];

export const TASK_TABS = [
	{ id: "Ongoing", label: "Ongoing", activeColor: "text-[#1d4ea8]", activeBg: "bg-[#1d4ea8]" },
	{ id: "Today", label: "Today", activeColor: "text-[#1d4ea8]", activeBg: "bg-[#1d4ea8]" },
	{ id: "Upcoming", label: "Upcoming", activeColor: "text-[#facc15]", activeBg: "bg-[#facc15]" },
	{ id: "Open", label: "Open", activeColor: "text-[#3b82f6]", activeBg: "bg-[#3b82f6]" },
	{
		id: "Completed",
		label: "Completed",
		activeColor: "text-[#22c55e]",
		activeBg: "bg-[#22c55e]",
	},
	{ id: "Pending", label: "Pending", activeColor: "text-[#ef4444]", activeBg: "bg-[#ef4444]" },
	{ id: "Cancelled", label: "Cancelled", activeColor: "text-gray-500", activeBg: "bg-gray-500" },
];

export const ONGOING_TASKS = [
	{
		id: 1,
		agentName: "James Kolawole",
		avatar: "/assets/images/admin-avatar.png",
		date: "07 Feb 2026",
		time: "10:00 AM",
		location: "Visit: Central Market",
		subLocation: "Lead Boutique Store",
		distance: "0.4 miles away",
		status: "active",
	},
];

export const AGENT_LIST = [
	{
		id: 1,
		name: "Sharon C.",
		status: "Active",
		avatar: "/assets/images/admin-avatar.png",
		lastCheckIn: "5m ago @Total Ikeja",
	},
	{
		id: 2,
		name: "Adewole G.",
		status: "Idle",
		avatar: "/assets/images/admin-avatar.png",
		lastCheckIn: "4m ago @Mary Land",
	},
	{
		id: 3,
		name: "Kolawole J.",
		status: "Active",
		avatar: "/assets/images/admin-avatar.png",
		lastCheckIn: "23m ago @Total Ikeja",
	},
	{
		id: 4,
		name: "Kelvin O.",
		status: "Idle",
		avatar: "/assets/images/admin-avatar.png",
		lastCheckIn: "14m ago @Total Ikeja",
	},
];
