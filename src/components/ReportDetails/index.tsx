import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetReportDetails, useApproveVisit, useRejectVisit } from "@/hooks/useReportsPayout";
import { useGetMe } from "@/hooks/useProfile";
import { Icon } from "@iconify/react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { formatCheckInDate } from "@/utils/dateFormatter";
import cn from "@/lib/utils";
import Image from "next/image";
import type { SaleProductItem } from "@/types/reportsPayout";
import * as Dialog from "@radix-ui/react-dialog";

interface ReportDetailsProps {
	id: string;
}

function getOutcomeClass(outcome?: string) {
	if (outcome === "sale") {
		return "bg-green-50 text-green-600 border border-green-100";
	}
	if (outcome === "lead") {
		return "bg-blue-50 text-[#1d4ea8] border border-blue-100";
	}
	return "bg-gray-50 text-gray-600 border border-gray-150";
}

export default function ReportDetails({ id }: ReportDetailsProps) {
	const router = useRouter();

	const { data: meRes } = useGetMe();
	const userRole = meRes?.data?.role;
	const isSupervisor = userRole === "supervisor";
	const canApprove = userRole === "admin" || userRole === "supervisor";

	const { data: reportRes, isLoading, error } = useGetReportDetails(id);
	const approveMutation = useApproveVisit();
	const rejectMutation = useRejectVisit();

	const [isRejectOpen, setIsRejectOpen] = useState(false);
	const [rejectionReason, setRejectionReason] = useState("");

	const visit = reportRes?.data;

	let statusBadgeClass = "bg-orange-50 text-orange-600 border-orange-100";
	let statusText = "Pending Approval";

	if (visit) {
		if (visit.status === "open") {
			statusBadgeClass = "bg-blue-50 text-blue-600 border-blue-100";
			statusText = "Open / Installments";
		} else if (visit.isApproved) {
			statusBadgeClass = "bg-green-50 text-green-600 border-green-100";
			statusText = "Paid / Approved";
		} else if (visit.status === "cancelled") {
			statusBadgeClass = "bg-red-50 text-red-600 border-red-100";
			statusText = "Cancelled / Rejected";
		}
	}

	const handleRejectSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!rejectionReason.trim()) return;
		try {
			await rejectMutation.mutateAsync({
				id,
				isSupervisor,
				reason: rejectionReason.trim(),
			});
			setIsRejectOpen(false);
			setRejectionReason("");
		} catch (err) {
			console.error("Rejection error:", err);
		}
	};

	if (isLoading) {
		return (
			<div className="flex h-96 items-center justify-center">
				<div className="size-10 animate-spin rounded-full border-4 border-[#1d4ea8] border-t-transparent" />
			</div>
		);
	}

	if (error || !visit) {
		return (
			<div className="flex flex-col items-center justify-center p-8 text-center">
				<div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-50 text-red-500">
					<Icon icon="solar:shield-warning-bold" className="size-8" />
				</div>
				<h3 className="text-lg font-bold text-gray-900">Report Details Not Found</h3>
				<p className="mt-1 text-sm text-gray-500">
					The requested report does not exist or you do not have permission to view it.
				</p>
				<button
					onClick={() => router.push("/reports-payouts")}
					className="mt-6 flex items-center gap-2 rounded-xl bg-[#1e288e] px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02]"
				>
					Back to Reports & Payouts
				</button>
			</div>
		);
	}

	const { agentId: agent, report, checkInTime: checkIn, checkOutTime: checkOut } = visit;
	const saleDetails = report?.saleDetails;
	const product = saleDetails?.productId;

	// Format check-in/out duration
	let durationStr = "N/A";
	if (checkIn && checkOut) {
		const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
		const mins = Math.floor(diff / (1000 * 60));
		const hrs = Math.floor(mins / 60);
		if (hrs > 0) {
			durationStr = `${hrs}h ${mins % 60}m`;
		} else {
			durationStr = `${mins}m`;
		}
	}

	return (
		<div className="flex flex-col gap-8 font-sans text-gray-800">
			{/* Top Navigation Row */}
			<div className="flex items-center justify-between">
				<button
					onClick={() => router.push("/reports-payouts")}
					className="flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
				>
					<Icon icon="lucide:arrow-left" className="size-4" />
					Back to Reports
				</button>
				<div className="flex items-center gap-3">
					<span
						className={cn(
							"inline-flex items-center rounded-full px-3.5 py-1 text-xs font-bold capitalize border",
							statusBadgeClass,
						)}
					>
						{statusText}
					</span>

					{canApprove && visit.status === "pending" && (
						<div className="flex gap-2">
							<button
								onClick={() => setIsRejectOpen(true)}
								disabled={rejectMutation.isPending || approveMutation.isPending}
								className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
							>
								<Icon icon="lucide:x-circle" className="size-4" />
								Reject Report
							</button>
							<button
								onClick={() => approveMutation.mutate({ id, isSupervisor })}
								disabled={approveMutation.isPending || rejectMutation.isPending}
								className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-green-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
							>
								{approveMutation.isPending ? (
									<div className="size-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
								) : (
									<Icon icon="lucide:check-circle" className="size-4" />
								)}
								Approve Visit
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Rejection reason banner */}
			{visit.status === "cancelled" && visit.rejectionReason && (
				<div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-5">
					<Icon
						icon="solar:shield-warning-bold"
						className="mt-0.5 size-5 shrink-0 text-red-600"
					/>
					<div>
						<h4 className="text-sm font-bold text-red-950">Report Rejection Reason</h4>
						<p className="mt-1 text-sm leading-relaxed text-red-800">
							&ldquo;{visit.rejectionReason}&rdquo;
						</p>
					</div>
				</div>
			)}

			{/* Header Section */}
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-black text-gray-900">{visit.title}</h1>
				<p className="text-sm text-gray-500">
					Report ID:{" "}
					<span className="font-mono font-bold text-gray-700">{visit._id}</span>
				</p>
			</div>

			{/* Main Layout Grid */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Left Columns (Details & Customer) */}
				<div className="flex flex-col gap-8 lg:col-span-2">
					{/* Card 1: Visit & Outcome Details */}
					<div className="space-y-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
						<div className="flex items-center justify-between border-b border-gray-50 pb-4">
							<h3 className="text-lg font-bold text-gray-900">Task Summary</h3>
							<div className="flex items-center gap-2">
								<Icon
									icon="solar:clipboard-text-bold-duotone"
									className="size-5 text-[#1d4ea8]"
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div>
								<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
									Outcome Type
								</p>
								<span
									className={cn(
										"inline-flex items-center rounded-full px-3 py-1 text-xs font-bold capitalize mt-1.5",
										getOutcomeClass(report?.outcome),
									)}
								>
									{report?.outcome || "sale"}
								</span>
							</div>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
									Priority
								</p>
								<span className="mt-2 block text-sm font-black capitalize text-gray-800">
									{visit.priority}
								</span>
							</div>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
									Check In
								</p>
								<p className="mt-1 text-sm font-black text-gray-800">
									{visit.checkInTime
										? formatCheckInDate(visit.checkInTime)
										: "N/A"}
								</p>
							</div>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
									Check Out / Duration
								</p>
								<p className="mt-1 text-sm font-black text-gray-800">
									{visit.checkOutTime
										? new Date(visit.checkOutTime).toLocaleTimeString("en-US", {
												hour: "numeric",
												minute: "numeric",
												hour12: true,
											})
										: "N/A"}{" "}
									<span className="ml-1 text-xs font-medium text-gray-400">
										({durationStr})
									</span>
								</p>
							</div>
						</div>

						<div className="pt-2">
							<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
								Agent Notes & Observations
							</p>
							<p className="mt-2 rounded-2xl border border-gray-100/50 bg-gray-50/50 p-5 text-sm leading-relaxed text-gray-600">
								{report?.notes || "No extra notes logged for this visit."}
							</p>
						</div>
					</div>

					{/* Card 2: Customer Contacts */}
					<div className="space-y-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
						<div className="flex items-center justify-between border-b border-gray-50 pb-4">
							<h3 className="text-lg font-bold text-gray-900">
								Customer Contact Details
							</h3>
							<Icon
								icon="solar:user-speak-bold-duotone"
								className="size-5 text-green-500"
							/>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="flex items-center gap-3 rounded-2xl border border-gray-100/50 bg-gray-50/50 p-4">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-500">
									<Icon icon="solar:user-rounded-bold" className="size-5" />
								</div>
								<div>
									<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
										Customer Full Name
									</p>
									<p className="mt-0.5 text-sm font-black text-gray-800">
										{report?.customerFullName || "N/A"}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3 rounded-2xl border border-gray-100/50 bg-gray-50/50 p-4">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-500">
									<Icon icon="solar:phone-bold" className="size-5" />
								</div>
								<div>
									<p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
										Customer Phone Number
									</p>
									<p className="mt-0.5 text-sm font-black tracking-wider text-gray-800">
										{report?.customerPhoneNumber || "N/A"}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Card 3: Attachments / Media & Documents */}
					<div className="space-y-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
						<div className="flex items-center justify-between border-b border-gray-50 pb-4">
							<h3 className="text-lg font-bold text-gray-900">
								Media & Document Attachments
							</h3>
							<Icon
								icon="solar:gallery-download-bold-duotone"
								className="size-5 text-[#1d4ea8]"
							/>
						</div>

						{/* Photos Section */}
						<div className="space-y-3">
							<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
								Uploaded Images / Photos
							</p>
							{report?.photos && report.photos.length > 0 ? (
								<div className="flex flex-wrap gap-4 pt-1">
									{report.photos.map((url: string, idx: number) => (
										<a
											key={url}
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											title={`View attachment ${idx + 1}`}
											aria-label={`View attachment ${idx + 1}`}
											className="relative block size-24 overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all hover:scale-105"
										>
											<Image
												src={url}
												alt={`Attachment ${idx + 1}`}
												fill
												className="object-cover"
											/>
										</a>
									))}
								</div>
							) : (
								<p className="text-xs font-semibold italic text-gray-400">
									No image files attached.
								</p>
							)}
						</div>

						{/* PDFs & Documents Section */}
						<div className="space-y-3 border-t border-gray-50 pt-4">
							<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
								Document Files (PDF, Word, etc.)
							</p>
							{report?.pdfDocuments && report.pdfDocuments.length > 0 ? (
								<div className="grid grid-cols-1 gap-3 pt-1 md:grid-cols-2">
									{report.pdfDocuments.map((url: string, idx: number) => {
										const isPdf = url.toLowerCase().includes(".pdf");
										return (
											<a
												key={url}
												href={url}
												target="_blank"
												rel="noopener noreferrer"
												className="group flex items-center justify-between rounded-2xl border border-gray-100/50 bg-gray-50/50 p-4 transition-all hover:bg-gray-100/30"
											>
												<div className="flex items-center gap-3">
													<div className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
														<Icon
															icon={
																isPdf
																	? "solar:document-text-bold"
																	: "solar:document-bold"
															}
															className="size-5"
														/>
													</div>
													<span className="text-xs font-bold text-gray-700">
														Attachment_{idx + 1}
														{isPdf ? ".pdf" : ""}
													</span>
												</div>
												<Icon
													icon="solar:download-bold"
													className="size-4 text-gray-400 transition-colors group-hover:text-gray-900"
												/>
											</a>
										);
									})}
								</div>
							) : (
								<p className="text-xs font-semibold italic text-gray-400">
									No document files attached.
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Right Column (Sales targets, Agent, Checklist) */}
				<div className="flex flex-col gap-8">
					{/* Card 4: Sales & Payout Details */}
					{report?.outcome === "sale" && (
						<div className="space-y-6 rounded-[2rem] border border-gray-100 bg-[#eaf5eb]/40 p-8 shadow-sm">
							<div className="flex items-center justify-between border-b border-green-100/50 pb-4">
								<h3 className="text-lg font-bold text-green-950">
									Sales & Payout details
								</h3>
								<Icon
									icon="solar:banknote-bold-duotone"
									className="size-5 text-green-600"
								/>
							</div>

							<div className="space-y-4 text-sm text-green-900">
								{saleDetails?.products && saleDetails.products.length > 0 ? (
									<div className="space-y-3 border-b border-green-100/50 pb-4">
										<p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
											Products / Services Sold
										</p>
										{saleDetails.products.map(
											(item: SaleProductItem, idx: number) => (
												<div
													key={item._id || idx}
													className="flex items-center justify-between rounded-xl border border-green-100/30 bg-green-500/5 p-3"
												>
													<div className="flex-1">
														<p className="text-xs font-bold text-green-950">
															{item.name ||
																item.productId?.name ||
																`Product #${idx + 1}`}
														</p>
														<p className="mt-0.5 text-[10px] font-medium text-green-700">
															Unit Cost: ₦
															{(
																item.cost ||
																item.productId?.cost ||
																0
															).toLocaleString()}
														</p>
													</div>
													<div className="text-right">
														<p className="text-xs font-black text-green-950">
															x{item.quantity}
														</p>
														<p className="mt-0.5 text-[10px] font-bold text-green-700">
															₦
															{(
																(item.cost ||
																	item.productId?.cost ||
																	0) * item.quantity
															).toLocaleString()}
														</p>
													</div>
												</div>
											),
										)}
									</div>
								) : (
									<div>
										<p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
											Product / Service Sold
										</p>
										<p className="mt-0.5 font-bold text-green-950">
											{product?.name || "N/A"}
										</p>
										<span className="mt-0.5 block text-xs font-medium text-green-700">
											Category: {product?.category || "General"}
										</span>
									</div>
								)}

								<div className="grid grid-cols-2 gap-4">
									{!saleDetails?.products || saleDetails.products.length === 0 ? (
										<div>
											<p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
												Quantity
											</p>
											<p className="mt-0.5 font-bold text-green-950">
												{saleDetails?.quantity || 1}
											</p>
										</div>
									) : (
										<div>
											<p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
												Total Items
											</p>
											<p className="mt-0.5 font-bold text-green-950">
												{saleDetails.products.reduce(
													(sum: number, p: SaleProductItem) =>
														sum + (p.quantity || 0),
													0,
												)}
											</p>
										</div>
									)}
									<div>
										<p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
											Total Sale Value
										</p>
										<p className="mt-0.5 font-bold text-green-950">
											₦{(saleDetails?.saleValue || 0).toLocaleString()}
										</p>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4 border-t border-green-100/50 pt-4">
									<div>
										<p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
											Payment Mode
										</p>
										<p className="mt-0.5 font-bold capitalize text-green-950">
											{saleDetails?.paymentMode === "fullPayment"
												? "Full Payment"
												: saleDetails?.paymentMode || "N/A"}
										</p>
									</div>
									<div>
										<p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
											Latest Logged Amount
										</p>
										<p className="mt-0.5 font-bold text-green-950">
											₦{(saleDetails?.amount || 0).toLocaleString()}
										</p>
									</div>
								</div>

								{saleDetails?.paymentMode === "installment" && (
									<div className="space-y-3 border-t border-green-100/50 pt-4">
										{saleDetails.installments &&
											saleDetails.installments.length > 0 && (
												<>
													<p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
														Installment Payment Logs
													</p>
													<div className="space-y-2">
														{saleDetails.installments.map(
															(inst, idx) => {
																const dateStr = inst.date
																	? new Date(
																			inst.date,
																		).toLocaleString("en-US", {
																			day: "2-digit",
																			month: "2-digit",
																			year: "numeric",
																			hour: "2-digit",
																			minute: "2-digit",
																			hour12: true,
																		})
																	: "N/A";
																const amountVal = inst.amount || 0;
																return (
																	<div
																		key={
																			inst._id ||
																			`${inst.date || ""}-${inst.amount || ""}`
																		}
																		className="flex flex-col gap-2 rounded-xl border border-green-100/20 bg-white/60 p-3 text-xs shadow-sm"
																	>
																		<div className="flex items-center justify-between">
																			<div>
																				<p className="font-bold text-green-950">
																					Installment #
																					{idx + 1}
																				</p>
																				<p className="text-[10px] text-gray-500">
																					{dateStr}
																				</p>
																			</div>
																			<p className="font-bold text-green-700">
																				₦
																				{amountVal.toLocaleString()}
																			</p>
																		</div>

																		{(inst.customerReferenceInfo ||
																			inst.notes) && (
																			<div className="mt-1 space-y-1 rounded-lg bg-green-50/50 p-2 text-[10px] sm:text-[11px]">
																				{inst.customerReferenceInfo && (
																					<p>
																						<span className="font-medium text-gray-500">
																							Ref:
																						</span>{" "}
																						<span className="text-gray-800">
																							{
																								inst.customerReferenceInfo
																							}
																						</span>
																					</p>
																				)}
																				{inst.notes && (
																					<p>
																						<span className="font-medium text-gray-500">
																							Notes:
																						</span>{" "}
																						<span className="text-gray-800">
																							{
																								inst.notes
																							}
																						</span>
																					</p>
																				)}
																			</div>
																		)}

																		{inst.photos &&
																			inst.photos.length >
																				0 && (
																				<div className="mt-1 flex gap-2 overflow-x-auto pb-1">
																					{inst.photos.map(
																						(
																							photo: string,
																						) => (
																							<a
																								key={
																									photo
																								}
																								href={
																									photo
																								}
																								target="_blank"
																								rel="noreferrer"
																								className="shrink-0 transition-transform hover:scale-105"
																							>
																								{/* eslint-disable-next-line @next/next/no-img-element */}
																								<img
																									src={
																										photo
																									}
																									alt={`Proof ${idx + 1}`}
																									className="size-10 rounded-md object-cover shadow-sm ring-1 ring-black/5"
																								/>
																							</a>
																						),
																					)}
																				</div>
																			)}
																	</div>
																);
															},
														)}
													</div>
												</>
											)}
										{(() => {
											const totalPaid = (
												saleDetails.installments || []
											).reduce(
												(sum: number, inst) => sum + (inst.amount || 0),
												0,
											);
											const remaining = Math.max(
												0,
												(saleDetails.saleValue || 0) - totalPaid,
											);
											return (
												<div className="mt-2 flex items-center justify-between rounded-xl border border-dashed border-green-200 bg-green-50/50 p-2.5 text-xs">
													<p className="font-bold text-green-900">
														Outstanding Balance
													</p>
													<p className="font-black text-red-600">
														₦{remaining.toLocaleString()}
													</p>
												</div>
											);
										})()}
									</div>
								)}
							</div>
						</div>
					)}

					{/* Card 5: Performed Agent details */}
					<div className="space-y-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
						<div className="flex items-center justify-between border-b border-gray-50 pb-4">
							<h3 className="text-lg font-bold text-gray-900">Performed Agent</h3>
							<Icon
								icon="solar:shield-user-bold-duotone"
								className="size-5 text-[#1d4ea8]"
							/>
						</div>

						{agent ? (
							<div className="flex items-center gap-4">
								<DynamicAvatar
									name={`${agent.firstName || ""} ${agent.lastName || ""}`}
									image={agent.avatar}
									className="size-14 rounded-full border border-gray-100"
								/>
								<div>
									<h4 className="font-bold text-gray-900">
										{`${agent.firstName || ""} ${agent.lastName || ""}`.trim() ||
											"Agent"}
									</h4>
									<p className="mt-0.5 text-xs font-semibold text-[#1d4ea8]">
										Sales Field Agent
									</p>
									<p className="mt-0.5 text-xs font-medium text-gray-400">
										{agent.email}
									</p>
								</div>
							</div>
						) : (
							<p className="text-sm text-gray-400">Agent profile not found</p>
						)}
					</div>

					{/* Card 6: Task Checklist */}
					<div className="space-y-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
						<div className="flex items-center justify-between border-b border-gray-50 pb-4">
							<h3 className="text-lg font-bold text-gray-900">Checklist Details</h3>
							<Icon
								icon="solar:check-square-bold-duotone"
								className="size-5 text-[#1d4ea8]"
							/>
						</div>

						{visit.checklist && visit.checklist.length > 0 ? (
							<div className="flex flex-col gap-3.5">
								{visit.checklist.map((item, i) => (
									<div key={item._id || i} className="flex items-start gap-3">
										<div
											className={cn(
												"flex size-5 shrink-0 items-center justify-center rounded border transition-colors mt-0.5",
												item.isCompleted
													? "border-green-500 bg-green-500 text-white"
													: "border-gray-300 bg-white",
											)}
										>
											{item.isCompleted && (
												<Icon icon="lucide:check" className="size-3.5" />
											)}
										</div>
										<span
											className={cn(
												"text-[13px] font-medium tracking-tight",
												item.isCompleted
													? "text-gray-400 line-through"
													: "text-gray-600",
											)}
										>
											{item.title}
										</span>
									</div>
								))}
							</div>
						) : (
							<p className="text-xs font-semibold italic text-gray-400">
								No checklist items defined.
							</p>
						)}
					</div>
				</div>
			</div>

			<Dialog.Root open={isRejectOpen} onOpenChange={setIsRejectOpen}>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
					<Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 font-sans shadow-xl lg:p-8">
						<Dialog.Title className="mb-4 text-xl font-black text-gray-900">
							Reject Report / Task
						</Dialog.Title>
						<Dialog.Description className="mb-6 text-sm text-gray-500">
							Please state the reason for rejecting this report. This reason will be
							sent to the agent via email and push notification.
						</Dialog.Description>
						<form onSubmit={handleRejectSubmit} className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<label
									htmlFor="rejection-reason"
									className="text-xs font-bold uppercase text-gray-400"
								>
									Reason for Rejection
								</label>
								<textarea
									id="rejection-reason"
									aria-label="Reason for Rejection"
									rows={4}
									value={rejectionReason}
									onChange={(e) => setRejectionReason(e.target.value)}
									placeholder="e.g. Incomplete photo verification, incorrect payment details..."
									className="w-full rounded-xl border border-gray-200 p-3.5 text-sm focus:border-red-500 focus:outline-none"
									required
								/>
							</div>
							<div className="mt-4 flex justify-end gap-3">
								<button
									type="button"
									onClick={() => setIsRejectOpen(false)}
									className="h-10 rounded-xl bg-gray-100 px-5 text-sm font-bold text-gray-900 hover:bg-gray-200"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={rejectMutation.isPending}
									className="h-10 rounded-xl bg-red-600 px-5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
								>
									{rejectMutation.isPending ? "Submitting..." : "Reject Report"}
								</button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
