import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "@iconify/react";
import DynamicAvatar from "@/components/_atoms/DynamicAvatar";
import { Button } from "@/components/ui/button";

interface AgentDetails {
	firstName?: string;
	lastName?: string;
	avatar?: string;
}

interface VisitRecord {
	scheduledDate?: string;
	status?: string;
	priority?: string;
	agentId?: AgentDetails;
	territoryId?: { name?: string };
	location?: { address?: string };
	report?: {
		saleDetails?: {
			saleValue?: number;
			amount?: number;
			paymentMode?: string;
		};
	};
}

interface VisitDetailsModalProps {
	isOpen: boolean;
	onClose: () => void;
	visit: VisitRecord | null;
}

export default function VisitDetailsModal({ isOpen, onClose, visit }: VisitDetailsModalProps) {
	if (!visit) return null;

	const dt = new Date(visit.scheduledDate || new Date().toISOString());
	const date = dt.toLocaleDateString();
	const time = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

	return (
		<Dialog.Root open={isOpen} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
				<Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-xl duration-200 lg:p-8">
					<div className="mb-6 flex items-center justify-between">
						<Dialog.Title className="text-xl font-black text-gray-900">
							Task / Visit Details
						</Dialog.Title>
						<Dialog.Close asChild>
							<button className="flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900">
								<Icon icon="lucide:x" className="size-4" />
							</button>
						</Dialog.Close>
					</div>

					<div className="flex flex-col gap-6">
						<div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
							<DynamicAvatar
								name={
									visit.agentId
										? `${visit.agentId.firstName} ${visit.agentId.lastName}`
										: "Unknown Agent"
								}
								image={visit.agentId?.avatar}
								className="size-12 rounded-full shadow-sm"
							/>
							<div>
								<h4 className="font-bold text-gray-900">
									{visit.agentId
										? `${visit.agentId.firstName} ${visit.agentId.lastName}`
										: "Unknown Agent"}
								</h4>
								<p className="text-sm font-medium text-gray-500">Sales Agent</p>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="rounded-xl border border-gray-100 p-4">
								<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
									Date & Time
								</p>
								<p className="mt-1 font-bold text-gray-900">{date}</p>
								<p className="text-sm font-medium text-gray-500">{time}</p>
							</div>
							<div className="rounded-xl border border-gray-100 p-4">
								<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
									Status
								</p>
								<p className="mt-1 font-bold capitalize text-gray-900">
									{visit.status}
								</p>
								<p className="text-sm font-medium text-gray-500">
									{visit.priority} Priority
								</p>
							</div>
						</div>

						<div className="rounded-xl border border-gray-100 p-4">
							<p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
								Location
							</p>
							<p className="mt-1 font-bold text-gray-900">
								{visit.territoryId?.name || "Unknown Zone"}
							</p>
							<p className="mt-1 text-sm font-medium text-gray-500">
								{visit.location?.address || "N/A"}
							</p>
						</div>

						{visit.report?.saleDetails && (
							<div className="rounded-xl border border-gray-100 bg-green-50 p-4">
								<p className="text-[11px] font-bold uppercase tracking-wider text-green-600">
									Sales Report
								</p>
								<p className="mt-1 font-black text-green-900">
									₦
									{(
										visit.report.saleDetails.saleValue ||
										visit.report.saleDetails.amount ||
										0
									).toLocaleString()}
								</p>
								<p className="mt-1 text-sm font-medium text-green-700">
									Payment: {visit.report.saleDetails.paymentMode}
								</p>
							</div>
						)}
					</div>

					<div className="mt-8 flex justify-end">
						<Button
							onClick={onClose}
							className="h-11 rounded-xl bg-gray-100 px-6 font-bold text-gray-900 hover:bg-gray-200"
						>
							Close
						</Button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
