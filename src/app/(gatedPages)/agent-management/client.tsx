"use client";

import AgentManagementList from "@/components/List/AgentManagementList";
import RouteWrapper from "@/layouts/RouteWrapper";

export default function AgentManagementClient() {
	return (
		<RouteWrapper>
			<AgentManagementList />
		</RouteWrapper>
	);
}
