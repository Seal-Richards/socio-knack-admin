"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";

import Empty from "@/components/_atoms/Empty";

interface PendingTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
	onView?: (task: Omit<TaskItemProps, "statusColor">) => void;
}

export default function PendingTaskList({ tasks, onView }: PendingTaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<Empty
				title="No Pending Tasks"
				description="There are no tasks waiting to be processed."
				icon="solar:clock-circle-bold-duotone"
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem
					key={task.id}
					task={{ ...task, statusColor: "red" }}
					onView={onView ? () => onView(task) : undefined}
				/>
			))}
		</div>
	);
}
