"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import StepProgressBar from "../Shared/StepProgressBar";

export default function IdentitySetup({
	onNext,
	step,
	totalSteps,
}: {
	onNext: () => void;
	step: number;
	totalSteps: number;
}) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword] = useState(false);

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<StepProgressBar currentStep={step} totalSteps={totalSteps} title="Identity Setup" />

			<form
				className="mt-4 w-full space-y-6"
				onSubmit={(e) => {
					e.preventDefault();
					onNext();
				}}
			>
				{/* Name Row */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="firstName" className="text-darkBlue-900">
							First Name
						</Label>
						<Input
							id="firstName"
							placeholder="Enter here"
							className="h-12 border-gray-300 bg-gray-50 text-gray-900"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="lastName" className="text-darkBlue-900">
							Last Name
						</Label>
						<Input
							id="lastName"
							placeholder="Enter here"
							className="h-12 border-gray-300 bg-gray-50 text-gray-900"
						/>
					</div>
				</div>

				{/* Contact Row */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="workEmail" className="text-darkBlue-900">
							Work Email
						</Label>
						<Input
							id="workEmail"
							type="email"
							placeholder="Enter here"
							className="h-12 border-gray-300 bg-gray-50 text-gray-900"
						/>
					</div>
					<div className="relative space-y-2">
						<Label htmlFor="phone" className="text-darkBlue-900">
							Phone Number
						</Label>
						<div className="relative">
							<Input
								id="phone"
								type="tel"
								placeholder="Enter here"
								className="h-12 border-gray-300 bg-gray-50 pr-24 text-gray-900"
							/>
							<button
								type="button"
								className="absolute right-2 top-1/2 -translate-y-1/2 cursor-not-allowed rounded-full bg-green-600 px-3 py-1 text-xs font-semibold uppercase text-white hover:bg-green-700"
							>
								Verify
							</button>
						</div>
					</div>
				</div>

				<div className="my-8">
					<h3 className="text-darkBlue-900 mb-4 text-lg font-semibold">Security</h3>
					{/* Password Row */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="relative space-y-2">
							<Label htmlFor="password" className="text-darkBlue-900 invisible">
								Create password
							</Label>
							<div className="text-darkBlue-900 absolute left-0 top-0 text-sm font-medium">
								Create password
							</div>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="PASSWORD"
									className="h-12 border-gray-300 bg-gray-50 font-medium tracking-widest text-gray-900 placeholder:font-normal placeholder:tracking-normal"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
								>
									<Icon
										icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
										className="size-5"
									/>
								</button>
							</div>
						</div>
						<div className="relative space-y-2">
							<Label
								htmlFor="confirmPassword"
								className="text-darkBlue-900 invisible"
							>
								Confirm password
							</Label>
							<div className="text-darkBlue-900 absolute left-0 top-0 text-sm font-medium">
								Confirm password
							</div>
							<div className="relative">
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="CONFIRM PASSWORD"
									className="h-12 border-green-500/50 bg-green-50/20 font-medium tracking-widest text-gray-900 placeholder:font-normal placeholder:tracking-normal"
								/>
								<div className="absolute right-3 top-1/2 -translate-y-1/2">
									<Icon
										icon="lucide:check-circle-2"
										className="size-5 text-green-500"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Action */}
				<div className="pt-4">
					<Button
						type="submit"
						className="text-md h-12 w-full bg-blue-500 font-sans font-semibold text-white hover:bg-blue-600"
					>
						To continue Set 2FA
					</Button>
				</div>
			</form>
		</div>
	);
}
