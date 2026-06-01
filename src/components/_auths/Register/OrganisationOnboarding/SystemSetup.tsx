"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@iconify/react";
import StepProgressBar from "../Shared/StepProgressBar";

export default function SystemSetup({
	onNext,
	onPrev,
	step = 5,
	totalSteps = 6,
}: {
	onNext?: () => void;
	onPrev?: () => void;
	step?: number;
	totalSteps?: number;
}) {
	return (
		<div className="relative w-full">
			<button
				onClick={onPrev}
				className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100"
			>
				<Icon icon="lucide:arrow-left" className="size-5" />
			</button>

			<StepProgressBar
				currentStep={step}
				totalSteps={totalSteps}
				title="System Configuration"
			/>

			<div className="space-y-6">
				{/* Default roles & permission */}
				<div className="space-y-3">
					<Label className="text-sm font-semibold text-gray-700">
						Default roles & permission
					</Label>
					<div className="space-y-3 rounded-lg border border-gray-200 p-4">
						<div className="mb-1 flex items-center justify-between text-xs font-semibold text-gray-400">
							<span>Role</span>
							<span>Permissions</span>
						</div>

						<div className="flex items-center justify-between border-b border-gray-100 pb-2">
							<span className="text-sm font-medium text-gray-700">Admin</span>
							<span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-600">
								Full access
							</span>
						</div>
						<div className="flex items-center justify-between border-b border-gray-100 pb-2">
							<span className="text-sm font-medium text-gray-700">Manager</span>
							<span className="cursor-pointer rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold text-orange-500 transition-colors hover:bg-orange-200">
								Set permission
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-700">Supervisor</span>
							<span className="cursor-pointer rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold text-orange-500 transition-colors hover:bg-orange-200">
								Set permission
							</span>
						</div>
					</div>
				</div>

				{/* Approval workflows */}
				<div className="space-y-2">
					<Label className="text-sm font-semibold text-gray-700">
						Approval workflows
					</Label>
					<Textarea className="min-h-[120px] resize-none rounded-md border-gray-200 bg-white" />
				</div>

				{/* Compliance rules */}
				<div className="space-y-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
					<Label className="mb-2 block text-sm font-semibold text-gray-700">
						Compliance rules
					</Label>

					<div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm">
						<span className="text-sm font-medium text-gray-600">
							Mandatory GPS Check-in
						</span>
						<Switch defaultChecked />
					</div>
					<div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm">
						<span className="text-sm font-medium text-gray-600">
							Photo Verification Required
						</span>
						<Switch defaultChecked />
					</div>
				</div>

				{/* Incentive structures */}
				<div className="space-y-4 rounded-xl border border-gray-200 bg-gray-100 p-5">
					<Label className="text-sm font-bold text-gray-800">Incentive structures</Label>

					<div className="space-y-2">
						<Label className="text-xs font-semibold text-gray-500">
							Base Reward per Visit
						</Label>
						<Input
							placeholder="e.g ₦500"
							className="h-11 rounded-md border-none bg-[#7b819f] text-white shadow-sm placeholder:text-gray-300"
						/>
					</div>

					<div className="space-y-2">
						<Label className="text-xs font-semibold text-gray-500">
							Default Sales commission
						</Label>
						<Input
							placeholder="e.g 15%"
							className="h-11 rounded-md border-none bg-[#7b819f] text-white shadow-sm placeholder:text-gray-300"
						/>
					</div>
				</div>

				<Button
					onClick={onNext}
					className="text-md mt-8 h-12 w-full bg-yellow-500 font-sans font-semibold text-white hover:bg-yellow-600"
				>
					Next
				</Button>
			</div>
		</div>
	);
}
