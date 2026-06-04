"use client";

import React from "react";
import Modal from "@/components/_modals";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface ConfirmDeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	description?: string;
	isLoading?: boolean;
}

export default function ConfirmDeleteModal({
	isOpen,
	onClose,
	onConfirm,
	title = "Delete Item",
	description = "Are you sure you want to delete this item? This action cannot be undone.",
	isLoading = false,
}: ConfirmDeleteModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} className="text-gray-800 sm:max-w-[420px]">
			<div className="flex flex-col items-center p-2 text-center">
				<div className="mx-auto mb-4 flex size-14 animate-bounce items-center justify-center rounded-full bg-red-50 text-red-500">
					<Icon icon="solar:trash-bin-trash-bold" className="size-7" />
				</div>
				<h3 className="mb-2 text-[18px] font-bold text-gray-900">{title}</h3>
				<p className="mb-6 px-4 text-sm leading-relaxed text-gray-500">{description}</p>
				<div className="flex w-full flex-col gap-3">
					<Button
						type="button"
						onClick={onConfirm}
						disabled={isLoading}
						className="h-12 w-full rounded-xl bg-red-500 font-bold text-white transition-all hover:bg-red-600 active:scale-95 disabled:opacity-50"
					>
						{isLoading ? "Deleting..." : "Yes, Delete"}
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={onClose}
						disabled={isLoading}
						className="h-12 w-full rounded-xl font-bold text-gray-500 hover:bg-gray-50 active:scale-95"
					>
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	);
}
