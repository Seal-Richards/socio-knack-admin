import cn from "@/lib/utils";
import React from "react";

interface RouteWrapperProps {
	topLeftSlot?: React.ReactNode;
	topRightSlot?: React.ReactNode;
	middleSlot?: React.ReactNode;
	bottomLeftSlot?: React.ReactNode;
	bottomRightSlot?: React.ReactNode;
	children?: React.ReactNode;
}

const baseStyles = {
	topRow: "flex flex-col sm:flex-row items-center justify-between w-full gap-4",
	middleGrid: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6",
	bottomGrid: "grid grid-cols-1 gap-8 lg:grid-cols-2",
	childrenContainer: "flex flex-col flex-1 min-w-0 w-full gap-8 lg:gap-10",
};

export default function RouteWrapper({
	topLeftSlot,
	topRightSlot,
	middleSlot,
	bottomLeftSlot,
	bottomRightSlot,
	children,
}: RouteWrapperProps = {}) {
	const hasSlots = !!topLeftSlot || !!topRightSlot || !!middleSlot;

	return (
		<section
			className={cn(
				"flex flex-col gap-8 w-full h-full p-4 lg:p-10",
				!hasSlots && "p-0 gap-0",
			)}
		>
			{/* Top Bar - Inline Alignment */}
			{(!!topLeftSlot || !!topRightSlot) && (
				<div className={cn(baseStyles.topRow, "shrink-0")}>
					<div className="flex-1">{topLeftSlot}</div>
					<div className="w-full shrink-0 lg:w-auto">{topRightSlot}</div>
				</div>
			)}

			{/* Middle Bar - Metrics/Widgets */}
			{!!middleSlot && (
				<div className={cn(baseStyles.middleGrid, "shrink-0")}>{middleSlot}</div>
			)}

			{/* Custom Content Area */}
			{children && <div className={cn(baseStyles.childrenContainer)}>{children}</div>}

			{/* Bottom Grid for Lists + Maps */}
			{(!!bottomLeftSlot || !!bottomRightSlot) && (
				<div className={cn(baseStyles.bottomGrid, "shrink-0")}>
					<div className="flex h-full flex-col">{bottomLeftSlot}</div>
					<div className="flex h-full flex-col">{bottomRightSlot}</div>
				</div>
			)}
		</section>
	);
}
