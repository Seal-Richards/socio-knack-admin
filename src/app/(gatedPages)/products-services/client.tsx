"use client";

import ProductServiceList from "@/components/List/ProductServiceList";
import RouteWrapper from "@/layouts/RouteWrapper";

export default function ProductServiceClient() {
	return (
		<RouteWrapper>
			<ProductServiceList />
		</RouteWrapper>
	);
}
