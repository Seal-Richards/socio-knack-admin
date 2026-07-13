"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PricingCard from "@/components/Cards/PricingCard";
import { useSession } from "next-auth/react";
import { useGetBusinessSettings, useInitializeSubscription } from "@/hooks/useBusiness";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "@/lib/toast";

import { planFeatures, pricingPlans } from "@/constants/pricing";
import type { PlanKey } from "@/constants/pricing";

const PricingSection = () => {
	const { status } = useSession();
	const isAuthenticated = status === "authenticated";

	// Fetch business settings only if authenticated
	const { data: businessRes } = useGetBusinessSettings({ enabled: isAuthenticated });
	const business = businessRes?.data;
	const currentPlan = business?.subscriptionPlan as PlanKey | undefined;

	const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
	const [seatCount, setSeatCount] = useState<number>(10);

	const initializeSubscriptionMutation = useInitializeSubscription();

	// Pre-select current plan or starter plan if authenticated
	useEffect(() => {
		if (isAuthenticated && business) {
			const activePlan = currentPlan! || "starter";
			if (["starter", "growth", "business", "enterprise"].includes(activePlan)) {
				setSelectedPlan(activePlan);
			} else {
				setSelectedPlan("starter");
			}
		}
	}, [isAuthenticated, business, currentPlan]);

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
			window.location.href = "/contact-us";
			return;
		}

		if (!validateSeats()) return;

		try {
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

	const handleUnauthenticatedAction = (planKey: PlanKey) => {
		if (planKey === "enterprise") {
			window.location.href = "/contact-us";
		} else {
			window.location.href = "/register";
		}
	};

	const getButtonText = (planKey: PlanKey): string => {
		if (planKey === "enterprise") {
			return "Contact Sales";
		}
		if (!isAuthenticated) {
			return "Start 14-Day Free Trial";
		}
		if (currentPlan === planKey) {
			return "Current Plan";
		}
		const label = planKey.charAt(0).toUpperCase() + planKey.slice(1);
		return `Select ${label}`;
	};

	const { isPending } = initializeSubscriptionMutation;

	let setupFeeText = "200,000";
	if (selectedPlan === "starter") {
		setupFeeText = "50,000";
	} else if (selectedPlan === "growth") {
		setupFeeText = "100,000";
	}

	let submitButtonText = "Upgrade & Pay Now";
	if (isPending) {
		submitButtonText = "Initializing payment...";
	} else if (selectedPlan === currentPlan) {
		submitButtonText = "Current Plan Active";
	}

	return (
		<section className="relative overflow-hidden bg-[#f4f7fc]/40 py-20 md:py-32">
			<div className="container mx-auto flex max-w-7xl flex-col items-center px-6 md:px-8">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-8 inline-flex items-center rounded-full border border-blue-100 bg-white px-6 py-3 shadow-sm"
				>
					<span className="text-sm font-bold text-[#204B9B] md:text-lg">Pricing</span>
				</motion.div>

				{/* Title */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center text-4xl font-black tracking-tight text-[#111111] md:text-6xl"
				>
					Flexible Plans for Scalable Growth
				</motion.h2>

				{/* Pricing Cards Grid */}
				<div className="grid w-full grid-cols-1 items-stretch gap-8 md:grid-cols-2 xl:grid-cols-4">
					{pricingPlans.map((plan) => (
						<PricingCard
							key={plan.key}
							theme={plan.theme}
							isCustom={plan.isCustom}
							title={plan.title}
							subtitle={plan.subtitle}
							price={plan.price}
							setupFee={plan.setupFee}
							features={planFeatures[plan.key]}
							buttonText={plan.isCustom ? "Contact Sales" : getButtonText(plan.key)}
							isSelected={isAuthenticated && selectedPlan === plan.key}
							isCurrentPlan={isAuthenticated && currentPlan === plan.key}
							onSelect={() => {
								if (isAuthenticated) setSelectedPlan(plan.key);
							}}
							onAction={() => {
								if (isAuthenticated) {
									setSelectedPlan(plan.key);
								} else {
									handleUnauthenticatedAction(plan.key);
								}
							}}
						/>
					))}
				</div>

				{/* Dynamic Seat Counter and Summary (Only if authenticated, plan is selected, and not enterprise) */}
				{isAuthenticated && selectedPlan && selectedPlan !== "enterprise" && (
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-12 flex w-full flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between"
					>
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
					</motion.div>
				)}

				{/* Activation Actions (Only if authenticated) */}
				{isAuthenticated && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="mt-8 flex w-full flex-col items-center"
					>
						<Button
							disabled={!selectedPlan || selectedPlan === currentPlan || isPending}
							onClick={handleCheckout}
							className={`text-md flex h-14 w-full max-w-md items-center justify-center gap-2 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
								selectedPlan &&
								selectedPlan !== "enterprise" &&
								selectedPlan !== currentPlan
									? "bg-[#1d4ea8] text-white hover:scale-[1.01] hover:bg-[#153a82] active:scale-95 disabled:opacity-50"
									: "cursor-not-allowed bg-gray-300 text-gray-500 shadow-none hover:bg-gray-300"
							}`}
						>
							{submitButtonText}
							<Icon icon="lucide:credit-card" className="ml-1 size-5" />
						</Button>
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default PricingSection;
