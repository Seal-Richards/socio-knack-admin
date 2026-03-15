"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

interface OngoingTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
}

export default function OngoingTaskList({ tasks }: OngoingTaskListProps) {
	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={{ ...task, statusColor: "blue" }} />
			))}
		</div>
	);
}
