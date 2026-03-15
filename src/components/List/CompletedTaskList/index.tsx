"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

interface CompletedTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
}

export default function CompletedTaskList({ tasks }: CompletedTaskListProps) {
	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={{ ...task, statusColor: "green" }} />
			))}
		</div>
	);
}
