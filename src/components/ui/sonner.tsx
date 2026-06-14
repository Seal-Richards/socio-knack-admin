"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast, type ToastEvent } from "@/lib/toast";
import cn from "@/lib/utils";

export const Toaster = (_props: any) => {
	const [activeToast, setActiveToast] = useState<ToastEvent | null>(null);

	useEffect(() => {
		// Subscribe to the toast event bus
		const unsubscribe = toast.subscribe((event) => {
			setActiveToast(event);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	if (!activeToast) return null;

	const handleClose = () => {
		setActiveToast(null);
	};

	const getTheme = () => {
		switch (activeToast.type) {
			case "success":
				return {
					bg: "bg-green-50",
					border: "border-green-100",
					icon: "lucide:check-circle",
					iconColor: "text-green-600",
					btnBg: "bg-green-600 hover:bg-green-700 shadow-green-600/10",
					btnLabel: "Continue",
				};
			case "error":
				return {
					bg: "bg-red-50",
					border: "border-red-100",
					icon: "lucide:alert-circle",
					iconColor: "text-red-600",
					btnBg: "bg-red-600 hover:bg-red-700 shadow-red-600/10",
					btnLabel: "Okay",
				};
			case "warning":
				return {
					bg: "bg-amber-50",
					border: "border-amber-100",
					icon: "lucide:alert-triangle",
					iconColor: "text-amber-600",
					btnBg: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/10",
					btnLabel: "Okay",
				};
			case "info":
			default:
				return {
					bg: "bg-blue-50",
					border: "border-blue-100",
					icon: "lucide:info",
					iconColor: "text-blue-600",
					btnBg: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/10",
					btnLabel: "Okay",
				};
		}
	};

	const theme = getTheme();

	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-all duration-300">
			{/* Backdrop click to close */}
			<div
				className="absolute inset-0 cursor-default"
				onClick={handleClose}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						handleClose();
					}
				}}
				role="button"
				tabIndex={-1}
				aria-label="Dismiss alert"
			/>

			{/* Modal Dialog Card */}
			<div
				className={cn(
					"relative w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-2xl border border-gray-100",
					"flex flex-col items-center justify-center text-center font-sans",
					"animate-in fade-in zoom-in-95 duration-200",
				)}
			>
				{/* Top-Right Close Button */}
				<button
					type="button"
					onClick={handleClose}
					title="Close"
					aria-label="Close"
					className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
				>
					<Icon icon="lucide:x" className="size-4" />
				</button>

				{/* Beautiful Status Icon Circle */}
				<div
					className={cn(
						"flex size-20 items-center justify-center rounded-full border-[5px] mb-6 mt-2 shadow-inner",
						theme.bg,
						theme.border,
					)}
				>
					<Icon icon={theme.icon} className={cn("size-9", theme.iconColor)} />
				</div>

				{/* Title */}
				<h3 className="mb-2 px-2 text-xl font-bold leading-snug text-gray-900">
					{activeToast.title}
				</h3>

				{/* Message */}
				{activeToast.message && (
					<p className="mb-6 max-h-40 overflow-y-auto px-4 text-xs font-semibold leading-relaxed text-gray-500">
						{activeToast.message}
					</p>
				)}

				{/* Continue/Close Action Button */}
				<button
					type="button"
					onClick={handleClose}
					className={cn(
						"w-full py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98]",
						theme.btnBg,
					)}
				>
					{theme.btnLabel}
				</button>
			</div>
		</div>
	);
};
