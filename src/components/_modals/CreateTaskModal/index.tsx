"use client";

import React, { useState } from "react";
import Modal from "@/components/_modals";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import { useCreateVisit } from "@/hooks/useDashboard";
import { toast } from "@/lib/toast";
import { type TaskFormData } from "@/schemas/task";
import BasicInfo from "./BasicInfo";
import Location from "./Location";
import Checklist from "./Checklist";
import SummaryTab from "./Summary";

interface CreateTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
}

type TabValue = "basic" | "location" | "checklist" | "summary";

export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
	const [activeTab, setActiveTab] = useState<TabValue>("basic");

	const [formData, setFormData] = useState<TaskFormData>({
		title: "",
		scheduledDate: new Date().toISOString().split("T")[0] || "",
		scheduledTime: "10:00",
		priority: "Medium",
		agentId: "",
		territoryId: "",
		address: "",
		coordinates: [] as number[], // [lng, lat]
		description: "",
		checklist: [] as Array<{ title: string; isCompleted: boolean }>,
	});

	const createVisitMutation = useCreateVisit();

	const updateFormData = (fields: Partial<typeof formData>) => {
		setFormData((prev) => ({ ...prev, ...fields }));
	};

	const handlePublish = async () => {
		// Construct datetime string
		let isoDateStr = new Date().toISOString();
		try {
			const dt = new Date(`${formData.scheduledDate}T${formData.scheduledTime}:00`);
			if (!Number.isNaN(dt.getTime())) {
				isoDateStr = dt.toISOString();
			}
		} catch (e) {
			console.error("Failed to parse datetime:", e);
		}

		const payload = {
			title: formData.title.trim(),
			scheduledDate: isoDateStr,
			agentId: formData.agentId,
			territoryId: formData.territoryId || undefined,
			location: formData.address
				? {
						address: formData.address,
						coordinates: formData.coordinates,
					}
				: undefined,
			priority: formData.priority.toLowerCase(),
			subtitle: formData.description.trim() || undefined,
			checklist: formData.checklist,
		};

		try {
			const res = await createVisitMutation.mutateAsync(payload);
			if (res.success) {
				toast.success("Task scheduled successfully!");
				// Reset Form
				setFormData({
					title: "",
					scheduledDate: new Date().toISOString().split("T")[0] || "",
					scheduledTime: "10:00",
					priority: "Medium",
					agentId: "",
					territoryId: "",
					address: "",
					coordinates: [],
					description: "",
					checklist: [],
				});
				setActiveTab("basic");
				onClose();
			} else {
				toast.error(res.message || "Failed to schedule task.");
			}
		} catch (err: unknown) {
			toast.error(err instanceof Error ? err.message : "Failed to schedule task.");
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-[580px]">
			<div className="flex flex-col gap-6">
				{/* Custom Header with Close Button */}
				<div className="flex items-center justify-between">
					<h2 className="text-[18px] font-bold text-gray-800">Create New Task</h2>
					<button
						onClick={onClose}
						className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-blue-50 text-[#1d4ea8] transition-colors hover:bg-blue-100"
					>
						<Icon icon="lucide:x" className="size-5" />
					</button>
				</div>

				<Tabs
					value={activeTab}
					onValueChange={(v) => setActiveTab(v as TabValue)}
					className="w-full"
				>
					<TabsList className="flex h-auto w-full justify-start gap-6 rounded-none border-b border-gray-100 bg-transparent p-0 pb-2">
						<TabsTrigger
							value="basic"
							disabled={activeTab !== "basic" && !formData.title}
							className="relative rounded-none border-b-2 border-transparent px-0 pb-2 text-[14px] font-medium text-gray-400 transition-all data-[state=active]:border-[#1d4ea8] data-[state=active]:text-[#1d4ea8] data-[state=active]:shadow-none"
						>
							Basic Information
						</TabsTrigger>
						<TabsTrigger
							value="location"
							disabled={!formData.title || !formData.agentId}
							className="relative rounded-none border-b-2 border-transparent px-0 pb-2 text-[14px] font-medium text-gray-400 transition-all data-[state=active]:border-[#1d4ea8] data-[state=active]:text-[#1d4ea8] data-[state=active]:shadow-none"
						>
							Location
						</TabsTrigger>
						<TabsTrigger
							value="checklist"
							disabled={!formData.address}
							className="relative rounded-none border-b-2 border-transparent px-0 pb-2 text-[14px] font-medium text-gray-400 transition-all data-[state=active]:border-[#1d4ea8] data-[state=active]:text-[#1d4ea8] data-[state=active]:shadow-none"
						>
							Checklist
						</TabsTrigger>
						<TabsTrigger
							value="summary"
							disabled={formData.checklist.length === 0}
							className="relative rounded-none border-b-2 border-transparent px-0 pb-2 text-[14px] font-medium text-gray-400 transition-all data-[state=active]:border-[#1d4ea8] data-[state=active]:text-[#1d4ea8] data-[state=active]:shadow-none"
						>
							Summary
						</TabsTrigger>
					</TabsList>

					<div className="mt-8">
						{activeTab === "basic" && (
							<BasicInfo
								onNext={() => setActiveTab("location")}
								formData={formData}
								updateFormData={updateFormData}
							/>
						)}
						{activeTab === "location" && (
							<Location
								onNext={() => setActiveTab("checklist")}
								formData={formData}
								updateFormData={updateFormData}
							/>
						)}
						{activeTab === "checklist" && (
							<Checklist
								onNext={() => setActiveTab("summary")}
								formData={formData}
								updateFormData={updateFormData}
							/>
						)}
						{activeTab === "summary" && (
							<SummaryTab
								onPublish={handlePublish}
								formData={formData}
								isPublishing={createVisitMutation.isPending}
							/>
						)}
					</div>
				</Tabs>
			</div>
		</Modal>
	);
}
