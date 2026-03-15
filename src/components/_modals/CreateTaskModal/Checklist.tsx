"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ChecklistProps {
	onNext: () => void;
}

export default function Checklist({ onNext }: ChecklistProps) {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Description</Label>
				<Textarea
					placeholder="Enter Visit Description"
					className="min-h-[120px] rounded-2xl border-gray-200 p-5 text-[14px] placeholder:text-gray-400 focus-visible:ring-[#1d4ea8]/20"
				/>
			</div>

			<div className="flex flex-col gap-4">
				{[1, 2, 3].map((i) => (
					<div key={i} className="flex items-center gap-3">
						<div className="size-6 rounded-full border-2 border-gray-200" />
						<span className="text-[14px] font-medium text-gray-700">Check List</span>
					</div>
				))}
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
