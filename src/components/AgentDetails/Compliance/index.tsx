import React, { useState } from "react";
import type { AgentData } from "@/types/agent";
import { Icon } from "@iconify/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSendAgentComplianceComment } from "@/hooks/useAgent";
import { toast } from "@/lib/toast";

export default function Compliance({ agent }: { agent: AgentData }) {
	const [status, setStatus] = useState<"warning" | "critical" | "good">("warning");
	const [comment, setComment] = useState("");
	const sendComplianceMutation = useSendAgentComplianceComment();

	const handleSendComment = async () => {
		if (!comment.trim()) return;
		try {
			const res = await sendComplianceMutation.mutateAsync({
				userId: agent._id || agent.id,
				comment: comment.trim(),
				status,
			});
			if (res.success) {
				toast.success("Compliance comment sent successfully.");
				setComment("");
			} else {
				toast.error(res.message || "Failed to send compliance comment.");
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "An error occurred.");
		}
	};

	const comp = agent.compliance || {
		termsAccepted: false,
		dataProcessingConsent: false,
		locationConsent: false,
		incentivePolicyAccepted: false,
	};

	const checklist = [
		{
			title: "Terms & Conditions acceptance",
			description: "Agent has read and accepted terms of service during signup onboarding",
			isActive: comp.termsAccepted,
		},
		{
			title: "Data processing consent",
			description: "Agent agreed to personal and operational data processing rules",
			isActive: comp.dataProcessingConsent,
		},
		{
			title: "Location tracking consent (field activity)",
			description:
				"Agent allowed real-time GPS tracking for supervisor checking and metrics verification",
			isActive: comp.locationConsent,
		},
		{
			title: "Incentive policy acceptance",
			description:
				"Agent acknowledged terms of visual verification rewards and pay-out schedules",
			isActive: comp.incentivePolicyAccepted,
		},
	];

	return (
		<div className="flex min-h-[400px] flex-col rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-10">
			<h3 className="mb-6 text-[14px] font-bold text-gray-500 sm:text-[15px]">
				Compliance Checklist
			</h3>
			<div className="max-w-xl space-y-4">
				{checklist.map((item, idx) => (
					<div
						key={item.title}
						className={`flex items-center justify-between pb-4 ${
							idx !== checklist.length - 1 ? "border-b border-gray-50" : ""
						}`}
					>
						<div className="flex flex-col pr-4">
							<span className="text-[14px] font-bold text-gray-800">
								{item.title}
							</span>
							<span className="mt-1 text-[12px] font-medium text-gray-400">
								{item.description}
							</span>
						</div>
						<div
							className={`flex shrink-0 items-center gap-2 text-[13px] font-bold ${
								item.isActive ? "text-green-600" : "text-gray-400"
							}`}
						>
							<Icon
								icon={item.isActive ? "lucide:check-circle" : "lucide:x-circle"}
								className="size-5"
							/>
							{item.isActive ? "Active" : "Inactive"}
						</div>
					</div>
				))}
			</div>

			{/* Dedicated Compliance Comment Section */}
			<div className="mt-8 border-t border-gray-100 pt-8">
				<h4 className="mb-4 text-[14px] font-bold text-gray-800">
					Send Compliance Comment
				</h4>
				<div className="max-w-xl space-y-4">
					{/* Status Selectors */}
					<div>
						<Label className="text-[13px] font-bold text-gray-800">
							Select Status Level
						</Label>
						<div className="mt-2 flex gap-4">
							<button
								type="button"
								onClick={() => setStatus("good")}
								className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
									status === "good"
										? "border-green-600 bg-green-50 text-green-600 shadow-sm"
										: "border-gray-100 bg-white text-gray-500 hover:bg-gray-50/50"
								}`}
							>
								<span className="size-2 rounded-full bg-green-500" />
								Good / Compliant
							</button>
							<button
								type="button"
								onClick={() => setStatus("warning")}
								className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
									status === "warning"
										? "border-yellow-500 bg-yellow-50 text-yellow-600 shadow-sm"
										: "border-gray-100 bg-white text-gray-500 hover:bg-gray-50/50"
								}`}
							>
								<span className="size-2 rounded-full bg-yellow-500" />
								Warning
							</button>
							<button
								type="button"
								onClick={() => setStatus("critical")}
								className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
									status === "critical"
										? "border-red-600 bg-red-50 text-red-600 shadow-sm"
										: "border-gray-100 bg-white text-gray-500 hover:bg-gray-50/50"
								}`}
							>
								<span className="size-2 rounded-full bg-red-500" />
								Critical
							</button>
						</div>
					</div>

					{/* Textarea */}
					<div className="space-y-2">
						<Label
							htmlFor="compliance-comment"
							className="text-[13px] font-bold text-gray-800"
						>
							Comment
						</Label>
						<Textarea
							id="compliance-comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Describe the compliance issue or observation..."
							className="min-h-[100px] resize-none rounded-xl border-gray-200 px-4 py-3 text-[13px] focus-visible:ring-0"
						/>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end">
						<Button
							disabled={sendComplianceMutation.isPending || !comment.trim()}
							onClick={handleSendComment}
							className="h-11 w-full rounded-full bg-[#1d4ea8] text-[13px] font-bold text-white hover:bg-[#153a82] sm:w-32"
						>
							{sendComplianceMutation.isPending ? "Sending..." : "Send Alert"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
