"use client";

import React, { Suspense } from "react";
import RouteWrapper from "@/layouts/RouteWrapper";
import Settings from "@/components/Settings";

export default function SettingsClient() {
	return (
		<RouteWrapper>
			<Suspense
				fallback={<div className="p-8 text-center text-gray-500">Loading settings...</div>}
			>
				<Settings />
			</Suspense>
		</RouteWrapper>
	);
}
