"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Icon } from "@iconify/react";
import { toast, type ToastEvent } from "@/lib/toast";
import cn from "@/lib/utils";

export const Toaster = (_props: any) => {
	const [activeToast, setActiveToast] = useState<ToastEvent | null>(null);
	// Track what was focused before the toast appeared so we can restore it
	const previousFocusRef = useRef<Element | null>(null);
	const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const unsubscribe = toast.subscribe((event) => {
			setActiveToast(event);
		});
		return () => unsubscribe();
	}, []);

	// When toast appears, record the previously focused element
	useEffect(() => {
		if (activeToast) {
			previousFocusRef.current = document.activeElement;

			// Auto-dismiss: errors after 6s, success after 4s, info/warning after 4s
			const duration = activeToast.type === "error" ? 6000 : 4000;
			autoTimerRef.current = setTimeout(() => {
				setActiveToast(null);
			}, duration);
		}
		return () => {
			if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
		};
	}, [activeToast]);

	const handleClose = useCallback(() => {
		if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
		setActiveToast(null);

		// After unmount, restore focus to the previously focused element (e.g. inside
		// the Invite Modal) so Radix Dialog's focus-trap doesn't freeze.
		setTimeout(() => {
			const prev = previousFocusRef.current;
			if (prev && typeof (prev as HTMLElement).focus === "function") {
				(prev as HTMLElement).focus({ preventScroll: true });
			} else {
				// Fallback: focus the nearest open Radix Dialog's first focusable element
				const dialogContent = document.querySelector<HTMLElement>('[role="dialog"]');
				if (dialogContent) {
					const firstFocusable = dialogContent.querySelector<HTMLElement>(
						'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
					);
					firstFocusable?.focus({ preventScroll: true });
				}
			}
		}, 0);
	}, []);

	if (!activeToast) return null;

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
		// Neutral outer container — no role, no handlers, just a stacking context
		<div className="fixed inset-0 z-[9999]">
			{/*
			 * Backdrop: a real <button> filling the screen.
			 * Clicks on the dark area hit this button directly → closes the toast.
			 * Clicks on the card never reach here — the card is a DOM sibling,
			 * not an ancestor, so events don't bubble across to this element.
			 * onMouseDown stopPropagation prevents Radix Dialog's onInteractOutside
			 * from firing when the user interacts with the toast.
			 */}
			<button
				type="button"
				className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
				onClick={handleClose}
				onMouseDown={(e) => e.stopPropagation()}
				aria-label="Dismiss notification"
				tabIndex={-1}
			/>

			{/*
			 * Centering wrapper — pointer-events-none so it doesn't intercept clicks.
			 * Only the card inside (pointer-events-auto) captures its own events.
			 */}
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
				{/* Modal Dialog Card — no event handlers needed; sibling structure handles isolation */}
				<div
					role="alertdialog"
					aria-modal="true"
					aria-labelledby="toast-title"
					aria-describedby="toast-message"
					className={cn(
						"pointer-events-auto relative w-full max-w-[calc(100vw-2rem)] sm:max-w-sm rounded-[2rem] bg-white p-6 sm:p-8 shadow-2xl border border-gray-100",
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
						className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 sm:right-6 sm:top-6"
					>
						<Icon icon="lucide:x" className="size-4" />
					</button>

					{/* Beautiful Status Icon Circle */}
					<div
						className={cn(
							"flex size-16 sm:size-20 items-center justify-center rounded-full border-[5px] mb-4 sm:mb-6 mt-2 shadow-inner",
							theme.bg,
							theme.border,
						)}
					>
						<Icon
							icon={theme.icon}
							className={cn("size-7 sm:size-9", theme.iconColor)}
						/>
					</div>

					{/* Title */}
					<h3
						id="toast-title"
						className="mb-2 px-2 text-lg font-bold leading-snug text-gray-900 sm:text-xl"
					>
						{activeToast.title}
					</h3>

					{/* Message */}
					{activeToast.message && (
						<p
							id="toast-message"
							className="mb-4 max-h-40 overflow-y-auto px-4 text-xs font-semibold leading-relaxed text-gray-500 sm:mb-6"
						>
							{activeToast.message}
						</p>
					)}

					{/* Continue/Close Action Button */}
					<button
						type="button"
						onClick={handleClose}
						className={cn(
							"w-full py-3 sm:py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98]",
							theme.btnBg,
						)}
					>
						{theme.btnLabel}
					</button>
				</div>
			</div>
		</div>
	);
};
