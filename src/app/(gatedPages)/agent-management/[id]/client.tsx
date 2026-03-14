"use client";

import RouteWrapper from "@/layouts/RouteWrapper";
import AgentDetails from "@/components/AgentDetails";
import { useParams } from "next/navigation";

export default function AgentDetailByIdClient() {
	const params = useParams();
	const id = params?.id as string;

	return (
		<RouteWrapper>
			<AgentDetails id={id} />
		</RouteWrapper>
	);
}
