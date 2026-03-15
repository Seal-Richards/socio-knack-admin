"use client";

import React from "react";
import Modal from "@/components/_modals";
import { Icon } from "@iconify/react";
import TaskStatusTab from "@/components/Task/TaskStatusTab";

interface AllTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AllTaskModal({ isOpen, onClose }: AllTaskModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} className="w-[95vw] sm:max-w-[1000px] lg:w-[80vw]">
			<div className="flex flex-col gap-6 md:gap-8">
				{/* Custom Header with Close Button */}
				<div className="flex items-center justify-between border-b border-gray-100 pb-5">
					<h2 className="text-[18px] font-bold text-gray-800">Visit Management</h2>
					<button
						onClick={onClose}
						className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-[#1d4ea8] transition-colors hover:bg-blue-100"
					>
						<Icon icon="lucide:x" className="size-5" />
					</button>
				</div>

				{/* Reuse the TaskStatusTab but hide the 'See More' button and outer styling */}
				<div className="px-1 pb-4">
					<TaskStatusTab isModalView />
				</div>
			</div>
		</Modal>
	);
}
