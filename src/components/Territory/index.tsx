"use client";

import React from "react";
import ZoneTab from "./ZoneTab";
import TeritoryMap from "./TeritoryMap";
import TeritoryDetails from "./TeritoryDetails";
import TeritoryAgent from "./TeritoryAgent";

export default function Territory() {
	return (
		<div className="flex h-[calc(100vh-140px)] w-full gap-4 p-4">
			{/* Left Column: Zone Switching */}
			<div className="h-full">
				<ZoneTab />
			</div>

			{/* Middle Column: Map View */}
			<div className="h-full flex-1">
				<TeritoryMap />
			</div>

			{/* Right Column: Unified Details & Agents Panel */}
			<div className="custom-scrollbar h-full w-[450px] overflow-hidden overflow-y-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
				<TeritoryDetails />
				<div className="mt-8">
					<TeritoryAgent />
				</div>
			</div>
		</div>
	);
}
