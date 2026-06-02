// src/constants/SidebarMenuItems.tsx
import { LogOut } from "lucide-react";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/constants/routes";

const DashboardIcon = ({ className }: { className?: string }) => (
	<Icon icon="lucide:layout-dashboard" className={className} />
);

const ProductsServicesIcon = ({ className }: { className?: string }) => (
	<Icon icon="solar:box-bold" className={className} />
);

const TasksIcon = ({ className }: { className?: string }) => (
	<Icon icon="lucide:list-todo" className={className} />
);

const AgentIcon = ({ className }: { className?: string }) => (
	<Icon icon="solar:users-group-rounded-bold" className={className} />
);

const SupervisorIcon = ({ className }: { className?: string }) => (
	<Icon icon="solar:shield-user-bold" className={className} />
);

const TerritoryIcon = ({ className }: { className?: string }) => (
	<Icon icon="solar:map-point-bold" className={className} />
);

const ReportsIcon = ({ className }: { className?: string }) => (
	<Icon icon="solar:document-text-bold" className={className} />
);

const UsersIcon = ({ className }: { className?: string }) => (
	<Icon icon="solar:user-rounded-bold" className={className} />
);

const SettingsIcon = ({ className }: { className?: string }) => (
	<Icon icon="solar:settings-bold" className={className} />
);

const HelpIcon = ({ className }: { className?: string }) => (
	<Icon icon="solar:help-circle-bold" className={className} />
);

export const MENU_ITEMS = [
	{
		label: "Dashboard",
		icon: DashboardIcon,
		href: ROUTES.DASHBOARD,
	},
	{
		label: "Products & Services",
		icon: ProductsServicesIcon,
		href: ROUTES.PRODUCTS_SERVICES,
	},
	{
		label: "All Tasks",
		icon: TasksIcon,
		href: ROUTES.ALL_TASKS,
	},
	{
		label: "Agent Management",
		icon: AgentIcon,
		href: ROUTES.AGENTS,
	},
	{
		label: "Supervisor Management",
		icon: SupervisorIcon,
		href: ROUTES.SUPERVISORS,
	},
	{
		label: "Territory Control",
		icon: TerritoryIcon,
		href: ROUTES.TERRITORY,
	},
	{
		label: "Reports & Payouts",
		icon: ReportsIcon,
		href: ROUTES.REPORTS,
	},
	{
		label: "User Management",
		icon: UsersIcon,
		href: ROUTES.USERS,
	},
];

export const BOTTOM_MENU_ITEMS = [
	{
		label: "Settings",
		icon: SettingsIcon,
		href: ROUTES.SETTINGS,
	},
	{
		label: "Help",
		icon: HelpIcon,
		href: ROUTES.HELP,
	},
];

export const LOGOUT_ITEM = {
	label: "Logout",
	icon: LogOut,
	href: ROUTES.LOGOUT,
};
