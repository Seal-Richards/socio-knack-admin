"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// Simple local Button wrapper to avoid import errors
function Button({
	children,
	className,
	onClick,
}: {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`flex items-center justify-center gap-1 rounded-xl px-4 py-2 transition-all active:scale-95 ${className}`}
		>
			{children}
		</button>
	);
}

function CallbackContent() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const status = searchParams?.get("status");
	const txRef = searchParams?.get("tx_ref");

	const isSuccess = status === "successful" || status === "completed";
	const isCancelled = status === "cancelled";

	const handleProceed = () => {
		// Clear session registration state since onboarding is complete
		if (typeof window !== "undefined") {
			sessionStorage.removeItem("onboarding_admin_step");
			sessionStorage.removeItem("onboarding_admin_data");
		}
		router.push("/login");
	};

	const handleRetry = () => {
		router.push("/register?step=6");
	};

	return (
		<div className="bg-darkBlue-900 flex min-h-screen w-full flex-col items-center justify-center p-4 md:bg-gray-100">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 text-center shadow-xl md:p-12"
			>
				{/* Logo */}
				<div className="mb-8 flex justify-center">
					<Image
						src="/assets/images/socioknack_blue_text_logo.png"
						alt="SocioKnack Logo"
						width={160}
						height={40}
						className="object-contain"
					/>
				</div>

				{isSuccess ? (
					/* Success View */
					<div className="space-y-6">
						<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-50 text-green-500">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 200, damping: 10 }}
							>
								<Icon icon="lucide:check-circle-2" className="size-12" />
							</motion.div>
						</div>

						<div className="space-y-2">
							<h2 className="text-2xl font-extrabold text-gray-900">
								Payment Successful!
							</h2>
							<p className="text-sm font-medium text-gray-500">
								Your SocioKnack organization account has been successfully
								activated.
							</p>
						</div>

						{txRef && (
							<div className="rounded-xl bg-gray-50 p-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
								Transaction Ref: <span className="text-gray-600">{txRef}</span>
							</div>
						)}

						<Button
							onClick={handleProceed}
							className="text-md h-12 w-full bg-green-600 font-sans font-semibold text-white hover:bg-green-700"
						>
							Proceed to Login
							<Icon icon="lucide:arrow-right" className="ml-1 size-5" />
						</Button>
					</div>
				) : (
					/* Failure / Cancelled View */
					<div className="space-y-6">
						<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-red-50 text-red-500">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 200, damping: 10 }}
							>
								<Icon icon="lucide:x-circle" className="size-12" />
							</motion.div>
						</div>

						<div className="space-y-2">
							<h2 className="text-2xl font-extrabold text-gray-900">
								{isCancelled ? "Payment Cancelled" : "Payment Failed"}
							</h2>
							<p className="text-center text-sm font-medium text-gray-500">
								{isCancelled
									? "You cancelled the activation transaction. No charges were made."
									: "Something went wrong while processing your payment. Please try again."}
							</p>
						</div>

						<Button
							onClick={handleRetry}
							className="text-md h-12 w-full bg-[#1d4ea8] font-sans font-semibold text-white hover:bg-[#153a82]"
						>
							Try Again
							<Icon icon="lucide:refresh-cw" className="ml-1 size-4" />
						</Button>
					</div>
				)}
			</motion.div>
		</div>
	);
}

export default function RegisterCallbackPage() {
	return (
		<Suspense
			fallback={
				<div className="bg-darkBlue-900 flex min-h-screen w-full items-center justify-center text-white">
					<div className="size-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
				</div>
			}
		>
			<CallbackContent />
		</Suspense>
	);
}
