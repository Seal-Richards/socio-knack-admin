"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import cn from "@/lib/utils";

interface BasicInfoProps {
	onNext: () => void;
}

export default function BasicInfo({ onNext }: BasicInfoProps) {
	const [priority, setPriority] = React.useState("Medium");

	const priorities = ["Low", "Medium", "High", "Extremely High"];

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Visit Name</Label>
				<Input
					placeholder="Enter Here"
					className="h-14 rounded-2xl border-gray-200 px-5 text-[14px] placeholder:text-gray-400 focus-visible:ring-[#1d4ea8]/20"
				/>
			</div>

			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Deadline</Label>
				<div className="flex flex-wrap items-center gap-4">
					<div className="relative flex-1">
						<span className="absolute left-0 top-1/2 -translate-y-1/2 text-[14px] text-gray-400">
							Date
						</span>
						<div className="relative ml-10">
							<Input
								defaultValue="23-01-2026"
								className="h-14 rounded-2xl border-gray-200 pl-4 pr-10 text-[14px] focus-visible:ring-[#1d4ea8]/20"
							/>
							<Icon
								icon="solar:calendar-linear"
								className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#1d4ea8]"
							/>
						</div>
					</div>
					<div className="relative flex-1">
						<span className="absolute left-0 top-1/2 -translate-y-1/2 text-[14px] text-gray-400">
							Time
						</span>
						<div className="relative ml-10">
							<Input
								defaultValue="10:00 AM"
								className="h-14 rounded-2xl border-gray-200 pl-4 pr-10 text-[14px] focus-visible:ring-[#1d4ea8]/20"
							/>
							<Icon
								icon="solar:clock-circle-linear"
								className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#1d4ea8]"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<Label className="text-[14px] font-bold text-gray-700">Priority</Label>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{priorities.map((p) => (
						<button
							key={p}
							type="button"
							onClick={() => setPriority(p)}
							className={cn(
								"flex h-12 items-center justify-center rounded-xl border text-[13px] font-medium transition-all",
								priority === p
									? "border-[#1d4ea8] bg-[#1d4ea8]/5 text-[#1d4ea8]"
									: "border-gray-200 text-gray-500 hover:border-gray-300",
							)}
						>
							{p}
						</button>
					))}
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
