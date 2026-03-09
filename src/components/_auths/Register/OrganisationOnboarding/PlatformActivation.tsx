"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import PricingCard from "@/components/Cards/PricingCard";
import StepProgressBar from "../Shared/StepProgressBar";

export default function PlatformActivation({
	onNext,
	_onPrev,
	step = 6,
	totalSteps = 6,
}: {
	onNext?: () => void;
	_onPrev?: () => void;
	step?: number;
	totalSteps?: number;
}) {
	const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
	const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

	const handleSelect = (planName: string) => {
		setSelectedPlan(planName);
	};

	const handleAction = (planName: string) => {
		setSelectedPlan(planName);
		toast.success(`${planName} selected!`);
	};

	return (
		<div className="relative w-full pb-20 font-sans">
			{/* Progress Bar (Untouched) */}
			<StepProgressBar
				currentStep={step}
				totalSteps={totalSteps}
				title="Platform Activation"
			/>

			{/* 
        Main Container: 
        Max-width expanded greatly (`max-w-[1300px]`) to enforce the landscape, 
        spacious layout shown in the design and prevent slim cards. 
      */}
			<div className="mx-auto mt-10 w-full max-w-[1300px] rounded-[3rem] bg-[#f4f7fc] p-10 md:p-14 lg:p-16">
				{/* Header Section */}
				<div className="mb-16 text-center">
					<h2 className="mb-8 text-[2.75rem] font-bold tracking-tight text-[#1a1a1a]">
						Pricing for Teams of all Sizes
					</h2>

					{/* Toggle Switch */}
					<div className="flex justify-center">
						<div className="inline-flex items-center rounded-full bg-[#e5eef9] p-1.5 shadow-inner">
							<button
								onClick={() => setBillingCycle("monthly")}
								className={`rounded-full px-10 py-3 text-[15px] font-semibold transition-all duration-300 ${
									billingCycle === "monthly"
										? "scale-100 bg-[#1d4ea8] text-white shadow-md"
										: "text-[#1d4ea8] hover:bg-white/40"
								}`}
							>
								Monthly
							</button>
							<button
								onClick={() => setBillingCycle("annual")}
								className={`flex items-center gap-3 rounded-full px-8 py-3 text-[15px] font-semibold transition-all duration-300 ${
									billingCycle === "annual"
										? "scale-100 bg-[#1d4ea8] text-white shadow-md"
										: "text-gray-500 hover:bg-white/40"
								}`}
							>
								Annual
								<span
									className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${
										billingCycle === "annual"
											? "bg-white text-[#1d4ea8]"
											: "bg-white text-gray-400 shadow-sm"
									}`}
								>
									10% Off
								</span>
							</button>
						</div>
					</div>
				</div>

				{/* Pricing Cards Grid - Using a wide gap to prevent clustering */}
				<div className="mb-16 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-4">
					<PricingCard
						theme="green"
						title="Starter Plan"
						subtitle="1-50 employees"
						price="₦4,000"
						setupFee="₦30,000"
						featuresCount={11}
						buttonText="Start 14-Day Free Trial"
						isSelected={selectedPlan === "Starter Plan"}
						onSelect={() => handleSelect("Starter Plan")}
						onAction={() => handleAction("Starter Plan")}
					/>
					<PricingCard
						theme="blue"
						title="Growth Plan"
						subtitle="51-100 employees"
						price="₦4,000"
						setupFee="₦100,000"
						featuresCount={11}
						buttonText="Start 14-Day Free Trial"
						isSelected={selectedPlan === "Growth Plan"}
						onSelect={() => handleSelect("Growth Plan")}
						onAction={() => handleAction("Growth Plan")}
					/>
					<PricingCard
						theme="purple"
						title="Business Plan"
						subtitle="101-200 employees"
						price="₦4,000"
						setupFee="₦200,000"
						featuresCount={8}
						buttonText="Start 14-Day Free Trial"
						isSelected={selectedPlan === "Business Plan"}
						onSelect={() => handleSelect("Business Plan")}
						onAction={() => handleAction("Business Plan")}
					/>
					<PricingCard
						theme="orange"
						isCustom
						title="Enterprise Plan"
						subtitle="200+ employees"
						featuresCount={4}
						buttonText="Contact Sales"
						isSelected={selectedPlan === "Enterprise Plan"}
						onSelect={() => handleSelect("Enterprise Plan")}
						onAction={() => handleAction("Enterprise Plan")}
					/>
				</div>

				{/* Global Action Button styled to match the image professionally */}
				<div className="flex flex-col items-center">
					<Button
						disabled={!selectedPlan}
						onClick={() => {
							toast.success(`${selectedPlan} Activated!`);
							onNext?.();
						}}
						className={`flex h-[3.75rem] w-full max-w-md items-center justify-center gap-2 rounded-xl text-[17px] font-medium shadow-lg transition-all duration-300 ${
							selectedPlan
								? "bg-[#1d4ea8] text-white hover:scale-[1.02] hover:bg-[#153a82] active:scale-95"
								: "cursor-not-allowed bg-[#1d4ea8]/50 text-white shadow-none"
						}`}
					>
						Activate Platform
						<Icon icon="lucide:arrow-right" className="ml-1 size-5" />
					</Button>

					<p className="mt-5 text-[13px] font-medium text-gray-400">
						Need a custom plan?{" "}
						<button className="font-bold text-[#1d4ea8] transition-all hover:underline">
							Contact Sales
						</button>{" "}
						for enterprise solutions.
					</p>
				</div>
			</div>
		</div>
	);
}
