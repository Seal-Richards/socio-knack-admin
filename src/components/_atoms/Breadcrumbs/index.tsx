"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

export default function Breadcrumbs() {
	const pathname = usePathname();

	// Map common segments to pretty names
	const segmentMap: Record<string, string> = {
		dashboard: "Dashboard",
		"agent-management": "Agent Management",
		"supervisor-management": "Supervisor Management",
		"territory-control": "Territory Control",
		"reports-payouts": "Reports & Payouts",
		"user-management": "User Management",
		settings: "Settings",
		help: "Help",
	};

	const segments = pathname.split("/").filter(Boolean);
	const lastSegment = segments[segments.length - 1];

	if (!lastSegment) return null;

	const title =
		segmentMap[lastSegment] || lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

	return (
		<div className="flex items-center gap-2 text-[15px] font-bold text-[#1d4ea8]">
			<Icon icon="solar:alt-arrow-right-bold" className="size-4 text-[#fab005]" />
			<span className="tracking-tight">{title}</span>
		</div>
	);
}
