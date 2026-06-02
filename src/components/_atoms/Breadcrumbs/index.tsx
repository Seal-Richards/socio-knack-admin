"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

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

	// Helper to resolve dynamic segment titles
	const getSegmentTitle = (segment: string, isDynamic: boolean, prevSegment?: string) => {
		if (!isDynamic)
			return segmentMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

		// Mapping for dynamic IDs based on parent route
		if (prevSegment === "agent-management") return "Agent Profile";
		if (prevSegment === "supervisor-management") return "Supervisor Profile";

		return "Details";
	};

	const segments = pathname.split("/").filter(Boolean);

	if (segments.length === 0) return null;

	if (segments.length === 1) {
		const firstSegment = segments[0];
		if (!firstSegment) return null;

		const title =
			segmentMap[firstSegment] ||
			firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
		return (
			<div className="flex items-center gap-2 text-[15px] font-bold text-[#1d4ea8]">
				<Icon icon="solar:alt-arrow-right-bold" className="size-4 text-[#fab005]" />
				<span className="tracking-tight">{title}</span>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2 text-[14px] font-medium text-gray-500">
			{segments.map((segment, index) => {
				const isLast = index === segments.length - 1;
				// If a segment isn't explicitly in segmentMap and it's not the first, treat it as dynamic (e.g. ID)
				const isDynamic = !segmentMap[segment] && index > 0;
				const title = getSegmentTitle(segment, isDynamic, segments[index - 1]);

				if (index === 0) {
					return (
						<Link
							key={segment}
							href={`/${segment}`}
							className="flex items-center gap-2 transition-colors hover:text-[#1d4ea8]"
						>
							<Icon
								icon="solar:arrow-left-line-duotone"
								className="size-5 text-orange-400"
							/>
							{title}
						</Link>
					);
				}

				return (
					<React.Fragment key={segment}>
						<span className="text-gray-300">/</span>
						{isLast ? (
							<span className="font-bold text-gray-800">{title}</span>
						) : (
							<Link
								href={`/${segments.slice(0, index + 1).join("/")}`}
								className="transition-colors hover:text-[#1d4ea8]"
							>
								{title}
							</Link>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
}
