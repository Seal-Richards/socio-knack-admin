"use client";

import React from "react";
import RouteWrapper from "@/layouts/RouteWrapper";
import ReportDetails from "@/components/ReportDetails";
import { useParams } from "next/navigation";

export default function ReportDetailsPageClient() {
	const params = useParams();
	const id = params?.id as string;

	return (
		<RouteWrapper>
			<ReportDetails id={id} />
		</RouteWrapper>
	);
}
