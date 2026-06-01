"use client";

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import cn from "@/lib/utils";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}

export default function Modal({
	isOpen,
	onClose,
	title,
	description,
	children,
	className,
}: ModalProps) {
	const hasCustomMaxWidth = className?.includes("max-w-") || className?.includes("sm:max-w-");
	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				className={cn(
					"w-full border-none p-0 overflow-hidden rounded-[2rem] max-h-[90vh] flex flex-col bg-white",
					!hasCustomMaxWidth && "sm:max-w-[500px]",
					className,
				)}
			>
				{(title || description) && (
					<DialogHeader className="shrink-0 p-6 pb-3">
						{title && (
							<DialogTitle className="text-xl font-bold text-[#1d4ea8]">
								{title}
							</DialogTitle>
						)}
						{description && (
							<DialogDescription className="text-sm text-gray-500">
								{description}
							</DialogDescription>
						)}
					</DialogHeader>
				)}
				<div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">{children}</div>
			</DialogContent>
		</Dialog>
	);
}
