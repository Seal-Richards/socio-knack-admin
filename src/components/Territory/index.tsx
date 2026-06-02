"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import ZoneTab from "./ZoneTab";
import TeritoryMap from "./TeritoryMap";
import TeritoryDetails from "./TeritoryDetails";
import TeritoryAgent from "./TeritoryAgent";
import CreateTaskModal from "../_modals/CreateTaskModal";

export default function Territory() {
	const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

	return (
		<div className="flex flex-col gap-4 p-4 lg:h-[calc(100vh-140px)] lg:flex-row lg:overflow-hidden">
			{/* Left Column: Zone Switching */}
			<div className="flex w-full shrink-0 flex-col gap-4 lg:h-full lg:w-[320px]">
				<Button
					onClick={() => setIsCreateTaskModalOpen(true)}
					className="h-11 w-full gap-2 rounded-xl bg-[#1d4ea8] px-5 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 lg:h-12 lg:px-6 lg:text-[15px]"
				>
					<Icon icon="lucide:plus" className="size-4" />
					Create New Task
				</Button>
				<ZoneTab />
			</div>

			{/* Middle Column: Map View */}
			<div className="min-h-[400px] w-full flex-1 lg:h-full">
				<TeritoryMap />
			</div>

			{/* Right Column: Unified Details & Agents Panel */}
			<div className="custom-scrollbar w-full shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:flex lg:h-full lg:w-[450px] lg:overflow-y-auto lg:p-6">
				<TeritoryDetails />
				<div className="mt-6 lg:mt-8">
					<TeritoryAgent />
				</div>
			</div>

			<CreateTaskModal
				isOpen={isCreateTaskModalOpen}
				onClose={() => setIsCreateTaskModalOpen(false)}
			/>
		</div>
	);
}
