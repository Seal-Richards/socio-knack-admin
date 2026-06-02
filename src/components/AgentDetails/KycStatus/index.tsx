"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { AgentData } from "@/types/agent";
import { useUpdateAgentStatus, useSendAgentKycComment } from "@/hooks/useAgent";
import { toast } from "sonner";

export default function KycStatus({ agent }: { agent: AgentData }) {
	const hasId = !!agent.kycDocuments?.idFront;
	const hasSelfie = !!agent.kycDocuments?.selfie;
	const hasBank = !!agent.wallet?.fincraAccountNumber;

	let progress = 0;
	if (hasId) progress += 35;
	if (hasSelfie) progress += 35;
	if (hasBank) progress += 30;

	const [kycStatus, setKycStatus] = useState(agent.kycStatus || "pending");
	const [comment, setComment] = useState(agent.kycComment || "");

	const updateStatusMutation = useUpdateAgentStatus();
	const sendCommentMutation = useSendAgentKycComment();

	const handleSaveStatus = async () => {
		try {
			const res = await updateStatusMutation.mutateAsync({
				userId: agent._id || agent.id,
				payload: {
					kycStatus,
				},
			});

			if (res.success) {
				toast.success("Agent KYC status updated successfully.");
			} else {
				toast.error(res.message || "Failed to update KYC status.");
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "An error occurred.");
		}
	};

	const handleSendComment = async () => {
		try {
			const res = await sendCommentMutation.mutateAsync({
				userId: agent._id || agent.id,
				comment,
			});

			if (res.success) {
				toast.success("KYC comment sent to agent's email successfully.");
			} else {
				toast.error(res.message || "Failed to send KYC comment.");
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "An error occurred.");
		}
	};

	const viewDocument = (url?: string) => {
		if (url) {
			window.open(url, "_blank");
		} else {
			toast.info("No document uploaded yet.");
		}
	};

	return (
		<div className="flex flex-col gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:gap-8 md:p-10">
			<h3 className="text-[14px] font-bold text-gray-500 sm:text-[15px]">KYC Verification</h3>
			<div className="h-px w-full bg-gray-100" />

			{/* Verification Progress Bar */}
			<div className="flex w-full max-w-lg items-center gap-4 py-2 sm:py-4">
				<span className="whitespace-nowrap text-[14px] font-bold text-gray-800">
					Verification
				</span>
				<div className="h-3.5 w-full flex-1 overflow-hidden rounded-full bg-gray-200">
					<div
						style={{ width: `${progress}%` }}
						className="h-full rounded-full bg-[#1d4ea8]"
					/>
				</div>
				<span className="text-[14px] font-bold text-gray-800">{progress}%</span>
			</div>

			<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
				{/* Left Column: Verification Steps */}
				<div className="flex flex-col gap-4 sm:gap-6">
					<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 sm:p-5">
						<span className="text-[14px] font-bold text-gray-700 sm:text-[15px]">
							Identity Verification
						</span>
						<button
							onClick={() => viewDocument(agent.kycDocuments?.idFront)}
							className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-[12px] font-bold text-gray-600 transition-colors hover:bg-gray-50"
						>
							<Icon icon="solar:eye-bold" className="size-4" />
							View ID Card
						</button>
					</div>

					<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 sm:p-5">
						<span className="text-[14px] font-bold text-gray-700 sm:text-[15px]">
							Proof of address / Selfie
						</span>
						<button
							onClick={() => viewDocument(agent.kycDocuments?.selfie)}
							className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-[12px] font-bold text-gray-600 transition-colors hover:bg-gray-50"
						>
							<Icon icon="solar:eye-bold" className="size-4" />
							View Selfie
						</button>
					</div>

					<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 sm:p-5">
						<span className="text-[14px] font-bold text-gray-700 sm:text-[15px]">
							Link Bank Account
						</span>
						{hasBank ? (
							<div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-white">
								<Icon icon="lucide:check" className="size-4" />
							</div>
						) : (
							<span className="rounded-full bg-orange-100 px-3 py-1 text-[11px] font-bold text-orange-600">
								Not Linked
							</span>
						)}
					</div>
				</div>

				{/* Right Column: Access Panel */}
				<div className="w-full">
					<div className="flex flex-col gap-6 rounded-3xl border border-gray-200 p-6 shadow-sm sm:p-8">
						<h3 className="text-[14px] font-bold text-gray-800">Access Panel</h3>
						<div className="h-px w-full bg-gray-100" />

						<div className="space-y-2">
							<Label className="text-[13px] font-bold text-gray-800">
								Set Status
							</Label>
							<Select value={kycStatus} onValueChange={setKycStatus}>
								<SelectTrigger className="h-12 w-full rounded-xl border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-600 focus:ring-0">
									<SelectValue placeholder="Select Status" />
								</SelectTrigger>
								<SelectContent className="rounded-xl border-gray-100">
									<SelectItem value="approved">Approved</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="rejected">Rejected</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="mt-4 flex flex-col gap-4 sm:flex-row">
							<Button
								variant="outline"
								onClick={() => {
									setKycStatus(agent.kycStatus || "pending");
								}}
								className="h-12 flex-1 rounded-full border-gray-100 text-[14px] font-bold text-gray-800 hover:bg-gray-50"
							>
								Cancel
							</Button>
							<Button
								disabled={updateStatusMutation.isPending}
								onClick={handleSaveStatus}
								className="h-12 flex-1 rounded-full bg-[#4CAF50] text-[14px] font-bold text-white hover:bg-[#43A047]"
							>
								{updateStatusMutation.isPending ? "Saving..." : "Save"}
							</Button>
						</div>

						<div className="h-px w-full bg-gray-100" />

						<div className="space-y-2">
							<Label className="text-[13px] font-bold text-gray-800">Comment</Label>
							<Textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder="Input comment"
								className="min-h-[120px] resize-none rounded-xl border-gray-200 px-4 py-3 text-[13px] focus-visible:ring-0"
							/>
						</div>

						<div className="mt-2 flex justify-end">
							<Button
								disabled={sendCommentMutation.isPending || !comment.trim()}
								onClick={handleSendComment}
								className="h-12 w-full rounded-full bg-[#1d4ea8] text-[14px] font-bold text-white hover:bg-[#153a82] sm:w-32"
							>
								{sendCommentMutation.isPending ? "Sending..." : "Send"}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
