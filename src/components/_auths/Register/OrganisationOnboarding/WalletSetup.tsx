"use client";

import { useState } from "react";
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
import { toast } from "@/lib/toast";
import { useGetBankList } from "@/hooks/useWallet";
import { useLinkBank } from "@/hooks/useBusiness";
import StepProgressBar from "../Shared/StepProgressBar";

type WalletSetupProps = {
	onNext: (data: {
		bankName: string;
		bankCode: string;
		accountNumber: string;
		accountName: string;
		bvn: string;
	}) => void;
	onPrev?: () => void;
	initialValues: {
		bankName?: string;
		bankCode?: string;
		accountNumber?: string;
		accountName?: string;
		bvn?: string;
	};
	step?: number;
	totalSteps?: number;
};

export default function WalletSetup({
	onNext,
	onPrev,
	initialValues,
	step = 5,
	totalSteps = 6,
}: WalletSetupProps) {
	const [bankCode, setBankCode] = useState(initialValues.bankCode || "");
	const [accountNumber, setAccountNumber] = useState(initialValues.accountNumber || "");
	const [accountName, setAccountName] = useState(initialValues.accountName || "");
	const [bvn, setBvn] = useState(initialValues.bvn || "");

	const { data: bankListRes, isLoading: isBanksLoading } = useGetBankList();
	const linkBankMutation = useLinkBank();

	const banks = bankListRes?.data || [];
	const selectedBank = banks.find((b) => b.code === bankCode);
	const bankName = selectedBank ? selectedBank.name : "";

	const handleSave = async () => {
		if (!bankCode) {
			toast.error("Please select your settlement bank.");
			return;
		}
		if (!accountNumber.trim()) {
			toast.error("Please enter your account number.");
			return;
		}
		if (!accountName.trim()) {
			toast.error("Please enter your account name.");
			return;
		}

		if (linkBankMutation.isPending) return;

		try {
			const res = await linkBankMutation.mutateAsync({
				bankName,
				bankCode,
				accountNumber,
				accountName,
				bvn: bvn.trim() || undefined,
			});

			if (res.success) {
				toast.success("Settlement bank details linked successfully!");
				onNext({
					bankName,
					bankCode,
					accountNumber,
					accountName,
					bvn,
				});
			} else {
				toast.error(res.message || "Failed to link settlement bank details.");
			}
		} catch (error: unknown) {
			toast.error(
				error instanceof Error
					? error.message
					: "An error occurred while linking your bank account.",
			);
		}
	};

	const { isPending } = linkBankMutation;

	return (
		<div className="relative w-full">
			<button
				onClick={onPrev}
				disabled={isPending}
				className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100 disabled:opacity-50"
				aria-label="Go back"
			>
				<Icon icon="lucide:arrow-left" className="size-5" />
			</button>

			<StepProgressBar currentStep={step} totalSteps={totalSteps} title="Wallet Linking" />

			<div className="mt-6 space-y-6">
				{/* Settlement Bank Account Details */}
				<div className="space-y-4">
					<h4 className="text-md text-darkBlue-900 border-b pb-2 font-semibold">
						Settlement Bank Account Details
					</h4>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label className="text-sm font-semibold text-gray-700">Bank Name</Label>
							<Select
								value={bankCode}
								onValueChange={setBankCode}
								disabled={isPending || isBanksLoading}
							>
								<SelectTrigger className="h-12 border-gray-200 bg-gray-50">
									<SelectValue
										placeholder={
											isBanksLoading ? "Loading banks..." : "Select Bank"
										}
									/>
								</SelectTrigger>
								<SelectContent>
									{banks.map((bank) => (
										<SelectItem key={bank.code} value={bank.code}>
											{bank.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-semibold text-gray-700">
								Account Number
							</Label>
							<Input
								placeholder="Enter here"
								value={accountNumber}
								onChange={(e) => setAccountNumber(e.target.value)}
								disabled={isPending}
								className="h-12 border-gray-200 bg-gray-50"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label className="text-sm font-semibold text-gray-700">
								Account Name
							</Label>
							<Input
								placeholder="Enter here"
								value={accountName}
								onChange={(e) => setAccountName(e.target.value)}
								disabled={isPending}
								className="h-12 border-gray-200 bg-gray-50"
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-semibold text-gray-700">
								BVN (Optional)
							</Label>
							<Input
								placeholder="Enter here"
								value={bvn}
								onChange={(e) => setBvn(e.target.value)}
								disabled={isPending}
								className="h-12 border-gray-200 bg-gray-50"
							/>
						</div>
					</div>
				</div>

				<Button
					onClick={handleSave}
					disabled={isPending || isBanksLoading}
					className="text-md mt-8 h-12 w-full bg-yellow-500 font-sans font-semibold text-white hover:bg-yellow-600 disabled:opacity-50"
				>
					{isPending ? "Saving..." : "Save & Continue"}
				</Button>
			</div>
		</div>
	);
}
