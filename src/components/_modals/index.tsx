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
	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				className={cn(
					"sm:max-w-[500px] border-none p-0 overflow-hidden rounded-[2rem]",
					className,
				)}
			>
				{(title || description) && (
					<DialogHeader className="p-6 pb-0">
						{title && (
							<DialogTitle className="text-xl font-bold text-[#1d4ea8]">
								{title}
							</DialogTitle>
						)}
						{description && (
							<DialogDescription className="text-gray-500">
								{description}
							</DialogDescription>
						)}
					</DialogHeader>
				)}
				<div className="p-6">{children}</div>
			</DialogContent>
		</Dialog>
	);
}
