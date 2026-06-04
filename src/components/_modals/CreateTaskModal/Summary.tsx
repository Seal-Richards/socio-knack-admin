"use client";

import React, { useMemo } from "react";
import { useGetAgents } from "@/hooks/useAgent";
import { useGetTerritories } from "@/hooks/useTerritory";
import { Icon } from "@iconify/react";

import { type TaskFormData } from "@/schemas/task";

interface SummaryProps {
	onPublish: () => void;
	formData: TaskFormData;
	isPublishing: boolean;
}

export default function Summary({ onPublish, formData, isPublishing }: SummaryProps) {
	const { data: agentsRes } = useGetAgents();
	const { data: territoriesRes } = useGetTerritories();

	const agents = useMemo(() => agentsRes?.data || [], [agentsRes?.data]);
	const zones = useMemo(() => territoriesRes?.data || [], [territoriesRes?.data]);

	const assignedAgentName = useMemo(() => {
		const agent = agents.find((a) => a.id === formData.agentId || a._id === formData.agentId);
		return agent ? `${agent.firstName || ""} ${agent.lastName || ""}`.trim() : "Unknown Agent";
	}, [agents, formData.agentId]);

	const assignedZoneName = useMemo(() => {
		const zone = zones.find((z) => z._id === formData.territoryId);
		return zone ? zone.name : "Unknown Zone";
	}, [zones, formData.territoryId]);

	return (
		<div className="flex flex-col gap-6 text-gray-800">
			<div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
				{/* Task Name */}
				<div className="flex items-start justify-between border-b border-gray-100 pb-3">
					<div>
						<h3 className="text-[16px] font-bold text-gray-900">{formData.title}</h3>
						<p className="mt-0.5 text-[12px] font-semibold text-gray-400">Task Title</p>
					</div>
					<span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-[#1d4ea8]">
						{formData.priority} Priority
					</span>
				</div>

				<div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-3 text-xs font-semibold text-gray-600">
					{/* Agent */}
					<div>
						<span className="text-gray-450 mb-0.5 block font-medium">
							Assigned Agent
						</span>
						<span className="text-[13px] font-bold text-gray-800">
							{assignedAgentName}
						</span>
					</div>
					{/* Zone */}
					<div>
						<span className="text-gray-450 mb-0.5 block font-medium">Target Zone</span>
						<span className="text-[13px] font-bold text-gray-800">
							{assignedZoneName}
						</span>
					</div>
				</div>

				{/* Location Address */}
				<div className="border-b border-gray-100 pb-3">
					<span className="text-gray-450 mb-0.5 block text-[11px] font-medium">
						Address
					</span>
					<div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-800">
						<Icon
							icon="solar:map-point-bold"
							className="size-4 shrink-0 text-gray-400"
						/>
						<span className="truncate">{formData.address}</span>
					</div>
				</div>

				{/* Description */}
				{formData.description && (
					<div className="border-b border-gray-100 pb-3 text-xs">
						<span className="text-gray-450 mb-0.5 block font-medium">Description</span>
						<p className="font-semibold leading-relaxed text-gray-700">
							{formData.description}
						</p>
					</div>
				)}

				{/* Checklist Count */}
				<div>
					<span className="text-gray-450 mb-1 block text-xs font-medium">
						Checklist Tasks
					</span>
					<div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-800">
						<Icon icon="solar:checklist-bold" className="size-4.5 text-[#1d4ea8]" />
						<span>{formData.checklist.length} checklist items registered</span>
					</div>
				</div>
			</div>

			<button
				type="button"
				onClick={onPublish}
				disabled={isPublishing}
				className="mt-4 h-14 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-[0.98] disabled:opacity-50"
			>
				{isPublishing ? "Publishing Task..." : "Publish Task"}
			</button>
		</div>
	);
}
