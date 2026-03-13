"use client";

import RouteWrapper from "@/layouts/RouteWrapper";
import UserManagement from "@/components/List/UserManagement";

export default function UserManagementClient() {
	return (
		<RouteWrapper>
			<UserManagement />
		</RouteWrapper>
	);
}
