import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function KycStatus() {
	return (
		<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-10">
			<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">KYC Verification</h3>
			<div className="h-px w-full bg-gray-100" />

			{/* Verification Progress Bar */}
			<div className="flex w-full max-w-lg items-center gap-4 py-2 sm:py-4">
				<span className="whitespace-nowrap text-[14px] font-bold text-gray-800">
					Verification
				</span>
				<div className="h-3.5 w-full flex-1 overflow-hidden rounded-full bg-gray-200">
					<div className="size-full rounded-full bg-[#1d4ea8]" />
				</div>
				<span className="text-[14px] font-bold text-gray-800">100%</span>
			</div>

			<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
				{/* Left Column: Verification Steps */}
				<div className="flex flex-col gap-4 sm:gap-6">
					<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 sm:p-5">
						<span className="text-[14px] font-bold text-gray-700 sm:text-[15px]">
							Identity Verification
						</span>
						<button className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-[12px] font-bold text-gray-600 transition-colors hover:bg-gray-50">
							<Icon icon="solar:eye-bold" className="size-4" />
							View
						</button>
					</div>

					<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 sm:p-5">
						<span className="text-[14px] font-bold text-gray-700 sm:text-[15px]">
							Proof of address
						</span>
						<button className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-[12px] font-bold text-gray-600 transition-colors hover:bg-gray-50">
							<Icon icon="solar:eye-bold" className="size-4" />
							View
						</button>
					</div>

					<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 sm:p-5">
						<span className="text-[14px] font-bold text-gray-700 sm:text-[15px]">
							Link Bank Account
						</span>
						<div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-white">
							<Icon icon="lucide:check" className="size-4" />
						</div>
					</div>
				</div>

				{/* Right Column: Access Panel */}
				<div className="w-full">
					<div className="flex flex-col gap-6 rounded-3xl border border-gray-200 p-6 shadow-sm sm:p-8">
						<h3 className="text-[14px] font-bold text-gray-800">Access Panel</h3>
						<div className="h-px w-full bg-gray-100" />

						<div className="space-y-2">
							<Label className="text-[13px] font-bold text-gray-800">
								Set Status
							</Label>
							<Select defaultValue="approved">
								<SelectTrigger className="h-12 w-full rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-600 focus:ring-0">
									<SelectValue placeholder="Select Status" />
								</SelectTrigger>
								<SelectContent className="rounded-xl border-gray-100">
									<SelectItem value="approved">Approved</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="rejected">Rejected</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label className="text-[13px] font-bold text-gray-800">Comment</Label>
							<Textarea
								placeholder="Input comment"
								className="min-h-[120px] resize-none rounded-xl border-gray-200 px-4 py-3 text-[13px] focus-visible:ring-0"
							/>
						</div>

						<div className="mt-4 flex flex-col gap-4 sm:flex-row">
							<Button
								variant="outline"
								className="h-12 flex-1 rounded-full border-gray-100 text-[14px] font-bold text-gray-800 hover:bg-gray-50"
							>
								Cancel
							</Button>
							<Button className="h-12 flex-1 rounded-full bg-[#4CAF50] text-[14px] font-bold text-white hover:bg-[#43A047]">
								Save
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
