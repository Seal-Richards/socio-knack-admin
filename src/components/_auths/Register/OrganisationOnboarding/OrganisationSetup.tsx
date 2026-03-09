"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import StepProgressBar from "../Shared/StepProgressBar";

export default function OrganisationSetup({
	onNext,
	onPrev,
	step = 3,
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
				title="Organization Setup"
			/>

			<div className="space-y-4">
				<div className="space-y-2">
					<Label className="text-sm font-semibold text-gray-700">
						Platform organization name
					</Label>
					<Input placeholder="Enter here" className="h-12 border-gray-200 bg-gray-50" />
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-semibold text-gray-700">Platform domain</Label>
					<Input placeholder="Enter here" className="h-12 border-gray-200 bg-gray-50" />
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">
							Country of Operation
						</Label>
						<Select>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="Default" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="NG">Nigeria</SelectItem>
								<SelectItem value="GH">Ghana</SelectItem>
								<SelectItem value="KE">Kenya</SelectItem>
								<SelectItem value="ZA">South Africa</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Currency</Label>
						<Select>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="Default" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="NGN">NGN</SelectItem>
								<SelectItem value="USD">USD</SelectItem>
								<SelectItem value="GBP">GBP</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Time Zone</Label>
						<Select>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="WAT" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="GMT">GMT</SelectItem>
								<SelectItem value="EST">EST</SelectItem>
								<SelectItem value="WAT">WAT</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">
							Regulatory region
						</Label>
						<Select>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Africa">Africa</SelectItem>
								<SelectItem value="Europe">Europe</SelectItem>
								<SelectItem value="North America">North America</SelectItem>
							</SelectContent>
						</Select>
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
