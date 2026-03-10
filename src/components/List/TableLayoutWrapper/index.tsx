"use client";

import cn from "@/lib/utils";

interface TableLayoutWrapperProps {
	children: React.ReactNode;
	title: string;
	description?: string;
	actions?: React.ReactNode;
	filters?: React.ReactNode;
	className?: string;
}

export default function TableLayoutWrapper({
	children,
	title,
	description,
	actions,
	filters,
	className,
}: TableLayoutWrapperProps) {
	return (
		<div className={cn("flex w-full flex-col gap-8", className)}>
			{/* Header Section */}
			<div className="flex flex-col gap-1">
				<div className="flex items-center justify-between">
					{title && (
						<div className="flex items-center gap-2">
							<div className="h-6 w-1 rounded-full bg-[#1d4ea8]" />
							<h1 className="text-2xl font-black tracking-tight text-gray-900">
								{title}
							</h1>
						</div>
					)}
					{actions && <div className="flex items-center gap-3">{actions}</div>}
				</div>
				{description && (
					<p className="pl-3 text-[14px] font-medium text-gray-500">{description}</p>
				)}
			</div>

			{/* Filters & Content Area */}
			<div className="flex flex-col gap-6 rounded-3xl border border-gray-50 bg-white p-5 shadow-sm lg:rounded-[2.5rem] lg:p-8">
				{filters && (
					<div className="flex flex-col justify-between gap-4 border-b border-gray-50 pb-6 lg:flex-row lg:items-center">
						{filters}
					</div>
				)}
				<div className="w-full overflow-x-auto">{children}</div>
			</div>
		</div>
	);
}
