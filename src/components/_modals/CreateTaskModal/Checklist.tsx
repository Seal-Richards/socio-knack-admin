"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { toast } from "@/lib/toast";

import { type TaskFormData } from "@/schemas/task";

interface ChecklistProps {
	onNext: () => void;
	formData: TaskFormData;
	updateFormData: (fields: Partial<TaskFormData>) => void;
}

export default function Checklist({ onNext, formData, updateFormData }: ChecklistProps) {
	const [newItemText, setNewItemText] = useState("");

	const handleAddChecklistItem = () => {
		if (!newItemText.trim()) {
			toast.error("Checklist item cannot be empty.");
			return;
		}

		const updatedChecklist = [
			...formData.checklist,
			{ title: newItemText.trim(), isCompleted: false },
		];
		updateFormData({ checklist: updatedChecklist });
		setNewItemText("");
	};

	const handleDeleteChecklistItem = (index: number) => {
		const updatedChecklist = formData.checklist.filter((_, i) => i !== index);
		updateFormData({ checklist: updatedChecklist });
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Task Description */}
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Description</Label>
				<Textarea
					placeholder="Enter Visit Description"
					value={formData.description}
					onChange={(e) => updateFormData({ description: e.target.value })}
					className="min-h-[100px] rounded-2xl border-gray-200 p-5 text-[14px] placeholder:text-gray-400 focus-visible:ring-[#1d4ea8]/20"
				/>
			</div>

			{/* Checklist CRUD Builder */}
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Checklist / Sub-tasks</Label>
				<div className="flex gap-2">
					<Input
						placeholder="Add checklist item title..."
						value={newItemText}
						onChange={(e) => setNewItemText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleAddChecklistItem();
							}
						}}
						className="h-12 rounded-xl border-gray-200 px-4 text-[13px] placeholder:text-gray-400 focus-visible:ring-[#1d4ea8]/20"
					/>
					<button
						type="button"
						onClick={handleAddChecklistItem}
						className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1d4ea8] transition-colors hover:bg-blue-100"
					>
						<Icon icon="solar:add-circle-bold" className="size-6" />
					</button>
				</div>

				<div className="custom-scrollbar mt-3 flex max-h-[180px] flex-col gap-3 overflow-y-auto pr-1">
					{formData.checklist.length === 0 ? (
						<p className="pl-1 text-xs font-semibold text-gray-400">
							No checklist items added yet.
						</p>
					) : (
						formData.checklist.map((item, index) => (
							<div
								// eslint-disable-next-line react/no-array-index-key
								key={index}
								className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-3"
							>
								<div className="flex items-center gap-3">
									<div className="flex size-5 items-center justify-center rounded-full border-2 border-gray-200">
										<div className="size-2.5 rounded-full bg-gray-100" />
									</div>
									<span className="text-[13px] font-semibold text-gray-700">
										{item.title}
									</span>
								</div>
								<button
									type="button"
									onClick={() => handleDeleteChecklistItem(index)}
									className="text-gray-400 transition-colors hover:text-red-500"
								>
									<Icon icon="solar:trash-bin-trash-bold" className="size-5" />
								</button>
							</div>
						))
					)}
				</div>
			</div>

			<button
				type="button"
				onClick={onNext}
				className="mt-4 h-14 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-[0.98]"
			>
				Next
			</button>
		</div>
	);
}
