"use client";

import React from "react";
import Modal from "@/components/_modals";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
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
	const [activeTab, setActiveTab] = React.useState<TabValue>("basic");

	const handlePublish = () => {
		// Logic to publish task
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-[580px]">
			<div className="flex flex-col gap-6">
				{/* Custom Header with Close Button */}
				<div className="flex items-center justify-between">
					<h2 className="text-[18px] font-bold text-gray-800">Create New Task</h2>
					<button
						onClick={onClose}
						className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-[#1d4ea8] transition-colors hover:bg-blue-100"
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
							className="relative rounded-none border-b-2 border-transparent px-0 pb-2 text-[14px] font-medium text-gray-400 transition-all data-[state=active]:border-[#1d4ea8] data-[state=active]:text-[#1d4ea8] data-[state=active]:shadow-none data-[state=active]:after:absolute"
						>
							Basic Information
						</TabsTrigger>
						<TabsTrigger
							value="location"
							className="relative rounded-none border-b-2 border-transparent px-0 pb-2 text-[14px] font-medium text-gray-400 transition-all data-[state=active]:border-[#1d4ea8] data-[state=active]:text-[#1d4ea8] data-[state=active]:shadow-none"
						>
							Location
						</TabsTrigger>
						<TabsTrigger
							value="checklist"
							className="relative rounded-none border-b-2 border-transparent px-0 pb-2 text-[14px] font-medium text-gray-400 transition-all data-[state=active]:border-[#1d4ea8] data-[state=active]:text-[#1d4ea8] data-[state=active]:shadow-none"
						>
							Checklist
						</TabsTrigger>
						<TabsTrigger
							value="summary"
							className="relative rounded-none border-b-2 border-transparent px-0 pb-2 text-[14px] font-medium text-gray-400 transition-all data-[state=active]:border-[#1d4ea8] data-[state=active]:text-[#1d4ea8] data-[state=active]:shadow-none"
						>
							Summary
						</TabsTrigger>
					</TabsList>

					<div className="mt-8">
						{activeTab === "basic" && (
							<BasicInfo onNext={() => setActiveTab("location")} />
						)}
						{activeTab === "location" && (
							<Location onNext={() => setActiveTab("checklist")} />
						)}
						{activeTab === "checklist" && (
							<Checklist onNext={() => setActiveTab("summary")} />
						)}
						{activeTab === "summary" && <SummaryTab onPublish={handlePublish} />}
					</div>
				</Tabs>
			</div>
		</Modal>
	);
}
