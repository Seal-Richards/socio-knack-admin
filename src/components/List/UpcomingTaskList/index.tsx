"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

interface UpcomingTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
}

export default function UpcomingTaskList({ tasks }: UpcomingTaskListProps) {
	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={{ ...task, statusColor: "yellow" }} />
			))}
		</div>
	);
}
