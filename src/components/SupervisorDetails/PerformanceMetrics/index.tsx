import React from "react";

export default function PerformanceMetrics() {
	return (
		<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-10">
			<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">
				Key performance indicators
			</h3>
			<div className="h-px w-full bg-gray-100" />

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
				{/* Left Column */}
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-2">
						<span className="text-[15px] font-medium text-gray-800">
							Completed Visits
						</span>
						<h2 className="text-[40px] font-bold leading-tight text-gray-600">134</h2>
						<span className="text-[14px] font-medium text-gray-400">
							Total visit completed since joining
						</span>
					</div>
					<div className="h-px w-full max-w-72 bg-gray-100" />
					<div className="flex flex-col gap-2">
						<span className="text-[15px] font-medium text-gray-800">Success Rate</span>
						<h2 className="text-[40px] font-bold leading-tight text-gray-600">75%</h2>
						<div className="mt-2 h-3 w-full max-w-72 overflow-hidden rounded-full bg-gray-100">
							<div className="h-full w-3/4 rounded-full bg-gray-800" />
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-2">
						<span className="text-[15px] font-medium text-gray-800">
							Completed Visits
						</span>
						<h2 className="text-[40px] font-bold leading-tight text-gray-600">134</h2>
						<span className="text-[14px] font-medium text-gray-400">
							Total visit completed since joining
						</span>
					</div>
					<div className="h-px w-full bg-gray-100 md:max-w-md" />
					<div className="flex flex-col gap-2">
						<span className="text-[15px] font-medium text-gray-800">
							Completed Visits
						</span>
						<h2 className="text-[40px] font-bold leading-tight text-gray-600">134</h2>
						<span className="text-[14px] font-medium text-gray-400">
							Total visit completed since joining
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
