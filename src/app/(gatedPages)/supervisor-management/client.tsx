"use client";

import SupervisorManagementList from "@/components/List/SupervisorManagementList";
import RouteWrapper from "@/layouts/RouteWrapper";

export default function SupervisorManagementClient() {
	return (
		<RouteWrapper>
			<SupervisorManagementList />
		</RouteWrapper>
	);
}
