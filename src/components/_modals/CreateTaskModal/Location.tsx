"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Map from "@/components/Map";

interface LocationProps {
	onNext: () => void;
}

export default function Location({ onNext }: LocationProps) {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">
					Visit Address/Location
				</Label>
				<Input
					placeholder="Enter Visit Address"
					className="h-14 rounded-2xl border-gray-200 px-5 text-[14px] placeholder:text-gray-400 focus-visible:ring-[#1d4ea8]/20"
				/>
			</div>

			<div className="relative h-[200px] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
				<Map className="size-full" />
				{/* Mock labels from screenshot */}
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<span className="text-xl font-bold text-gray-600 opacity-50">Abuja</span>
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
