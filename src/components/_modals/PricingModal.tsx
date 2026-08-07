"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PricingCard from "@/components/Cards/PricingCard";
import { useInitializeSubscription } from "@/hooks/useBusiness";
import { Label } from "@/components/ui/label";
import Modal from "@/components/_modals";

type PricingModalProps = {
	isOpen: boolean;
	onClose: () => void;
	currentPlan?: string;
	isSubscriptionActive?: boolean;
};

type PlanKey = "starter" | "growth" | "business" | "enterprise";

const planFeatures: Record<PlanKey, string[]> = {
	starter: ["Basic reporting", "Territory management", "Visit tracking"],
	growth: ["Advanced analytics", "Priority support", "Unlimited territories"],
	business: ["Custom branding", "API access", "Manager roles"],
	enterprise: ["Dedicated account manager", "SLA", "Custom integrations"],
};

export default function PricingModal({
	isOpen,
	onClose,
	currentPlan,
	isSubscriptionActive = false,
}: PricingModalProps) {
	const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
	const [seatCount, setSeatCount] = useState<number>(10);

	const initializeSubscriptionMutation = useInitializeSubscription();

	// Pre-select current plan or starter plan if open
	useEffect(() => {
		if (isOpen) {
			const activePlan = (currentPlan as PlanKey) || "starter";
			if (["starter", "growth", "business", "enterprise"].includes(activePlan)) {
				setSelectedPlan(activePlan);
			} else {
				setSelectedPlan("starter");
			}
		}
	}, [isOpen, currentPlan]);

	const getPlanLimits = (planKey: PlanKey | null) => {
		if (planKey === "starter") return { min: 1, max: 50 };
		if (planKey === "growth") return { min: 51, max: 100 };
		if (planKey === "business") return { min: 101, max: 200 };
		if (planKey === "enterprise") return { min: 201, max: Infinity };
		return { min: 1, max: Infinity };
	};

	const limits = getPlanLimits(selectedPlan);

	// Adjust default seat count when changing plans to be within the allowed range
	useEffect(() => {
		if (selectedPlan) {
			const { min, max } = getPlanLimits(selectedPlan);
			setSeatCount((prev) => {
				if (prev < min || prev > max) {
					if (selectedPlan === "starter") return 10;
					if (selectedPlan === "growth") return 55;
					if (selectedPlan === "business") return 105;
					return 205;
				}
				return prev;
			});
		}
	}, [selectedPlan]);

	const handleSelect = (planKey: PlanKey) => {
		setSelectedPlan(planKey);
	};

	const getSeatRangeText = (planKey: PlanKey) => {
		if (planKey === "starter") return "Min 1 - Max 50 users";
		if (planKey === "growth") return "Min 51 - Max 100 users";
		if (planKey === "business") return "Min 101 - Max 200 users";
		return "200+ users";
	};

	const validateSeats = (): boolean => {
		if (!selectedPlan) return false;
		if (seatCount < limits.min || seatCount > limits.max) {
			const capitalizedPlan = selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);
			toast.error(
				`${capitalizedPlan} plan requires between ${limits.min} and ${limits.max} users.`,
			);
			return false;
		}
		return true;
	};

	const calculateInitialTotal = () => {
		if (!selectedPlan || selectedPlan === "enterprise") return 0;
		const setupFees: Record<string, number> = {
			starter: 50000,
			growth: 100000,
			business: 200000,
		};
		const monthlyRate = 4000;
		return (setupFees[selectedPlan] || 0) + seatCount * monthlyRate;
	};

	const handleCheckout = async () => {
		if (!selectedPlan) {
			toast.error("Please select a plan to continue.");
			return;
		}

		if (selectedPlan === "enterprise") {
			toast.info("Please contact sales for custom enterprise onboarding.");
			return;
		}

		if (!validateSeats()) return;

		try {
			// Redirect back to settings page payout and billing tab
			const redirectUrl = `${window.location.origin}/settings`;
			const res = await initializeSubscriptionMutation.mutateAsync({
				planKey: selectedPlan,
				agentCount: seatCount,
				redirectUrl,
			});

			if (res.success && res.data?.link) {
				toast.success("Redirecting to checkout...");
				window.location.href = res.data.link;
			} else {
				toast.error(res.message || "Failed to initialize payment.");
			}
		} catch (error: unknown) {
			toast.error(
				error instanceof Error
					? error.message
					: "An error occurred during subscription setup.",
			);
		}
	};

	const { isPending } = initializeSubscriptionMutation;

	let setupFeeText = "200,000";
	if (selectedPlan === "starter") {
		setupFeeText = "50,000";
	} else if (selectedPlan === "growth") {
		setupFeeText = "100,000";
	}

	const getCardCtaText = (planKey: PlanKey) => {
		if (planKey === "enterprise") return "Contact Sales";
		if (currentPlan === planKey && isSubscriptionActive) return "Current Plan";
		return isSubscriptionActive ? "Upgrade" : "Subscribe";
	};

	let submitButtonText = isSubscriptionActive ? "Upgrade & Pay Now" : "Subscribe & Pay Now";
	if (isPending) {
		submitButtonText = "Initializing payment...";
	} else if (selectedPlan === currentPlan && isSubscriptionActive) {
		submitButtonText = "Current Plan Active";
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Upgrade / Select Pricing Plan"
			description="Select a subscription plan that fits your organization scale."
			className="w-full max-w-6xl"
		>
			<div className="mx-auto mt-4 w-full rounded-2xl bg-[#f4f7fc] p-6">
				{/* Pricing Cards Grid */}
				<div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
					<PricingCard
						theme="green"
						title="Starter Plan"
						subtitle="1-50 employees"
						price="₦4,000"
						setupFee="₦50,000"
						features={planFeatures.starter}
						buttonText={getCardCtaText("starter")}
						isSelected={selectedPlan === "starter"}
						isCurrentPlan={currentPlan === "starter" && isSubscriptionActive}
						onSelect={() => handleSelect("starter")}
						onAction={() => handleSelect("starter")}
					/>
					<PricingCard
						theme="blue"
						title="Growth Plan"
						subtitle="51-100 employees"
						price="₦4,000"
						setupFee="₦100,000"
						features={planFeatures.growth}
						buttonText={getCardCtaText("growth")}
						isSelected={selectedPlan === "growth"}
						isCurrentPlan={currentPlan === "growth" && isSubscriptionActive}
						onSelect={() => handleSelect("growth")}
						onAction={() => handleSelect("growth")}
					/>
					<PricingCard
						theme="purple"
						title="Business Plan"
						subtitle="101-200 employees"
						price="₦4,000"
						setupFee="₦200,000"
						features={planFeatures.business}
						buttonText={getCardCtaText("business")}
						isSelected={selectedPlan === "business"}
						isCurrentPlan={currentPlan === "business" && isSubscriptionActive}
						onSelect={() => handleSelect("business")}
						onAction={() => handleSelect("business")}
					/>
					<PricingCard
						theme="orange"
						isCustom
						title="Enterprise Plan"
						subtitle="200+ employees"
						features={planFeatures.enterprise}
						buttonText={getCardCtaText("enterprise")}
						isSelected={selectedPlan === "enterprise"}
						isCurrentPlan={currentPlan === "enterprise" && isSubscriptionActive}
						onSelect={() => handleSelect("enterprise")}
						onAction={() => handleSelect("enterprise")}
					/>
				</div>

				{/* Dynamic Seat Counter and Summary */}
				{selectedPlan && selectedPlan !== "enterprise" && (
					<div className="mt-8 flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
						<div className="space-y-2">
							<Label className="text-sm font-semibold text-gray-700">
								Number of Users / Agents
							</Label>
							<p className="text-xs font-medium text-gray-400">
								{getSeatRangeText(selectedPlan)}
							</p>
							<div className="flex items-center gap-3">
								<button
									onClick={() =>
										setSeatCount((prev) => Math.max(limits.min, prev - 1))
									}
									className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
									disabled={isPending || seatCount <= limits.min}
									aria-label="Decrease seat count"
								>
									<Icon icon="lucide:minus" className="size-4" />
								</button>
								<Input
									type="number"
									value={seatCount}
									onChange={(e) => {
										const val = parseInt(e.target.value, 10);
										setSeatCount(Number.isNaN(val) ? 0 : val);
									}}
									onBlur={() => {
										setSeatCount((prev) =>
											Math.max(limits.min, Math.min(limits.max, prev)),
										);
									}}
									className="h-10 w-24 border-gray-300 text-center font-bold text-gray-800"
									disabled={isPending}
								/>
								<button
									onClick={() =>
										setSeatCount((prev) => Math.min(limits.max, prev + 1))
									}
									className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
									disabled={isPending || seatCount >= limits.max}
									aria-label="Increase seat count"
								>
									<Icon icon="lucide:plus" className="size-4" />
								</button>
							</div>
						</div>

						<div className="space-y-1.5 border-t pt-4 md:border-t-0 md:pt-0 md:text-right">
							<div className="text-xs font-semibold text-gray-400">
								CHARGES BREAKDOWN
							</div>
							<div className="text-sm text-gray-600">
								Setup Fee:{" "}
								<span className="font-bold text-gray-900">₦{setupFeeText}</span>
							</div>
							<div className="text-sm text-gray-600">
								Subscription ({seatCount} users):{" "}
								<span className="font-bold text-gray-900">
									₦{(seatCount * 4000).toLocaleString()} / month
								</span>
							</div>
							<div className="mt-1 text-lg font-bold text-[#1d4ea8]">
								Total Initial: ₦{calculateInitialTotal().toLocaleString()}
							</div>
						</div>
					</div>
				)}

				{/* Activation Actions */}
				<div className="mt-8 flex flex-col items-center">
					<Button
						disabled={
							!selectedPlan ||
							(selectedPlan === currentPlan && isSubscriptionActive) ||
							isPending
						}
						onClick={handleCheckout}
						className={`text-md flex h-14 w-full max-w-md items-center justify-center gap-2 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
							selectedPlan &&
							selectedPlan !== "enterprise" &&
							!(selectedPlan === currentPlan && isSubscriptionActive)
								? "bg-[#1d4ea8] text-white hover:scale-[1.01] hover:bg-[#153a82] active:scale-95 disabled:opacity-50"
								: "cursor-not-allowed bg-gray-300 text-gray-500 shadow-none hover:bg-gray-300"
						}`}
					>
						{submitButtonText}
						<Icon icon="lucide:credit-card" className="ml-1 size-5" />
					</Button>
				</div>
			</div>
		</Modal>
	);
}
