"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/toast";
import { useVerifyEmailOtp, useResendOtp } from "@/hooks/useAuth";
import { setAuthToken } from "@/utils/auth";

export default function OTPVerification({
	onNext,
	onPrev,
}: {
	onNext: () => void;
	onPrev: () => void;
}) {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");

	const verifyEmailOtpMutation = useVerifyEmailOtp();
	const resendOtpMutation = useResendOtp();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("register_email") || "";
			setEmail(saved);
		}
	}, []);

	const handleVerify = async (e: React.FormEvent) => {
		e.preventDefault();
		if (otp.length !== 6 || !/^\d+$/.test(otp)) {
			toast.error("Please enter a valid 6-digit OTP code");
			return;
		}

		try {
			const res = await verifyEmailOtpMutation.mutateAsync({
				email,
				otp,
			});

			if (res.success && res.token) {
				setAuthToken(res.token);
				toast.success(res.message);
				onNext();
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "OTP verification failed");
		}
	};

	const handleResend = async () => {
		if (!email) {
			toast.error("No email address found to send OTP.");
			return;
		}
		try {
			const res = await resendOtpMutation.mutateAsync({ email });
			if (res.success) {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to resend OTP");
		}
	};

	// Mask the email beautifully for premium privacy (e.g. g***@company.com)
	const maskEmail = (str: string) => {
		if (!str?.includes("@")) return "your registered email";
		const parts = str.split("@");
		const name = parts[0] || "";
		const domain = parts[1] || "";
		if (name.length <= 2) return `***@${domain}`;
		return `${name.substring(0, 1)}***${name.substring(name.length - 1)}@${domain}`;
	};

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div className="mb-8 text-center">
				<h2 className="text-darkBlue-900 mb-2 text-2xl font-bold">Enter OTP Code</h2>
				<p className="px-8 text-sm text-gray-500">
					Enter the 6-digit code sent to{" "}
					<span className="text-darkBlue-900 font-bold">{maskEmail(email)}</span>
				</p>
			</div>

			<form className="w-full max-w-sm" onSubmit={handleVerify}>
				<div className="relative mb-6 w-full">
					<Input
						type="text"
						placeholder="X X X X X X"
						className="h-14 border-2 border-gray-200 bg-white text-center text-xl font-bold uppercase tracking-[0.5em] text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500"
						maxLength={6}
						value={otp}
						onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
					/>
				</div>

				<div className="mb-8 text-center">
					<p className="text-sm text-gray-500">
						Didn&apos;t receive a code?{" "}
						<button
							type="button"
							onClick={handleResend}
							disabled={resendOtpMutation.isPending}
							className="font-medium text-blue-500 hover:underline disabled:opacity-50"
						>
							{resendOtpMutation.isPending ? "Resending..." : "Resend OTP Code"}
						</button>
					</p>
				</div>

				<Button
					type="submit"
					disabled={verifyEmailOtpMutation.isPending}
					className="text-md mb-4 h-12 w-full bg-blue-500 font-sans font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
				>
					{verifyEmailOtpMutation.isPending ? "Verifying..." : "Verify"}
				</Button>

				<button
					type="button"
					onClick={onPrev}
					className="hover:text-darkBlue-900 w-full text-center text-sm font-semibold text-gray-500 transition-colors"
				>
					Back
				</button>
			</form>
		</div>
	);
}
