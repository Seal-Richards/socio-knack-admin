"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { type UserProfileData } from "@/types/profile";
import { useGetMe, useUpdateProfile } from "@/hooks/useProfile";
import Modal from "@/components/_modals";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSendAgentComplianceComment } from "@/hooks/useAgent";
import { toast } from "@/lib/toast";

interface ComplianceProps {
	supervisor: {
		id: string;
		raw?: UserProfileData;
	};
}

export default function Compliance({ supervisor }: ComplianceProps) {
	const rawSupervisor = supervisor.raw;

	// Query logged-in user profile
	const { data: meRes } = useGetMe();
	const currentUser = meRes?.data;

	const [status, setStatus] = useState<"warning" | "critical" | "good">("warning");
	const [comment, setComment] = useState("");
	const sendComplianceMutation = useSendAgentComplianceComment();

	const handleSendComment = async () => {
		if (!comment.trim()) return;
		try {
			const res = await sendComplianceMutation.mutateAsync({
				userId: rawSupervisor?._id || rawSupervisor?.id || supervisor.id,
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

	// Check if this supervisor details page belongs to the logged-in supervisor/staffs
	const isOwnProfile =
		currentUser?.id === rawSupervisor?.id ||
		currentUser?.id === rawSupervisor?._id ||
		(currentUser?.role === "supervisor" && currentUser?.id === supervisor.id);

	const comp = rawSupervisor?.compliance || {
		termsAccepted: false,
		dataProcessingConsent: false,
		locationConsent: false,
		incentivePolicyAccepted: false,
	};

	// State variables for interactive checklist
	const [termsAccepted, setTermsAccepted] = useState(comp.termsAccepted);
	const [dataProcessingConsent, setDataProcessingConsent] = useState(comp.dataProcessingConsent);
	const [locationConsent, setLocationConsent] = useState(comp.locationConsent);
	const [incentivePolicyAccepted, setIncentivePolicyAccepted] = useState(
		comp.incentivePolicyAccepted,
	);

	// Modal variables
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState<React.ReactNode>(null);
	const [activeDocId, setActiveDocId] = useState<string | null>(null);

	// Invalidate and sync states when supervisor updates
	useEffect(() => {
		if (rawSupervisor?.compliance) {
			setTermsAccepted(!!rawSupervisor.compliance.termsAccepted);
			setDataProcessingConsent(!!rawSupervisor.compliance.dataProcessingConsent);
			setLocationConsent(!!rawSupervisor.compliance.locationConsent);
			setIncentivePolicyAccepted(!!rawSupervisor.compliance.incentivePolicyAccepted);
		}
	}, [rawSupervisor]);

	const updateProfileMutation = useUpdateProfile();

	const handleSaveCompliance = async () => {
		try {
			const res = await updateProfileMutation.mutateAsync({
				compliance: {
					termsAccepted,
					dataProcessingConsent,
					locationConsent,
					incentivePolicyAccepted,
				},
			});

			if (res.success) {
				toast.success("Compliance checklist saved successfully.");
			} else {
				toast.error(res.message || "Failed to save compliance checklist.");
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "An error occurred.");
		}
	};

	const handleViewDoc = (type: string) => {
		setActiveDocId(type);
		if (type === "terms") {
			setModalTitle("Terms & Conditions Agreement");
			setModalContent(
				<div className="space-y-4 text-[13px] leading-relaxed text-gray-600">
					<p className="font-semibold text-gray-800">
						Welcome to the SocioKnack Supervisor Agreement.
					</p>
					<p>
						As a supervisor on this platform, you agree to the following terms and
						conditions:
					</p>
					<ul className="list-disc space-y-2 pl-5">
						<li>
							<strong>Operational Excellence:</strong> You are responsible for
							managing field agents, assigning designated geographic zones, and
							validating visits and logs in a timely manner.
						</li>
						<li>
							<strong>Data Integrity:</strong> You certify that all task reviews and
							supervisor approvals you issue are based on real, verified field data.
							Falsifying records will lead to immediate termination.
						</li>
						<li>
							<strong>Confidentiality:</strong> You will treat all proprietary
							business datasets, customer contact information, agent statistics, and
							territory analytics with absolute confidentiality.
						</li>
						<li>
							<strong>Account Security:</strong> You are responsible for maintaining
							the security of your account credentials. You must not share your
							account with any third party.
						</li>
					</ul>
				</div>,
			);
		} else if (type === "consent") {
			setModalTitle("Data Processing & Privacy Consent");
			setModalContent(
				<div className="space-y-4 text-[13px] leading-relaxed text-gray-600">
					<p className="font-semibold text-gray-800">
						Your Data Privacy is Important to Us.
					</p>
					<p>
						In accordance with the Nigeria Data Protection Regulation (NDPR) and
						international privacy standards, we collect and process certain personal and
						business data:
					</p>
					<ul className="list-disc space-y-2 pl-5">
						<li>
							<strong>Collected Information:</strong> We store profile details (name,
							email, phone number) and transaction logs associated with your platform
							usage.
						</li>
						<li>
							<strong>Purpose of Processing:</strong> Data is used to assign tasks,
							calculate payouts, monitor team performance, and audit compliance
							metrics.
						</li>
						<li>
							<strong>Security Measures:</strong> We employ industry-standard
							encryption protocols to protect your personal and operational datasets
							from unauthorized access.
						</li>
						<li>
							<strong>Third-Party Sharing:</strong> We do not sell or lease your
							datasets. Your information is only shared with authorized managers of
							the business you are associated with.
						</li>
					</ul>
				</div>,
			);
		} else if (type === "location") {
			setModalTitle("Location & GPS Tracking Consent");
			setModalContent(
				<div className="space-y-4 text-[13px] leading-relaxed text-gray-600">
					<p className="font-semibold text-gray-800">
						Enabling Field Auditing and Geographic Compliance.
					</p>
					<p>
						To support territory validation and verify agent location reports,
						SocioKnack utilizes location and geofencing capabilities:
					</p>
					<ul className="list-disc space-y-2 pl-5">
						<li>
							<strong>GPS Tracking:</strong> The platform accesses your location when
							you perform zone assignments, field visits, or approve agent visits to
							generate audit logs.
						</li>
						<li>
							<strong>Background Tracking:</strong> Background location services may
							be used during working hours to coordinate real-time dispatch and
							calculate travel mileage.
						</li>
						<li>
							<strong>Data Retention:</strong> Location history logs are retained
							strictly for verification, performance analysis, and expense
							reimbursement claims.
						</li>
						<li>
							<strong>User Control:</strong> You can manage location permissions
							through your device settings, or log out of the platform to stop
							location updates outside working hours.
						</li>
					</ul>
				</div>,
			);
		} else if (type === "incentive") {
			setModalTitle("Incentive Policy & Payout Terms");
			setModalContent(
				<div className="space-y-4 text-[13px] leading-relaxed text-gray-600">
					<p className="font-semibold text-gray-800">
						Understanding Your Earnings and Incentives.
					</p>
					<p>
						This policy details how supervisor incentives and payouts are calculated,
						verified, and dispersed:
					</p>
					<ul className="list-disc space-y-2 pl-5">
						<li>
							<strong>Calculation Basis:</strong> Supervisor payouts are tied directly
							to your team’s successfully completed tasks, approved client reports,
							and zone target achievements.
						</li>
						<li>
							<strong>Validation Period:</strong> All logs and tasks undergo
							verification. Payouts are updated in your wallet after final review by
							the business admin.
						</li>
						<li>
							<strong>Anti-Fraud Penalty:</strong> Approving fraudulent agent visits
							or falsifying reports is a severe violation. Any detection of fraud will
							result in the immediate forfeiture of all pending incentives.
						</li>
						<li>
							<strong>Withdrawal:</strong> Once approved, you can request dispersal of
							your funds from your digital wallet to your linked bank account subject
							to standard processing times.
						</li>
					</ul>
				</div>,
			);
		}
		setIsModalOpen(true);
	};

	const handleAcceptDoc = () => {
		if (activeDocId === "terms") setTermsAccepted(true);
		else if (activeDocId === "consent") setDataProcessingConsent(true);
		else if (activeDocId === "location") setLocationConsent(true);
		else if (activeDocId === "incentive") setIncentivePolicyAccepted(true);
		setIsModalOpen(false);
		toast.success(`Accepted: ${modalTitle}`);
	};

	const checklist = [
		{
			id: "terms",
			title: "Terms & Conditions acceptance",
			description: "Supervisor has read and accepted terms of service during onboarding",
			isActive: comp.termsAccepted,
			checked: termsAccepted,
			setChecked: setTermsAccepted,
		},
		{
			id: "consent",
			title: "Data processing consent",
			description:
				"Supervisor agreed to business operational and personal data processing rules",
			isActive: comp.dataProcessingConsent,
			checked: dataProcessingConsent,
			setChecked: setDataProcessingConsent,
		},
		{
			id: "location",
			title: "Location tracking consent (field activity)",
			description:
				"Supervisor allowed GPS tracking and zone validations for territory compliance checks",
			isActive: comp.locationConsent,
			checked: locationConsent,
			setChecked: setLocationConsent,
		},
		{
			id: "incentive",
			title: "Incentive policy acceptance",
			description:
				"Supervisor acknowledged terms of zone verification rewards and target payouts",
			isActive: comp.incentivePolicyAccepted,
			checked: incentivePolicyAccepted,
			setChecked: setIncentivePolicyAccepted,
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

						{isOwnProfile ? (
							<div className="flex shrink-0 items-center gap-3">
								<button
									type="button"
									onClick={() => handleViewDoc(item.id)}
									className="text-gray-400 transition-colors hover:text-[#1d4ea8]"
									aria-label={`View ${item.title} document`}
								>
									<Icon icon="solar:eye-bold" className="size-5" />
								</button>
								<Checkbox
									checked={item.checked}
									onCheckedChange={(val) => item.setChecked(!!val)}
									aria-label={`Accept ${item.title}`}
								/>
							</div>
						) : (
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
						)}
					</div>
				))}

				{isOwnProfile && (
					<div className="mt-8 flex justify-end">
						<Button
							disabled={updateProfileMutation.isPending}
							onClick={handleSaveCompliance}
							className="h-12 w-full rounded-full bg-[#1d4ea8] text-[14px] font-bold text-white hover:bg-[#153a82] sm:w-48"
						>
							{updateProfileMutation.isPending ? "Saving..." : "Save Compliance"}
						</Button>
					</div>
				)}
			</div>

			{!isOwnProfile && (
				<div className="mt-8 border-t border-gray-100 pt-8">
					<h4 className="mb-4 text-[14px] font-bold text-gray-800">
						Send Compliance Comment
					</h4>
					<div className="max-w-xl space-y-4">
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
			)}

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={modalTitle}
				className="max-w-md text-gray-800"
			>
				<div className="flex flex-col gap-6">
					<div>{modalContent}</div>
					<div className="flex justify-end gap-3 pt-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsModalOpen(false)}
							className="h-10 rounded-xl border border-gray-200 px-5 text-xs font-bold text-gray-500 hover:bg-gray-50"
						>
							Close
						</Button>
						{isOwnProfile && (
							<Button
								type="button"
								onClick={handleAcceptDoc}
								className="h-10 rounded-xl bg-green-600 px-5 text-xs font-bold text-white hover:bg-green-700"
							>
								Accept & Acknowledge
							</Button>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
}
