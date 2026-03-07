"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex min-h-screen w-full bg-darkBlue-900 text-white">
			{/* Left Form Section */}
			<div className="flex w-full flex-col p-8 md:w-1/2 md:p-16 lg:px-32 xl:p-40 xl:pt-32 justify-center">
				{/* Logo */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-12 flex items-center"
				>
					{/* Using a relative path for the image from public folder */}
					<Image
						src="/assets/images/socioknack_blue_text_logo.png"
						alt="SocioKnack Logo"
						width={180}
						height={40}
						className="object-contain brightness-[5] sepia-[1] hue-rotate-[180deg] saturate-[300%]" // Attempting to turn blue logo white/light via CSS filter, since we're on dark bg
					/>
				</motion.div>

				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="mb-8"
				>
					<h1 className="h3 mb-2 text-white">Log in</h1>
					<p className="text-gray-300">Enter your information below to log in</p>
				</motion.div>

				{/* Form */}
				<motion.form
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="space-y-6"
				>
					{/* Email */}
					<div className="space-y-2">
						<Label htmlFor="email" className="text-white flex items-center gap-2">
							<Icon icon="lucide:mail" className="h-4 w-4 text-yellow-500" />
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="Email"
							className="bg-white/10 border-none text-white placeholder:text-gray-400 focus-visible:ring-yellow-500 h-12"
						/>
					</div>

					{/* Password */}
					<div className="space-y-2">
						<Label htmlFor="password" className="text-white flex items-center gap-2">
							<Icon icon="lucide:lock" className="h-4 w-4 text-yellow-500" />
							Password
						</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								className="bg-white/10 border-none text-white placeholder:text-gray-400 focus-visible:ring-yellow-500 h-12 pr-10"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								<Icon
									icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
									className="h-5 w-5"
								/>
							</button>
						</div>
					</div>

					{/* Forgot Password Link */}
					<div className="flex justify-end">
						<Link
							href="/forgot-password"
							className="text-sm text-yellow-500 hover:text-yellow-400 font-medium tracking-wide transition-colors"
						>
							Forgot Password
						</Link>
					</div>

					{/* Login Button */}
					<Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 text-lg">
						Log in
					</Button>

					{/* Create Account Link */}
					<div className="pt-2">
						<Link
							href="/register"
							className="block w-full text-center py-3 bg-white/5 hover:bg-white/10 text-white rounded-md transition-colors border border-white/10"
						>
							Create an account
						</Link>
					</div>
				</motion.form>
			</div>

			{/* Right Image Section */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="hidden md:block md:w-1/2 relative h-screen"
			>
				{/* We add a blue overlay mix-blend to match UI if raw image is too bright */}
				<div className="absolute inset-0 bg-darkBlue-900/20 mix-blend-multiply z-10" />
				<Image
					src="/assets/images/login_bg.png"
					alt="Login Background"
					fill
					priority
					className="object-cover"
				/>
			</motion.div>
		</div>
	);
}
