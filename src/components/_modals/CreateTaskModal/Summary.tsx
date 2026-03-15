"use client";

import React from "react";

interface SummaryProps {
	onPublish: () => void;
}

export default function Summary({ onPublish }: SummaryProps) {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex min-h-[150px] items-center justify-center">
				<p className="text-center text-gray-500">Task details summary will appear here.</p>
			</div>

			<button
				type="button"
				onClick={onPublish}
				className="mt-4 h-14 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-[0.98]"
			>
				Publish
			</button>
		</div>
	);
}
