"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { useState } from "react";
import StepProgressBar from "../Shared/StepProgressBar";

export default function OwnershipVerification({
	onNext,
	onPrev,
	step = 2,
	totalSteps = 6,
}: {
	onNext?: () => void;
	onPrev?: () => void;
	step?: number;
	totalSteps?: number;
}) {
	const [fileName, setFileName] = useState("");

	return (
		<div className="w-full">
			<button
				onClick={onPrev}
				className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100"
			>
				<Icon icon="lucide:arrow-left" className="size-5" />
			</button>

			<StepProgressBar
				currentStep={step}
				totalSteps={totalSteps}
				title="Ownership Verification"
			/>

			<div className="space-y-6">
				<div className="relative space-y-2">
					<Label className="text-sm font-semibold text-gray-700">
						Government-issued ID Upload
					</Label>
					<p className="mb-2 text-xs text-gray-500">
						Upload Document (Passport / National ID / Driver&apos;s License)
					</p>

					<div className="relative flex items-center">
						<input
							type="text"
							aria-label="Upload Document Name"
							value={fileName}
							placeholder="Upload"
							readOnly
							className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 pr-24 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
						/>
						<label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
							<span className="rounded-full bg-green-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700">
								UPLOAD
							</span>
							<input
								type="file"
								aria-label="Upload Document File"
								className="hidden"
								onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
								accept=".png,.jpeg,.jpg,.pdf"
							/>
						</label>
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
