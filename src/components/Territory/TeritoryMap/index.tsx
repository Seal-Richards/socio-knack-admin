"use client";

import React from "react";
import Map from "@/components/Map";

export default function TeritoryMap() {
	return (
		<div className="relative h-full min-h-[400px] flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:min-h-full">
			<Map className="size-full" />
			{/* Floating Map Controls could go here */}
		</div>
	);
}
