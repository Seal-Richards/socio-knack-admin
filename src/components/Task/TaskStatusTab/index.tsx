"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Tabs from "@/components/Tabs";
import { Button } from "@/components/ui/button";
import { TASK_TABS } from "@/constants/dashboard";
import OngoingTaskList from "@/components/List/OngoingTaskList";
import TodayTaskList from "@/components/List/TodayTaskList";
import UpcomingTaskList from "@/components/List/UpcomingTaskList";
import CompletedTaskList from "@/components/List/CompletedTaskList";
import PendingTaskList from "@/components/List/PendingTaskList";
import OpenTaskList from "@/components/List/OpenTaskList";
import CancelledTaskList from "@/components/List/CancelledTaskList";
import { useGetDashboardVisits } from "@/hooks/useDashboard";
import VisitDetailsModal from "@/components/_modals/VisitDetailsModal";
import type { TaskItemProps } from "@/components/Task/TaskListItem";
import Pagination from "@/components/_atoms/Pagination";

interface AgentData {
	firstName: string;
	lastName: string;
	avatar: string;
}

interface TerritoryData {
	name: string;
}

interface LocationData {
	address: string;
}

interface TaskStatusTabProps {
	isModalView?: boolean;
	onSeeMore?: () => void;
}

export default function TaskStatusTab({ isModalView, onSeeMore }: TaskStatusTabProps = {}) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("Ongoing");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedVisit, setSelectedVisit] = useState<Record<string, unknown> | null>(null);
	const [mounted, setMounted] = useState(false);

	const ITEMS_PER_PAGE = 5;

	// Reset page when tab changes
	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		setCurrentPage(1);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	const { data: visitsRes } = useGetDashboardVisits();
	const visits = (visitsRes?.data as unknown as Array<Record<string, unknown>>) || [];

	// Format visits to match TaskItemProps
	const formattedVisits = visits.map((visit) => {
		let displayDateVal = visit.scheduledDate;
		if (visit.status === "completed") {
			displayDateVal =
				visit.checkOutTime || visit.checkInTime || visit.updatedAt || visit.scheduledDate;
		} else if (visit.status === "inProgress") {
			displayDateVal = visit.checkInTime || visit.updatedAt || visit.scheduledDate;
		}

		const scheduledDate = (displayDateVal as string) || new Date().toISOString();
		const dt = new Date(scheduledDate);
		const agentId = visit.agentId as AgentData | undefined;
		const territoryId = visit.territoryId as TerritoryData | undefined;
		const location = visit.location as LocationData | undefined;

		return {
			id: visit._id as string,
			agentName: agentId ? `${agentId.firstName} ${agentId.lastName}` : "Unknown Agent",
			avatar: agentId?.avatar || "",
			date: mounted ? dt.toLocaleDateString() : "",
			time: mounted
				? dt.toLocaleTimeString("en-US", {
						hour: "numeric",
						minute: "2-digit",
						hour12: true,
					})
				: "",
			location: territoryId?.name || "Unknown Zone",
			subLocation: location?.address || "N/A",
			distance: (visit.distanceFromAgent as string) || "",
			status: visit.status as string,
			raw: visit,
		};
	});

	const ongoingTasks = formattedVisits.filter(
		(v) => v.status === "inProgress" || v.status === "open",
	);
	const todayTasks = formattedVisits.filter(
		(v) =>
			new Date(v.raw.scheduledDate as string).toDateString() === new Date().toDateString() &&
			v.status !== "completed",
	);
	const upcomingTasks = formattedVisits.filter(
		(v) => v.status === "upcoming" || v.status === "scheduled",
	);
	const openTasks = formattedVisits.filter((v) => v.status === "open");
	const completedTasks = formattedVisits.filter((v) => v.status === "completed");
	const pendingTasks = formattedVisits.filter((v) => v.status === "pending");
	const cancelledTasks = formattedVisits.filter(
		(v) => v.status === "cancelled" || v.status === "rejected",
	);

	const handleViewVisit = (task: Omit<TaskItemProps, "statusColor">) => {
		if (task.raw) {
			setSelectedVisit(task.raw);
		}
	};

	const getCurrentTasks = () => {
		switch (activeTab) {
			case "Ongoing":
				return ongoingTasks;
			case "Today":
				return todayTasks;
			case "Upcoming":
				return upcomingTasks;
			case "Open":
				return openTasks;
			case "Completed":
				return completedTasks;
			case "Pending":
				return pendingTasks;
			case "Cancelled":
				return cancelledTasks;
			default:
				return ongoingTasks;
		}
	};

	const currentTasks = getCurrentTasks();
	const totalPages = Math.max(1, Math.ceil(currentTasks.length / ITEMS_PER_PAGE));
	const paginatedTasks = currentTasks.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	return (
		<div
			className={
				isModalView
					? "flex flex-col gap-6"
					: "flex flex-col gap-6 rounded-3xl border border-gray-50 bg-white p-5 shadow-sm lg:rounded-[2.5rem] lg:p-8"
			}
		>
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div className="flex items-center gap-4 lg:gap-6">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1d4ea8]/5 text-[#1d4ea8]">
						<Icon icon="lucide:clock" className="size-5" />
					</div>
					<Tabs
						tabs={TASK_TABS}
						activeTab={activeTab}
						onChange={handleTabChange}
						className="w-full overflow-x-auto border-none sm:w-auto"
					/>
				</div>
				{onSeeMore ? (
					<button
						onClick={onSeeMore}
						className="flex shrink-0 items-center gap-2 text-[13px] font-bold text-[#1d4ea8] hover:underline"
					>
						<Icon icon="solar:eye-bold" className="size-4" />
						See More
					</button>
				) : (
					!isModalView && (
						<Button
							onClick={() => router.push("/territory-control")}
							className="h-11 gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-6 text-[13px] font-bold text-[#1d4ea8] shadow-none transition-all hover:bg-blue-50 active:scale-95"
						>
							<Icon icon="lucide:plus-circle" className="size-4" />
							Create Task
						</Button>
					)
				)}
			</div>

			<div className="flex flex-col gap-3">
				{activeTab === "Ongoing" && (
					<OngoingTaskList tasks={paginatedTasks} onView={handleViewVisit} />
				)}
				{activeTab === "Today" && (
					<TodayTaskList tasks={paginatedTasks} onView={handleViewVisit} />
				)}
				{activeTab === "Upcoming" && (
					<UpcomingTaskList tasks={paginatedTasks} onView={handleViewVisit} />
				)}
				{activeTab === "Open" && (
					<OpenTaskList tasks={paginatedTasks} onView={handleViewVisit} />
				)}
				{activeTab === "Completed" && (
					<CompletedTaskList tasks={paginatedTasks} onView={handleViewVisit} />
				)}
				{activeTab === "Pending" && (
					<PendingTaskList tasks={paginatedTasks} onView={handleViewVisit} />
				)}
				{activeTab === "Cancelled" && (
					<CancelledTaskList tasks={paginatedTasks} onView={handleViewVisit} />
				)}

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
					className="mt-4"
				/>
			</div>

			{selectedVisit && (
				<VisitDetailsModal
					isOpen={!!selectedVisit}
					onClose={() => setSelectedVisit(null)}
					visit={selectedVisit}
				/>
			)}
		</div>
	);
}
