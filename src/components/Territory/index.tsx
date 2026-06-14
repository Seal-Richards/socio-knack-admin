"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useGetTerritories, useDeleteTerritory } from "@/hooks/useTerritory";
import { toast } from "@/lib/toast";
import type { TerritoryData } from "@/types/territory";
import ZoneTab from "./ZoneTab";
import TeritoryMap from "./TeritoryMap";
import TeritoryDetails from "./TeritoryDetails";
import TeritoryAgent from "./TeritoryAgent";
import CreateTaskModal from "../_modals/CreateTaskModal";
import CreateZoneModal from "../_modals/CreateZoneModal";
import ConfirmDeleteModal from "../_modals/ConfirmDeleteModal";

export default function Territory() {
	const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [drawnCoordinates, setDrawnCoordinates] = useState<Array<{
		lat: number;
		lng: number;
	}> | null>(null);
	const [isCreateZoneModalOpen, setIsCreateZoneModalOpen] = useState(false);
	const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
	const [zoneToEdit, setZoneToEdit] = useState<TerritoryData | null>(null);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

	const { data: territoriesRes, isLoading } = useGetTerritories();
	const deleteTerritoryMutation = useDeleteTerritory();
	const zones = useMemo(() => territoriesRes?.data || [], [territoriesRes?.data]);

	// Automatically select the first zone if none is selected
	useEffect(() => {
		if (zones.length > 0 && selectedZoneId === null) {
			const firstZone = zones[0];
			if (firstZone?._id) {
				setSelectedZoneId(firstZone._id);
			}
		}
	}, [zones, selectedZoneId]);

	const selectedZone = zones.find((z) => z._id === selectedZoneId) || null;

	const handleSaveTerritory = (coords: Array<{ lat: number; lng: number }>) => {
		setDrawnCoordinates(coords);
		setZoneToEdit(null);
		setIsCreateZoneModalOpen(true);
	};

	const handleAddZoneClick = () => {
		setIsDrawing(true);
	};

	const handleDeleteConfirm = async () => {
		if (!selectedZoneId) return;
		try {
			const res = await deleteTerritoryMutation.mutateAsync(selectedZoneId);
			if (res.success) {
				toast.success("Zone deleted successfully!");
				setIsConfirmDeleteOpen(false);
				setSelectedZoneId(null);
			} else {
				toast.error(res.message || "Failed to delete zone.");
			}
		} catch (err: unknown) {
			const errMsg = err instanceof Error ? err.message : "Failed to delete zone.";
			toast.error(errMsg);
		}
	};

	return (
		<div className="flex w-full flex-col gap-4 p-4 lg:h-[calc(100vh-100px)] lg:overflow-hidden">
			{/* Top Column: Map View (takes priority horizontal space) */}
			<div className="min-h-[400px] w-full flex-1 rounded-2xl shadow-sm lg:min-h-0">
				<TeritoryMap
					zones={zones}
					selectedZoneId={selectedZoneId}
					isDrawing={isDrawing}
					setIsDrawing={setIsDrawing}
					onSaveTerritory={handleSaveTerritory}
				/>
			</div>

			{/* Bottom Panel: Split Zone List and Zone Details */}
			<div className="flex w-full shrink-0 flex-col gap-4 lg:h-[350px] lg:flex-row">
				{/* Bottom Left: Zone Switching */}
				<div className="flex h-[400px] w-full shrink-0 flex-col gap-4 lg:h-full lg:w-[320px]">
					<Button
						onClick={() => setIsCreateTaskModalOpen(true)}
						className="h-11 w-full gap-2 rounded-xl bg-[#1d4ea8] px-5 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 lg:h-12 lg:px-6 lg:text-[15px]"
					>
						<Icon icon="lucide:plus" className="size-4" />
						Create New Task
					</Button>
					<ZoneTab
						zones={zones}
						isLoading={isLoading}
						selectedZoneId={selectedZoneId}
						setSelectedZoneId={setSelectedZoneId}
						onAddZoneClick={handleAddZoneClick}
					/>
				</div>

				{/* Bottom Right: Unified Details & Agents Panel */}
				<div className="custom-scrollbar w-full flex-1 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:flex lg:h-full lg:overflow-y-auto lg:p-6">
					<TeritoryDetails
						selectedZone={selectedZone}
						onEditClick={() => {
							setZoneToEdit(selectedZone);
							setIsCreateZoneModalOpen(true);
						}}
						onDeleteClick={() => {
							setIsConfirmDeleteOpen(true);
						}}
					/>
					<div className="mt-6 lg:mt-8">
						<TeritoryAgent selectedZone={selectedZone} />
					</div>
				</div>
			</div>

			<CreateTaskModal
				isOpen={isCreateTaskModalOpen}
				onClose={() => setIsCreateTaskModalOpen(false)}
			/>

			<CreateZoneModal
				isOpen={isCreateZoneModalOpen}
				onClose={() => {
					setIsCreateZoneModalOpen(false);
					setDrawnCoordinates(null);
					setIsDrawing(false);
					setZoneToEdit(null);
				}}
				coordinates={drawnCoordinates}
				zoneToEdit={zoneToEdit}
				onSuccess={() => {
					setDrawnCoordinates(null);
					setIsDrawing(false);
					setZoneToEdit(null);
				}}
			/>

			<ConfirmDeleteModal
				isOpen={isConfirmDeleteOpen}
				onClose={() => setIsConfirmDeleteOpen(false)}
				onConfirm={handleDeleteConfirm}
				isLoading={deleteTerritoryMutation.isPending}
				title="Delete Zone"
				description={`Are you sure you want to delete the zone "${selectedZone?.name || ""}"? All assigned agents will be unassigned.`}
			/>
		</div>
	);
}
