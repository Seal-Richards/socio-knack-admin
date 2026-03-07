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

export default function PersonalSetup({
	onNext,
	onPrev,
	step = 1,
	totalSteps = 3,
}: {
	onNext?: () => void;
	onPrev?: () => void;
	step?: number;
	totalSteps?: number;
}) {
	return (
		<div className="relative w-full">
			{/* Optional back button if we want Supervisors to go back to Admin step 6, but usually this is a fresh flow */}
			<button
				onClick={onPrev}
				className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100"
			>
				<Icon icon="lucide:arrow-left" className="size-5" />
			</button>

			<StepProgressBar currentStep={step} totalSteps={totalSteps} title="Personal Info" />

			<div className="space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">First Name</Label>
						<Input
							placeholder="Enter here"
							className="h-12 border-gray-200 bg-gray-50"
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Last Name</Label>
						<Input
							placeholder="Enter here"
							className="h-12 border-gray-200 bg-gray-50"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Work Email</Label>
						<Input
							type="email"
							placeholder="Enter here"
							className="h-12 border-gray-200 bg-gray-50"
						/>
					</div>
					<div className="relative space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
						<Input
							type="tel"
							placeholder="Enter here"
							className="h-12 border-gray-200 bg-gray-50 pr-20"
						/>
						<button className="absolute right-2 top-8 rounded-full bg-green-600 px-3 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-green-700">
							VERIFY
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Date of Birth</Label>
						<Input
							type="date"
							className="h-12 border-gray-200 bg-gray-50 text-gray-500"
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">Gender</Label>
						<Select>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="Enter here" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Male">Male</SelectItem>
								<SelectItem value="Female">Female</SelectItem>
								<SelectItem value="Other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 pb-2 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">City</Label>
						<Select>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="Enter here" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Lagos">Lagos</SelectItem>
								<SelectItem value="Abuja">Abuja</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-semibold text-gray-700">State</Label>
						<Select>
							<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
								<SelectValue placeholder="Enter here" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Lagos State">Lagos State</SelectItem>
								<SelectItem value="FCT">FCT</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-semibold text-gray-700">Country</Label>
					<Select>
						<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
							<SelectValue placeholder="Enter here" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Nigeria">Nigeria</SelectItem>
							<SelectItem value="Ghana">Ghana</SelectItem>
						</SelectContent>
					</Select>
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
