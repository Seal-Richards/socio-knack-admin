"use client";

import React from "react";
import TaskListItem, { type TaskItemProps } from "@/components/Task/TaskListItem";
import Empty from "@/components/_atoms/Empty";

interface OpenTaskListProps {
	tasks: Omit<TaskItemProps, "statusColor">[];
	onView?: (task: Omit<TaskItemProps, "statusColor">) => void;
}

export default function OpenTaskList({ tasks, onView }: OpenTaskListProps) {
	if (!tasks || tasks.length === 0) {
		return (
			<Empty
				title="No Open Tasks"
				description="There are currently no tasks in open status."
				icon="solar:info-circle-bold-duotone"
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskListItem
					key={task.id}
					task={{ ...task, statusColor: "blue" }}
					onView={onView ? () => onView(task) : undefined}
				/>
			))}
		</div>
	);
}
