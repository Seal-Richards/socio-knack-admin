"use client";

import React from "react";
import SupervisorDetailsCard from "@/components/Cards/SupervisorDetailsCard";
import TerritorySalesTarget from "@/components/_widgets/TerritorySalesTarget";
import { Icon } from "@iconify/react";
import type { TerritoryData } from "@/types/territory";

interface TeritoryDetailsProps {
	selectedZone: TerritoryData | null;
	onEditClick?: () => void;
	onDeleteClick?: () => void;
}

export default function TeritoryDetails({
	selectedZone,
	onEditClick,
	onDeleteClick,
}: TeritoryDetailsProps) {
	if (!selectedZone) {
		return (
			<div className="flex h-36 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 p-6 text-center">
				<Icon icon="solar:map-point-linear" className="mb-2 size-8 text-gray-300" />
				<h3 className="text-[13px] font-bold text-gray-500">No Zone Selected</h3>
				<p className="mt-0.5 text-[11px] text-gray-400">
					Select a zone from the sidebar to view details
				</p>
			</div>
		);
	}

	const supervisor = selectedZone.assignedSupervisor;
	const creator = selectedZone.createdBy;

	const supervisorName = supervisor
		? `${supervisor.firstName || ""} ${supervisor.lastName || ""}`.trim()
		: null;

	const creatorName = creator
		? `${creator.firstName || ""} ${creator.lastName || ""}`.trim()
		: null;

	return (
		<div className="flex flex-col gap-6">
			<div>
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon
							icon="solar:map-point-bold-duotone"
							className="size-5"
							style={{ color: selectedZone.color }}
						/>
						<h2 className="text-lg font-black tracking-tight text-gray-900">
							Territory Details
						</h2>
						<span
							className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold"
							style={{
								backgroundColor: `${selectedZone.color}15`,
								color: selectedZone.color,
							}}
						>
							<span
								className="size-2 rounded-full"
								style={{ backgroundColor: selectedZone.color }}
							/>
							{selectedZone.name}
						</span>
					</div>
					<div className="flex items-center gap-2">
						{onEditClick && (
							<button
								onClick={onEditClick}
								className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-100 text-gray-400 transition-colors hover:border-gray-200 hover:bg-gray-50 hover:text-blue-600"
								title="Edit Zone"
							>
								<Icon icon="solar:pen-bold" className="size-4" />
							</button>
						)}
						{onDeleteClick && (
							<button
								onClick={onDeleteClick}
								className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-100 text-gray-400 transition-colors hover:border-gray-200 hover:bg-gray-50 hover:text-red-500"
								title="Delete Zone"
							>
								<Icon icon="solar:trash-bin-trash-bold" className="size-4" />
							</button>
						)}
					</div>
				</div>

				<h3 className="mb-4 text-[15px] font-black tracking-tight text-gray-900">
					Supervisor
				</h3>
				{supervisorName ? (
					<SupervisorDetailsCard
						id={supervisor?._id || supervisor?.id}
						name={supervisorName}
						designation="Assigned Supervisor"
						avatar={supervisor?.avatar || "/assets/images/admin-avatar.png"}
					/>
				) : (
					<div className="border-gray-150 rounded-xl border bg-gray-50/50 p-4 text-center text-xs font-semibold text-gray-400">
						No Supervisor Assigned
					</div>
				)}

				{creatorName && (
					<div className="mt-3 flex items-center gap-1.5 pl-1 text-xs font-medium text-gray-400">
						<Icon icon="solar:user-bold" className="size-3.5" />
						<span>Created by {creatorName}</span>
					</div>
				)}
			</div>

			<div className="border-t border-gray-50 pt-6">
				<h3 className="mb-4 text-[15px] font-black tracking-tight text-gray-900">
					Sales vs. Target
				</h3>
				<TerritorySalesTarget territoryId={selectedZone._id} />
			</div>
		</div>
	);
}
