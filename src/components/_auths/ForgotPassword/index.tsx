"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { authRequests } from "@/lib/requests/auth";

export default function ForgotPassword() {
	const [step, setStep] = useState<"email" | "otp" | "reset">("email");
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const handleRequestOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
			toast.error("Please enter a valid email address");
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await authRequests.forgotPassword({ email });
			if (res.success) {
				toast.success(res.message || "OTP sent to your email.");
				setStep("otp");
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to send OTP");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (otp.length !== 6 || !/^\d+$/.test(otp)) {
			toast.error("Please enter a valid 6-digit OTP code");
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await authRequests.verifyForgotPasswordOtp({ email, otp });
			if (res.success) {
				toast.success(res.message || "OTP verified successfully.");
				setStep("reset");
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "OTP verification failed");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!password || password.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await authRequests.resetForgotPassword({
				email,
				otp,
				newPassword: password,
			});
			if (res.success) {
				toast.success(res.message || "Password reset successfully! Please log in.");
				router.push("/login");
			} else {
				toast.error(res.message);
			}
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Failed to reset password");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-darkBlue-900 flex min-h-screen w-full text-white">
			{/* Left Form Section */}
			<div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-16 lg:px-32 xl:p-40 xl:pt-32">
				{/* Logo */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-12 flex items-center"
				>
					<Image
						src="/assets/images/socioknack_blue_text_logo.png"
						alt="SocioKnack Logo"
						width={180}
						height={40}
						className="object-contain brightness-[5] hue-rotate-180 saturate-[300%] sepia-[1]"
					/>
				</motion.div>

				<AnimatePresence mode="wait">
					{step === "email" && (
						<motion.div
							key="email-form"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.3 }}
						>
							<div className="mb-8">
								<h1 className="h3 mb-2 text-white">Forgot Password</h1>
								<p className="text-gray-300">
									Enter your email address to receive a password reset code.
								</p>
							</div>

							<form onSubmit={handleRequestOtp} className="space-y-6">
								<div className="space-y-2">
									<Label
										htmlFor="email"
										className="flex items-center gap-2 text-white"
									>
										<Icon
											icon="lucide:mail"
											className="size-4 text-yellow-500"
										/>
										Email Address
									</Label>
									<Input
										id="email"
										type="email"
										placeholder="name@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="h-12 border-none bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-yellow-500"
									/>
								</div>

								<div className="flex justify-end pt-2 text-sm">
									<Link
										href="/login"
										className="text-gray-400 transition-colors hover:text-white"
									>
										Back to Login
									</Link>
								</div>

								<Button
									type="submit"
									disabled={isSubmitting}
									className="h-12 w-full bg-blue-500 text-lg font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
								>
									{isSubmitting ? "Sending OTP..." : "Send Reset Code"}
								</Button>
							</form>
						</motion.div>
					)}

					{step === "otp" && (
						<motion.div
							key="otp-form"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
						>
							<div className="mb-8">
								<h1 className="h3 mb-2 text-white">Verification Code</h1>
								<p className="text-gray-300">
									Please enter the 6-digit verification code sent to{" "}
									<span className="font-bold text-yellow-500">{email}</span>.
								</p>
							</div>

							<form onSubmit={handleVerifyOtp} className="space-y-6">
								<div className="space-y-2">
									<Label
										htmlFor="otp"
										className="flex items-center gap-2 text-white"
									>
										<Icon
											icon="lucide:shield"
											className="size-4 text-yellow-500"
										/>
										Enter 6-Digit OTP Code
									</Label>
									<Input
										id="otp"
										type="text"
										placeholder="X X X X X X"
										maxLength={6}
										value={otp}
										onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
										className="h-14 border-none bg-white/10 text-center text-xl font-bold tracking-[0.5em] text-white placeholder:text-gray-500 focus-visible:ring-yellow-500"
									/>
								</div>

								<div className="flex items-center justify-between pt-2 text-sm">
									<button
										type="button"
										onClick={handleRequestOtp}
										disabled={isSubmitting}
										className="font-medium text-yellow-500 transition-colors hover:text-yellow-400 disabled:opacity-50"
									>
										Resend OTP Code
									</button>
									<button
										type="button"
										onClick={() => setStep("email")}
										className="text-gray-400 transition-colors hover:text-white"
									>
										Change Email
									</button>
								</div>

								<Button
									type="submit"
									disabled={isSubmitting}
									className="h-12 w-full bg-blue-500 text-lg font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
								>
									{isSubmitting ? "Verifying..." : "Verify Code"}
								</Button>
							</form>
						</motion.div>
					)}

					{step === "reset" && (
						<motion.div
							key="reset-form"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
						>
							<div className="mb-8">
								<h1 className="h3 mb-2 text-white">Reset Password</h1>
								<p className="text-gray-300">
									Create a new strong password for your account.
								</p>
							</div>

							<form onSubmit={handleResetPassword} className="space-y-6">
								<div className="space-y-2">
									<Label
										htmlFor="password"
										className="flex items-center gap-2 text-white"
									>
										<Icon
											icon="lucide:lock"
											className="size-4 text-yellow-500"
										/>
										New Password
									</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Enter new password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="h-12 border-none bg-white/10 pr-10 text-white placeholder:text-gray-400 focus-visible:ring-yellow-500"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											<Icon
												icon={
													showPassword ? "lucide:eye-off" : "lucide:eye"
												}
												className="size-5"
											/>
										</button>
									</div>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="confirm-password"
										className="flex items-center gap-2 text-white"
									>
										<Icon
											icon="lucide:lock"
											className="size-4 text-yellow-500"
										/>
										Confirm New Password
									</Label>
									<div className="relative">
										<Input
											id="confirm-password"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Confirm new password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="h-12 border-none bg-white/10 pr-10 text-white placeholder:text-gray-400 focus-visible:ring-yellow-500"
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
											aria-label={
												showConfirmPassword
													? "Hide confirm password"
													: "Show confirm password"
											}
										>
											<Icon
												icon={
													showConfirmPassword
														? "lucide:eye-off"
														: "lucide:eye"
												}
												className="size-5"
											/>
										</button>
									</div>
								</div>

								<Button
									type="submit"
									disabled={isSubmitting}
									className="h-12 w-full bg-blue-500 text-lg font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
								>
									{isSubmitting ? "Resetting..." : "Reset Password"}
								</Button>
							</form>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Right Image Section */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="relative hidden h-screen md:block md:w-1/2"
			>
				<div className="bg-darkBlue-900/20 absolute inset-0 z-10 mix-blend-multiply" />
				<Image
					src="/assets/images/login_bg.png"
					alt="Background"
					fill
					priority
					className="object-cover"
				/>
			</motion.div>
		</div>
	);
}
