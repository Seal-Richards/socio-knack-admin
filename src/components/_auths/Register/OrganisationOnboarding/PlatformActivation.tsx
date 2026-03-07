"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import StepProgressBar from "../Shared/StepProgressBar";

export default function PlatformActivation({
	onNext,
	onPrev,
	step = 6,
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
				title="Platform Activation"
			/>

			<div className="space-y-6">
				{/* Security & Audit Readiness */}
				<div className="space-y-3">
					<Label className="text-sm font-semibold text-gray-700">
						Security & Audit Readiness
					</Label>
					<div className="space-y-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
						<div className="flex items-center justify-between border-b border-gray-50 pb-2">
							<span className="text-sm font-medium text-gray-600">
								Encryption keys
							</span>
							<span className="rounded-full bg-green-100 px-4 py-1 text-xs font-bold text-green-600">
								Ready
							</span>
						</div>
						<div className="flex items-center justify-between border-b border-gray-50 pb-2">
							<span className="text-sm font-medium text-gray-600">
								2FA Configuration
							</span>
							<span className="rounded-full bg-green-100 px-4 py-1 text-xs font-bold text-green-600">
								Ready
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-600">Log ledger</span>
							<span className="rounded-full bg-green-100 px-4 py-1 text-xs font-bold text-green-600">
								Ready
							</span>
						</div>
					</div>
				</div>

				{/* API Credentials */}
				<div className="space-y-3">
					<Label className="text-sm font-semibold text-gray-700">API Credentials</Label>
					<div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-5">
						<div className="space-y-2">
							<span className="text-xs font-semibold text-gray-400">App ID</span>
							<div className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700">
								<span>app-3435-aynx</span>
								<Icon
									icon="lucide:copy"
									className="cursor-pointer text-gray-400 transition-colors hover:text-blue-500"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<span className="text-xs font-semibold text-gray-400">Secret Key</span>
							<div className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700">
								<span>••••••••••••••••</span>
								<div className="flex gap-3">
									<Icon
										icon="lucide:eye"
										className="cursor-pointer text-gray-400 transition-colors hover:text-blue-500"
									/>
									<Icon
										icon="lucide:copy"
										className="cursor-pointer text-gray-400 transition-colors hover:text-blue-500"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Button
					onClick={() => {
						toast.success("Platform Activated Successfully!");
						onNext?.();
					}}
					className="text-md mt-8 h-12 w-full bg-green-600 font-sans font-semibold text-white shadow-md hover:bg-green-700"
				>
					Activate Platform
				</Button>
			</div>
		</div>
	);
}
