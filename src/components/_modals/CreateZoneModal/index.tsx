"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/_modals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetSupervisors } from "@/hooks/useTeam";
import { useGetAgents } from "@/hooks/useAgent";
import { useCreateTerritory, useUpdateTerritory } from "@/hooks/useTerritory";
import { type CreateTerritoryPayload } from "@/lib/requests/territory";
import { toast } from "@/lib/toast";
import cn from "@/lib/utils";
import { Icon } from "@iconify/react";
import type { TerritoryData } from "@/types/territory";

interface CreateZoneModalProps {
	isOpen: boolean;
	onClose: () => void;
	coordinates: Array<{ lat: number; lng: number }> | null;
	onSuccess?: () => void;
	zoneToEdit?: TerritoryData | null;
}

const PALETTE = [
	{ name: "Green", hex: "#10b981", bgClass: "bg-[#10b981]" },
	{ name: "Orange", hex: "#f59e0b", bgClass: "bg-[#f59e0b]" },
	{ name: "Blue", hex: "#1d4ea8", bgClass: "bg-[#1d4ea8]" },
	{ name: "Red", hex: "#ef4444", bgClass: "bg-[#ef4444]" },
	{ name: "Purple", hex: "#8b5cf6", bgClass: "bg-[#8b5cf6]" },
	{ name: "Pink", hex: "#ec4899", bgClass: "bg-[#ec4899]" },
];

