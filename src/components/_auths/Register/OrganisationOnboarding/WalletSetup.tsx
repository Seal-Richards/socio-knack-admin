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

export default function WalletSetup({
	onNext,
	onPrev,
	step = 4,
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

			<StepProgressBar currentStep={step} totalSteps={totalSteps} title="Wallet Linking" />

			<div className="space-y-6">
				{/* Primary platform wallet */}
				<div className="space-y-1">
					<Label className="text-sm font-semibold text-gray-700">
						Primary platform wallet
					</Label>
					<div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
						<p className="text-xs font-medium text-gray-500">Main Balance</p>
						<h3 className="my-1 text-3xl font-bold text-green-600">₦12,400,000.00</h3>
						<button className="text-xs font-medium text-blue-500 hover:underline">
							Top Up
						</button>
					</div>
				</div>

				{/* Settlement Bank Account Details */}
				<div className="space-y-4">
					<h4 className="text-md text-darkBlue-900 border-b pb-2 font-semibold">
						Settlement Bank Account Details
					</h4>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label className="text-sm font-semibold text-gray-700">Bank Name</Label>
							<Select>
								<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="GTB">Guaranty Trust Bank</SelectItem>
									<SelectItem value="UBA">United Bank for Africa</SelectItem>
									<SelectItem value="ZENITH">Zenith Bank</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-semibold text-gray-700">
								Account Number
							</Label>
							<Input
								placeholder="Enter here"
								className="h-12 border-gray-200 bg-gray-50"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Account Name</Label>
						<div className="flex gap-3">
							<Input
								placeholder="Enter here"
								className="h-12 flex-1 border-gray-200 bg-gray-50"
							/>
							<Button className="h-12 bg-green-600 px-6 font-semibold text-white hover:bg-green-700">
								Verify Account
							</Button>
						</div>
					</div>
				</div>

				<Button
					onClick={onNext}
					className="text-md mt-8 h-12 w-full bg-yellow-500 font-sans font-semibold text-white hover:bg-yellow-600"
				>
					Save & Continue
				</Button>
			</div>
		</div>
	);
}
