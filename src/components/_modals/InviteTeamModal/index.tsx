"use client";

import React from "react";
import Modal from "@/components/_modals";
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteTeamSchema, type InviteTeamFormData } from "@/schemas/invite";
import { useInviteSupervisor, useInviteStaff } from "@/hooks/useInvite";
import { toast } from "@/lib/toast";

interface InviteTeamModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function InviteTeamModal({ isOpen, onClose }: InviteTeamModalProps) {
	const inviteSupervisorMutation = useInviteSupervisor();
	const inviteStaffMutation = useInviteStaff();

	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
	} = useForm<InviteTeamFormData>({
		resolver: zodResolver(inviteTeamSchema),
		defaultValues: {
			email: "",
			role: "supervisor",
			position: "",
		},
	});

	const selectedRole = watch("role");

	const onSubmit = async (data: InviteTeamFormData) => {
		try {
			if (data.role === "supervisor") {
				const res = await inviteSupervisorMutation.mutateAsync({
					email: data.email,
				});
				if (res.success) {
					toast.success(res.message);
					reset();
					onClose();
				} else {
					toast.error(res.message);
				}
			} else {
				const res = await inviteStaffMutation.mutateAsync({
					email: data.email,
					position: data.position || "",
				});
				if (res.success) {
					toast.success(res.message);
					reset();
					onClose();
				} else {
					toast.error(res.message);
				}
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to send invitation");
		}
	};

	const isPending = inviteSupervisorMutation.isPending || inviteStaffMutation.isPending;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Invite Team Member"
			className="max-w-md text-gray-800"
		>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					{/* Email Address */}
					<div className="space-y-2">
						<Label htmlFor="email" className="text-[14px] font-bold text-gray-700">
							Email Address
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter email address"
							{...register("email")}
							className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						{errors.email && (
							<p className="text-xs font-medium text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Assign Role */}
					<div className="space-y-2">
						<Label htmlFor="role" className="text-[14px] font-bold text-gray-700">
							Assign Role
						</Label>
						<Controller
							name="role"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger
										id="role"
										className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-gray-800 focus:border-[#1d4ea8] focus:ring-0"
									>
										<SelectValue placeholder="Select role" />
									</SelectTrigger>
									<SelectContent className="rounded-xl border-gray-100 shadow-xl">
										<SelectItem value="supervisor">Supervisor</SelectItem>
										<SelectItem value="staff">Staff</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.role && (
							<p className="text-xs font-medium text-red-500">
								{errors.role.message}
							</p>
						)}
					</div>

					{/* Unique Position for Staff */}
					{selectedRole === "staff" && (
						<div className="animate-in fade-in slide-in-from-top-2 space-y-2 duration-300">
							<Label
								htmlFor="position"
								className="text-[14px] font-bold text-gray-700"
							>
								Staff Position / Designation
							</Label>
							<Input
								id="position"
								type="text"
								placeholder="e.g. Finance Officer, Region Manager"
								{...register("position")}
								className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-gray-900 focus:border-[#1d4ea8] focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
							{errors.position && (
								<p className="text-xs font-medium text-red-500">
									{errors.position.message}
								</p>
							)}
						</div>
					)}
				</div>

				<div className="flex flex-col gap-3 pt-4">
					<Button
						type="submit"
						disabled={isPending}
						className="h-12 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95 disabled:opacity-50"
					>
						{isPending ? "Sending..." : "Send Invitation"}
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={() => {
							reset();
							onClose();
						}}
						className="h-12 w-full rounded-xl text-[15px] font-bold text-gray-500 hover:bg-gray-50"
					>
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	);
}
