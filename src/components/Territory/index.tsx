"use client";

import React from "react";
import ZoneTab from "./ZoneTab";
import TeritoryMap from "./TeritoryMap";
import TeritoryDetails from "./TeritoryDetails";
import TeritoryAgent from "./TeritoryAgent";

export default function Territory() {
	return (
		<div className="flex flex-col gap-4 p-4 lg:h-[calc(100vh-140px)] lg:flex-row lg:overflow-hidden">
			{/* Left Column: Zone Switching */}
			<div className="w-full shrink-0 lg:h-full lg:w-[320px]">
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
		</div>
	);
}
