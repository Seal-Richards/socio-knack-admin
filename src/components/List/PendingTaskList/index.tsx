"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

interface PendingTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
}

export default function PendingTaskList({ tasks }: PendingTaskListProps) {
	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={{ ...task, statusColor: "red" }} />
			))}
		</div>
	);
}
