"use client";

import RouteWrapper from "@/layouts/RouteWrapper";
import SupervisorDetails from "@/components/SupervisorDetails";
import { useParams } from "next/navigation";

export default function SupervisorDetailByIdClient() {
	const params = useParams();
	const id = params?.id as string;

	return (
		<RouteWrapper>
			<SupervisorDetails id={id} />
		</RouteWrapper>
	);
}
