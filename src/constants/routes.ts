// src/constants/routes.ts

export const ROUTES = {
	DASHBOARD: "/dashboard",
	PRODUCTS_SERVICES: "/products-services",
	AGENTS: "/agent-management",
	AGENT_DETAILS: (id: string | number) => `/agent-management/${id}`,
	SUPERVISORS: "/supervisor-management",
	SUPERVISOR_DETAILS: (id: string | number) => `/supervisor-management/${id}`,
	TERRITORY: "/territory-control",
	REPORTS: "/reports-payouts",
	USERS: "/user-management",
	SETTINGS: "/settings",
	ALL_TASKS: "/all-task",
	HELP: "#",
	LOGOUT: "/logout",

	// Legacy or other routes
	CUSTOMERS: "/customer-management",
	VENDORS: "/vendor-management",
	RIDERS: "/rider-management",
	ORDERS: "/order-management",
	SUPPORT: "/support",
	FINANCE: "/finance-management",
	ANALYTICS: "/report-analytics",
} as const;

export const getRoute = (path: string, params?: Record<string, string>) => {
	if (!params) return path;
	const queryString = new URLSearchParams(params).toString();
	return `${path}?${queryString}`;
};
