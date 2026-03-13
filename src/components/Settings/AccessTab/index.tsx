"use client";

import React from "react";
import AccessManagementList from "@/components/List/AccessManagementList";

export default function AccessTab() {
	return (
		<div className="flex flex-col gap-6">
			<AccessManagementList />
		</div>
	);
}
