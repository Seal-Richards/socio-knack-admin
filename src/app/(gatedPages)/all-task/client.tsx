"use client";

import React from "react";
import TaskStatusTab from "@/components/Task/TaskStatusTab";
import RouteWrapper from "@/layouts/RouteWrapper";

export default function AllTaskClient() {
	return (
		<RouteWrapper>
			<TaskStatusTab />
		</RouteWrapper>
	);
}