export default function CreateZoneModal({
	isOpen,
	onClose,
	coordinates,
	onSuccess,
	zoneToEdit = null,
}: CreateZoneModalProps) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [color, setColor] = useState("#10b981");
	const [supervisorId, setSupervisorId] = useState<string>("");
	const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
	const [salesTarget, setSalesTarget] = useState<string>("");
	const [warningMessage, setWarningMessage] = useState("");

	const { data: supervisorsRes, isLoading: loadingSupervisors } = useGetSupervisors();
	const { data: agentsRes, isLoading: loadingAgents } = useGetAgents();
	const createTerritoryMutation = useCreateTerritory();
	const updateTerritoryMutation = useUpdateTerritory();

	const supervisors = supervisorsRes?.data || [];
	const agents = agentsRes?.data || [];

	// Populate form fields if editing
	useEffect(() => {
		if (zoneToEdit) {
			setName(zoneToEdit.name || "");
			setDescription(zoneToEdit.description || "");
			setColor(zoneToEdit.color || "#10b981");
			setSalesTarget(zoneToEdit.salesTarget ? String(zoneToEdit.salesTarget) : "");
			setSupervisorId(
				zoneToEdit.assignedSupervisor?._id ||
					zoneToEdit.assignedSupervisor?.id ||
					(typeof zoneToEdit.assignedSupervisor === "string"
						? zoneToEdit.assignedSupervisor
						: ""),
			);
			setSelectedAgents(
				zoneToEdit.assignedAgents
					?.map((a) => a._id || a.id || "")
					.filter((id) => id !== "") || [],
			);
			setWarningMessage(zoneToEdit.warningMessage || "");
		} else {
			setName("");
			setDescription("");
			setColor("#10b981");
			setSalesTarget("");
			setSupervisorId("");
			setSelectedAgents([]);
			setWarningMessage("");
		}
	}, [zoneToEdit, isOpen]);

	const handleAgentToggle = (agentId: string) => {
		setSelectedAgents((prev) =>
			prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId],
		);
	};

	let agentListContent;
	if (loadingAgents) {
		agentListContent = <p className="text-sm text-gray-400">Loading agents...</p>;
	} else if (agents.length === 0) {
		agentListContent = (
			<p className="text-sm text-gray-400">No agents registered in business</p>
		);
	} else {
		agentListContent = agents.map((agent) => {
			const isChecked = selectedAgents.includes(agent.id || agent._id || "");
			const fullName = `${agent.firstName || ""} ${agent.lastName || ""}`.trim();
			return (
				<button
					key={agent.id || agent._id}
					type="button"
					onClick={() => handleAgentToggle(agent.id || agent._id || "")}
					className="flex w-full items-center gap-3 py-1 text-left"
				>
					<div
						className={cn(
							"size-5 rounded border transition-colors flex items-center justify-center",
							isChecked
								? "border-[#1d4ea8] bg-[#1d4ea8] text-white"
								: "border-gray-300 bg-white",
						)}
					>
						{isChecked && <Icon icon="lucide:check" className="size-3.5" />}
					</div>
					<span className="text-[13px] font-medium text-gray-700">{fullName}</span>
				</button>
			);
		});
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) {
			toast.error("Zone Name is required.");
			return;
		}

		if (!zoneToEdit && (!coordinates || coordinates.length < 3)) {
			toast.error("Please draw a valid boundary shape on the map first.");
			return;
		}

		let formattedCoordinates: number[][] = [];
		if (coordinates && coordinates.length >= 3) {
			formattedCoordinates = coordinates.map((coord) => [coord.lng, coord.lat]);

			// Ensure the polygon loop is closed for MongoDB GeoJSON 2dsphere specifications
			if (
				formattedCoordinates.length > 0 &&
				formattedCoordinates[0] &&
				formattedCoordinates[formattedCoordinates.length - 1]
			) {
				const first = formattedCoordinates[0];
				const last = formattedCoordinates[formattedCoordinates.length - 1];
				if (
					first &&
					last &&
					first[0] !== undefined &&
					first[1] !== undefined &&
					last[0] !== undefined &&
					last[1] !== undefined &&
					(first[0] !== last[0] || first[1] !== last[1])
				) {
					formattedCoordinates.push([first[0], first[1]]);
				}
			}
		}

		try {
			if (zoneToEdit) {
				const payload: Partial<CreateTerritoryPayload> = {
					name: name.trim(),
					description: description.trim(),
					color,
					assignedSupervisor: supervisorId || null,
					assignedAgents: selectedAgents,
					salesTarget: salesTarget !== "" ? Number(salesTarget) : undefined,
					warningMessage: warningMessage.trim(),
				};

				if (formattedCoordinates.length >= 3) {
					payload.boundary = {
						type: "Polygon",
						coordinates: [formattedCoordinates],
					};
				}

				const res = await updateTerritoryMutation.mutateAsync({
					id: zoneToEdit._id,
					payload,
				});
				if (res.success) {
					toast.success("Zone updated successfully!");
					onClose();
					if (onSuccess) onSuccess();
				} else {
					toast.error(res.message || "Failed to update zone.");
				}
			} else {
				if (formattedCoordinates.length < 3) {
					toast.error("Please draw a valid boundary shape on the map first.");
					return;
				}

				const payload: CreateTerritoryPayload = {
					name: name.trim(),
					description: description.trim(),
					color,
					boundary: {
						type: "Polygon",
						coordinates: [formattedCoordinates],
					},
					assignedSupervisor: supervisorId || null,
					assignedAgents: selectedAgents,
					salesTarget: salesTarget !== "" ? Number(salesTarget) : 0,
					warningMessage: warningMessage.trim(),
				};

				const res = await createTerritoryMutation.mutateAsync(payload);
				if (res.success) {
					toast.success("Zone created successfully!");
					setName("");
					setDescription("");
					setColor("#10b981");
					setSalesTarget("");
					setSupervisorId("");
					setSelectedAgents([]);
					setWarningMessage("");
					onClose();
					if (onSuccess) onSuccess();
				} else {
					toast.error(res.message || "Failed to create zone.");
				}
			}
		} catch (err: unknown) {
			const errMsg = err instanceof Error ? err.message : "Failed to save zone.";
			toast.error(errMsg);
		}
	};

	const isPending = createTerritoryMutation.isPending || updateTerritoryMutation.isPending;

	let buttonText = "Create Zone";
	if (isPending) {
		buttonText = zoneToEdit ? "Updating Zone..." : "Creating Zone...";
	} else {
		buttonText = zoneToEdit ? "Update Zone" : "Create Zone";
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={zoneToEdit ? "Update Zone Details" : "Complete Zone Details"}
			className="max-w-lg text-gray-800"
		>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="custom-scrollbar flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-2">
					{/* Zone Name */}
					<div className="space-y-2">
						<Label htmlFor="zone-name" className="text-[14px] font-bold text-gray-700">
							Zone Name
						</Label>
						<Input
							id="zone-name"
							placeholder="e.g. Yaba Zone"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label
							htmlFor="zone-description"
							className="text-[14px] font-bold text-gray-700"
						>
							Description
						</Label>
						<Textarea
							id="zone-description"
							placeholder="Brief details about the zone coverage..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="min-h-[80px] rounded-xl border-gray-100 bg-gray-50/50 p-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					{/* Monthly Sales Target */}
					<div className="space-y-2">
						<Label
							htmlFor="zone-sales-target"
							className="text-[14px] font-bold text-gray-700"
						>
							Monthly Sales Target (₦)
						</Label>
						<Input
							id="zone-sales-target"
							type="number"
							min="0"
							placeholder="e.g. 500000"
							value={salesTarget}
							onChange={(e) => setSalesTarget(e.target.value)}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<p className="text-[12px] text-gray-400">
							This is the zone&apos;s total expected monthly revenue target from agent
							sales.
						</p>
					</div>

					{/* Warning Message */}
					<div className="space-y-2">
						<Label
							htmlFor="zone-warning-message"
							className="text-[14px] font-bold text-gray-700"
						>
							&quot;Not In Zone&quot; Warning Message
						</Label>
						<Input
							id="zone-warning-message"
							placeholder="e.g. You are currently outside your assigned zone boundaries. Please move to your assigned zone."
							value={warningMessage}
							onChange={(e) => setWarningMessage(e.target.value)}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<p className="text-[12px] text-gray-400">
							This message will display as a warning modal to the sales agent if they
							attempt to start a visit outside this zone&apos;s boundaries.
						</p>
					</div>

					{/* Color Selection */}
					<div className="space-y-2">
						<Label className="text-[14px] font-bold text-gray-700">
							Zone Border/Fill Color
						</Label>
						<div className="flex items-center gap-3">
							{PALETTE.map((item) => (
								<button
									key={item.hex}
									type="button"
									onClick={() => setColor(item.hex)}
									aria-label={item.name}
									className={cn(
										"size-8 rounded-full border-2 transition-all flex items-center justify-center",
										item.bgClass,
										color === item.hex
											? "scale-110 border-gray-900 shadow-sm"
											: "border-transparent hover:scale-105",
									)}
								>
									{color === item.hex && (
										<Icon icon="lucide:check" className="size-4 text-white" />
									)}
								</button>
							))}
						</div>
					</div>

					{/* Assign Supervisor */}
					<div className="space-y-2">
						<Label
							htmlFor="zone-supervisor"
							className="text-[14px] font-bold text-gray-700"
						>
							Assign Supervisor
						</Label>
						<Select onValueChange={setSupervisorId} value={supervisorId}>
							<SelectTrigger
								id="zone-supervisor"
								className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-gray-800 focus:border-[#1d4ea8] focus:ring-0"
							>
								<SelectValue
									placeholder={
										loadingSupervisors
											? "Loading supervisors..."
											: "Select Supervisor"
									}
								/>
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100 shadow-xl">
								{supervisors.map((s) => (
									<SelectItem key={s.id || s._id} value={s.id || s._id || ""}>
										{`${s.firstName || ""} ${s.lastName || ""}`.trim()}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Assign Agents List */}
					<div className="space-y-2">
						<Label className="text-[14px] font-bold text-gray-700">
							Assign Field Agents
						</Label>
						<div className="custom-scrollbar flex max-h-[150px] flex-col gap-2 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50/50 p-4">
							{agentListContent}
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-3 pt-2">
					<Button
						type="submit"
						disabled={isPending}
						className="h-12 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 disabled:opacity-50"
					>
						{buttonText}
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={onClose}
						className="h-12 w-full rounded-xl text-[15px] font-bold text-gray-500 hover:bg-gray-50"
					>
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	);
}
