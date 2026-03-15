"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function SystemAccess() {
	return (
		<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-10">
			<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">Permission</h3>

			<div className="mt-2 flex w-full max-w-3xl items-center justify-between rounded-2xl border border-gray-200 px-6 py-5 shadow-sm sm:px-8">
				<span className="text-[16px] font-bold text-gray-700 sm:text-[18px]">
					Supervisor
				</span>

				<Button
					variant="ghost"
					className="h-10 rounded-full bg-[#ffebd9] px-6 text-[13px] font-bold text-[#f97316] transition-all hover:bg-[#ffe0c4] hover:text-[#ea580c]"
				>
					View permission
				</Button>
			</div>
		</div>
	);
}
