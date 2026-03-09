// src/constants/routes.ts

export const ROUTES = {
	DASHBOARD: "/dashboard",
	AGENTS: "/agent-management",
	SUPERVISORS: "/supervisor-management",
	TERRITORY: "/territory-control",
	REPORTS: "/reports-payouts",
	USERS: "/user-management",
	SETTINGS: "/settings",
	HELP: "/help",
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
