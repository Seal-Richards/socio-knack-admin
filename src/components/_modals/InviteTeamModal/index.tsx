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
import { toast } from "sonner";

interface InviteTeamModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function InviteTeamModal({ isOpen, onClose }: InviteTeamModalProps) {
	const handleInvite = (e: React.FormEvent) => {
		e.preventDefault();
		toast.success("Invitation sent successfully!");
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Invite Team Member" className="max-w-md">
			<form onSubmit={handleInvite} className="flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-[14px] font-bold text-gray-700">
							Email Address
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter email address"
							required
							className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 focus:border-[#1d4ea8] focus:ring-0"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="role" className="text-[14px] font-bold text-gray-700">
							Assign Role
						</Label>
						<Select required>
							<SelectTrigger className="h-12 rounded-xl border-gray-100 bg-gray-50/50 px-4 focus:border-[#1d4ea8] focus:ring-0">
								<SelectValue placeholder="Select role" />
							</SelectTrigger>
							<SelectContent className="rounded-xl border-gray-100 shadow-xl">
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="editor">Editor</SelectItem>
								<SelectItem value="viewer">Viewer</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="flex flex-col gap-3 pt-4">
					<Button
						type="submit"
						className="h-12 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-95"
					>
						Send Invitation
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={onClose}
						className="h-12 w-full rounded-xl text-[15px] font-bold text-gray-500 hover:bg-gray-50"
					>
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	);
}
