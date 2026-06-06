"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import Modal from "@/components/_modals";
import PricingModal from "@/components/_modals/PricingModal";
import { useGetBusinessSettings, useUpdateBusinessIncentive } from "@/hooks/useBusiness";
import { useGetWalletBalance, useActivateWallet } from "@/hooks/useWallet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function BillingsConfigTab() {
	const { data: businessRes, isLoading: isLoadingBusiness } = useGetBusinessSettings();
	const {
		data: walletRes,
		isLoading: isLoadingWallet,
		refetch: refetchWallet,
	} = useGetWalletBalance();

	const activateWalletMutation = useActivateWallet();
	const updateIncentiveMutation = useUpdateBusinessIncentive();

	const business = businessRes?.data;
	const wallet = walletRes?.data;

	const formatDate = (dateString?: string | null) => {
		if (!dateString) return "N/A";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const renewsOn = React.useMemo(() => {
		if (business?.lastPaymentDate) {
			const paymentDate = new Date(business.lastPaymentDate);
			paymentDate.setDate(paymentDate.getDate() + 30);
			return formatDate(paymentDate.toISOString());
		}
		if (business?.createdAt) {
			const trialDate = new Date(business.createdAt);
			trialDate.setDate(trialDate.getDate() + 14);
			return formatDate(trialDate.toISOString());
		}
		return "N/A";
	}, [business]);

	const subscriptionCost = React.useMemo(() => {
		const agentCount = business?.agentCount || 10;
		const price = agentCount * 4000;
		return `₦${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
	}, [business]);

	const isActive = business?.subscriptionStatus === "active";

	const planName = business?.subscriptionPlan
		? `${business.subscriptionPlan.charAt(0).toUpperCase()}${business.subscriptionPlan.slice(1)} Plan`
		: "Basic Plan";

	// Wallet activation modal state
	const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
	const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
	const [bvn, setBvn] = useState("");
	const [bvnError, setBvnError] = useState("");

	// Incentive settings state
	const [incentiveType, setIncentiveType] = useState<"flat" | "percentage">("flat");
	const [incentiveValue, setIncentiveValue] = useState<string>("0");

	// Pre-fill incentives state when business settings are loaded
	React.useEffect(() => {
		if (business) {
			setIncentiveType(business.defaultIncentiveType || "flat");
			setIncentiveValue(String(business.defaultIncentiveValue || 0));
		}
	}, [business]);

	const handleActivateSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const sanitizedBvn = bvn.trim();
		if (!/^\d{11}$/.test(sanitizedBvn)) {
			setBvnError("BVN must be exactly 11 numeric digits.");
			return;
		}
		setBvnError("");

		try {
			const res = await activateWalletMutation.mutateAsync(sanitizedBvn);
			if (res.success) {
				toast.success("Virtual wallet activated successfully!");
				setIsActivateModalOpen(false);
				setBvn("");
				refetchWallet().catch(() => undefined);
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to activate wallet.");
		}
	};

	const handleIncentiveSubmit = async () => {
		const val = Number(incentiveValue);
		if (Number.isNaN(val) || val < 0) {
			toast.error("Incentive value must be a positive number.");
			return;
		}

		try {
			const res = await updateIncentiveMutation.mutateAsync({
				defaultIncentiveType: incentiveType,
				defaultIncentiveValue: val,
			});
			if (res.success) {
				toast.success("Incentive configuration updated successfully!");
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to update incentive configuration.",
			);
		}
	};

	const isWalletLoading = isLoadingBusiness || isLoadingWallet;

	if (isWalletLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="size-8 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8 text-gray-800">
			{/* Billings Cards section */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				{/* Left Side: Billing & Subscription */}
				<div className="flex flex-col justify-between gap-6 rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
					<div className="space-y-4">
						<div className="flex items-center justify-between border-b border-gray-50 pb-4">
							<div>
								<h3 className="text-[17px] font-bold text-gray-900">
									Billing & Subscription
								</h3>
								<p className="text-xs text-gray-400">
									Manage your subscription plan and payments
								</p>
							</div>
							<span className="inline-flex items-center rounded-full bg-blue-50/50 px-3 py-1.5 text-[11px] font-bold text-[#1d4ea8]">
								{planName}
							</span>
						</div>

						<div className="grid grid-cols-2 gap-4 pt-2">
							<div className="rounded-2xl bg-gray-50/50 p-4">
								<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
									Current Status
								</p>
								{isActive ? (
									<p className="mt-1 flex items-center gap-1.5 text-sm font-black text-green-600">
										<span className="inline-block size-2 animate-pulse rounded-full bg-green-500" />
										Active
									</p>
								) : (
									<p className="mt-1 flex items-center gap-1.5 text-sm font-black text-red-600">
										<span className="inline-block size-2 rounded-full bg-red-500" />
										Inactive
									</p>
								)}
							</div>
							<div className="rounded-2xl bg-gray-50/50 p-4">
								<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
									Billing Cycle
								</p>
								<p className="mt-1 text-sm font-black text-gray-800">Monthly</p>
							</div>
							<div className="rounded-2xl bg-gray-50/50 p-4">
								<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
									Renews On
								</p>
								<p className="mt-1 text-sm font-black text-gray-800">{renewsOn}</p>
							</div>
							<div className="rounded-2xl bg-gray-50/50 p-4">
								<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
									Subscription Cost
								</p>
								<p className="mt-1 text-sm font-black text-gray-800">
									{subscriptionCost}
								</p>
							</div>
						</div>
					</div>

					<div className="flex justify-end pt-4">
						<Button
							variant="outline"
							onClick={() => setIsPricingModalOpen(true)}
							className="h-11 rounded-xl border-gray-100 bg-white font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-800 active:scale-95"
						>
							Upgrade Plan
						</Button>
					</div>
				</div>

				{/* Right Side: Fincra Account Details */}
				<div className="flex flex-col justify-between gap-6 rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
					<div>
						<div className="flex items-center justify-between border-b border-gray-50 pb-4">
							<div>
								<h3 className="text-[17px] font-bold text-gray-900">
									Virtual Settlement Wallet
								</h3>
								<p className="text-xs text-gray-400">
									Settle dynamic payouts using your virtual wallet
								</p>
							</div>
							<Icon icon="logos:fincra" className="h-6" />
						</div>

						{wallet?.fincraVirtualAccountId ? (
							<div className="grid grid-cols-2 gap-4 pt-4">
								<div className="col-span-2 rounded-2xl bg-gray-50/50 p-4">
									<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
										Wallet Balance
									</p>
									<p className="mt-1 text-2xl font-black text-gray-900">
										₦
										{wallet.balance.toLocaleString(undefined, {
											minimumFractionDigits: 2,
										})}
									</p>
								</div>
								<div className="rounded-2xl bg-gray-50/50 p-4">
									<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
										Provision Bank Name
									</p>
									<p className="mt-1 text-sm font-black text-gray-800">
										{wallet.fincraBankName || "Fincra Bank"}
									</p>
								</div>
								<div className="rounded-2xl bg-gray-50/50 p-4">
									<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
										Account Number
									</p>
									<p className="mt-1 text-sm font-black tracking-wider text-gray-800">
										{wallet.fincraAccountNumber || "N/A"}
									</p>
								</div>
							</div>
						) : (
							<div className="mt-4 flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-100 bg-gray-50/20 p-6 text-center">
								<Icon
									icon="solar:wallet-bold-duotone"
									className="mb-3 size-12 text-gray-300"
								/>
								<h4 className="text-[14px] font-bold text-gray-700">
									Virtual Settlement Wallet Not Active
								</h4>
								<p className="mt-1 max-w-xs text-xs text-gray-400">
									Provide your Bank Verification Number to activate your virtual
									wallet.
								</p>
							</div>
						)}
					</div>

					{!wallet?.fincraVirtualAccountId && (
						<div className="flex justify-end pt-4">
							<Button
								onClick={() => setIsActivateModalOpen(true)}
								className="h-11 rounded-xl bg-[#1d4ea8] font-bold text-white shadow-md transition-all hover:bg-[#153a82] active:scale-95"
							>
								Activate Wallet
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Section: Incentive Configuration Settings */}
			<div className="flex flex-col gap-8 rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
				<div>
					<h3 className="text-[17px] font-bold text-gray-900">Incentive settings</h3>
					<p className="text-xs text-gray-400">
						Set default payouts for visits and agent territories
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">
							Incentive Type
						</Label>
						<Select
							value={incentiveType}
							onValueChange={(val) => setIncentiveType(val as "flat" | "percentage")}
						>
							<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-white px-4 text-[14px] font-bold text-gray-800 transition-all hover:bg-gray-50 focus:ring-0">
								<SelectValue />
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100">
								<SelectItem value="flat">Flat Rate (₦)</SelectItem>
								<SelectItem value="percentage">Percentage (%)</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label className="text-[14px] font-medium text-gray-600">
							Default Payout Value
						</Label>
						<div className="relative">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
								{incentiveType === "flat" ? "₦" : "%"}
							</span>
							<Input
								type="number"
								placeholder="0"
								value={incentiveValue}
								onChange={(e) => setIncentiveValue(e.target.value)}
								className="h-12 rounded-xl border-gray-100 bg-gray-50/20 pl-8 font-bold text-gray-950 focus:border-[#1d4ea8] focus:ring-0"
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end border-t border-gray-50 pt-4">
					<Button
						type="button"
						onClick={handleIncentiveSubmit}
						disabled={updateIncentiveMutation.isPending}
						className="h-12 rounded-xl bg-[#1d4ea8] px-8 text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 disabled:opacity-50"
					>
						{updateIncentiveMutation.isPending ? "Saving..." : "Save Incentive Changes"}
					</Button>
				</div>
			</div>

			{/* BVN Activation Modal */}
			<Modal
				isOpen={isActivateModalOpen}
				onClose={() => {
					setIsActivateModalOpen(false);
					setBvn("");
					setBvnError("");
				}}
				title="Activate Virtual Wallet"
				description="Please provide your 11-digit Bank Verification Number (BVN) to provision your Fincra virtual settlement account."
				className="max-w-md"
			>
				<form onSubmit={handleActivateSubmit} className="mt-4 flex flex-col gap-6">
					<div className="space-y-2">
						<Label htmlFor="bvn" className="text-[14px] font-bold text-gray-700">
							Bank Verification Number (BVN)
						</Label>
						<Input
							id="bvn"
							type="text"
							maxLength={11}
							placeholder="Enter 11-digit BVN"
							value={bvn}
							onChange={(e) => setBvn(e.target.value.replace(/\D/g, ""))}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-center font-bold tracking-wider text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						{bvnError && <p className="text-xs font-medium text-red-500">{bvnError}</p>}
					</div>

					<div className="flex flex-col gap-3 pt-4">
						<Button
							type="submit"
							disabled={activateWalletMutation.isPending}
							className="h-12 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 disabled:opacity-50"
						>
							{activateWalletMutation.isPending
								? "Activating..."
								: "Submit & Provision Wallet"}
						</Button>
						<Button
							type="button"
							variant="ghost"
							onClick={() => {
								setIsActivateModalOpen(false);
								setBvn("");
								setBvnError("");
							}}
							className="h-12 w-full rounded-xl text-[15px] font-bold text-gray-500 hover:bg-gray-50"
						>
							Cancel
						</Button>
					</div>
				</form>
			</Modal>

			<PricingModal
				isOpen={isPricingModalOpen}
				onClose={() => setIsPricingModalOpen(false)}
				currentPlan={business?.subscriptionPlan}
			/>
		</div>
	);
}
