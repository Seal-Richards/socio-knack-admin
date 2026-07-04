"use client";

import { Icon } from "@iconify/react";
import cn from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface AgentRoiWidgetProps {
	label: string;
	value: string | number;
	className?: string;
}

export default function AgentRoiWidget({ label, value, className }: AgentRoiWidgetProps) {
	return (
		<div
			className={cn(
				"group relative flex flex-col rounded-[1.5rem] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100",
				className,
			)}
		>
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-1.5">
					<span className="text-[15px] font-bold tracking-tight text-gray-500">
						{label}
					</span>
					<Popover>
						<PopoverTrigger asChild>
							<button
								type="button"
								className="text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
								aria-label="ROI calculation details"
							>
								<Icon
									icon="lucide:info"
									className="size-4 shrink-0 transition-transform hover:scale-110"
								/>
							</button>
						</PopoverTrigger>
						<PopoverContent className="z-50 w-80 rounded-2xl border border-gray-100 bg-white p-5 text-sm text-gray-600 shadow-xl focus:outline-none">
							<h5 className="mb-2 flex items-center gap-1.5 text-[15px] font-bold text-gray-900">
								<Icon
									icon="lucide:sliders-vertical"
									className="size-4 text-[#10b981]"
								/>
								Socio Knack ROI Efficiency
							</h5>
							<p className="mb-3 text-[13px] leading-relaxed text-gray-500">
								Shows how much profit is generated for every ₦1 spent on field
								visits. A higher percentage indicates a better return.
							</p>

							<div className="space-y-2 border-t border-gray-50 pt-3 text-[12px]">
								<div className="flex items-start gap-1.5">
									<span className="font-semibold text-gray-900">1️⃣ Revenue:</span>
									<span className="text-gray-500">
										All money from completed visits (total sales).
									</span>
								</div>
								<div className="flex items-start gap-1.5">
									<span className="font-semibold text-gray-900">2️⃣ Cost:</span>
									<span className="text-gray-500">
										Agent Payout (commission or flat rate).
									</span>
								</div>
								<div className="flex items-start gap-1.5">
									<span className="font-semibold text-gray-900">3️⃣ Formula:</span>
									<code className="rounded bg-gray-50 px-1 py-0.5 text-[11px] font-medium text-[#10b981]">
										(Revenue - Cost) ÷ Cost × 100
									</code>
								</div>
							</div>

							<div className="mt-3.5 rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-[11.5px]">
								<div className="mb-1 flex items-center gap-1 font-bold text-gray-800">
									<span>💡</span> Example (5 Approved Visits):
								</div>
								<div className="space-y-0.5 text-gray-600">
									<div>• Agent Payout (Total Cost): ₦9,000</div>
									<div>• Total Revenue: ₦180,000</div>
									<div className="mt-1 font-semibold text-gray-900">
										👉 ROI = (180k - 9k) ÷ 9k × 100 = 1,900%
									</div>
									<div className="mt-1 text-[11px] italic text-gray-500">
										(For every ₦1 spent, we made ₦19 profit on top 🔥)
									</div>
								</div>
							</div>

							<div className="mt-3.5 flex items-center justify-between border-t border-gray-50 pt-3 text-[11.5px] font-semibold text-gray-700">
								<span className="flex items-center gap-0.5">
									Above 0% ✅ Profit
								</span>
								<span className="flex items-center gap-0.5">0% ⚖️ Break Even</span>
								<span className="flex items-center gap-0.5">Below 0% ❌ Loss</span>
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex size-10 items-center justify-center rounded-full bg-white text-[#10b981] transition-all duration-300 group-hover:scale-110">
					<Icon icon="lucide:sliders-vertical" className="size-5" />
				</div>
			</div>

			<div className="flex items-end justify-between">
				<h4 className="text-[2.25rem] font-black leading-none tracking-tighter text-[#10b981]">
					{value}%
				</h4>
			</div>
		</div>
	);
}
