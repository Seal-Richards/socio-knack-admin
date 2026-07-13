"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import cn from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useGetMe } from "@/hooks/useProfile";

const menuItems = [
	{ label: "Home", href: "/" },
	{ label: "Features", href: "/#features" },
	{ label: "Pricing", href: "/#pricing" },
	{ label: "FAQ", href: "/#faq" },
	{ label: "About Us", href: "/about-us" },
];

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const { data: session, status } = useSession();
	const { data: ownProfileRes } = useGetMe();
	const profileData = ownProfileRes?.data;

	const avatarSrc = profileData?.avatar ?? session?.user?.image ?? null;
	const displayName = session?.user?.name ?? "User";
	const isAuthenticated = status === "authenticated";

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Prevent scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5 }}
				className={cn(
					"fixed inset-x-0 top-0 z-50 border-b border-transparent py-4 transition-all duration-300 ease-in-out md:py-5",
					isScrolled
						? "border-gray-100/50 bg-white/80 py-3 shadow-sm backdrop-blur-md md:py-4"
						: "bg-transparent",
				)}
			>
				<div className="container mx-auto max-w-7xl px-4 md:px-8">
					<nav className="flex items-center justify-between">
						{/* Logo */}
						<Link href="/" className="relative z-50 flex items-center">
							<Image
								src="/assets/images/socio-knack-logo-header.png"
								alt="SocioKnack Logo"
								width={170}
								height={45}
								priority
								className="h-7 w-auto md:h-8"
							/>
						</Link>

						{/* Desktop Menu Links */}
						<div className="hidden items-center gap-8 md:flex lg:gap-12">
							{menuItems.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"relative py-1 text-[15px] font-bold text-gray-600 transition-colors hover:text-[#1d4ea8]",
											isActive && "text-[#1d4ea8]",
										)}
									>
										{item.label}
										{isActive && (
											<motion.div
												layoutId="activeHeaderTab"
												className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-full bg-[#1d4ea8]"
												transition={{
													type: "spring",
													stiffness: 380,
													damping: 30,
												}}
											/>
										)}
									</Link>
								);
							})}
						</div>

						{/* Right Action Button (Desktop) & Menu Toggle (Mobile) */}
						<div className="flex items-center gap-4">
							{isAuthenticated ? (
								<Link href="/dashboard" className="hidden md:block">
									<div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#1d4ea8]/10 bg-gray-100 shadow-sm ring-2 ring-white transition-all hover:scale-105">
										{avatarSrc ? (
											<Image
												src={avatarSrc}
												alt={displayName}
												fill
												className="object-cover"
											/>
										) : (
											<Icon
												icon="solar:user-bold"
												className="size-6 text-gray-400"
											/>
										)}
									</div>
								</Link>
							) : (
								<div className="hidden items-center gap-3 md:flex">
									<Link href="/login">
										<Button
											variant="ghost"
											className="h-[46px] rounded-full px-6 text-[15px] font-bold text-gray-600 hover:bg-blue-50/30 hover:text-[#1d4ea8]"
										>
											Login
										</Button>
									</Link>
									<Link href="/register">
										<Button className="h-[46px] rounded-full bg-[#1d4ea8] px-6 text-[15px] font-bold text-white shadow-md shadow-blue-500/10 transition-all hover:scale-[1.02] hover:bg-[#153a82] hover:shadow-lg active:scale-[0.98]">
											Register
										</Button>
									</Link>
								</div>
							)}

							{/* Mobile Menu Button */}
							<button
								type="button"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="relative z-50 flex size-10 items-center justify-center rounded-full bg-blue-50 text-[#1d4ea8] transition-colors hover:bg-blue-100 md:hidden"
								aria-label="Toggle Mobile Menu"
							>
								<Icon
									icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"}
									className="size-5"
								/>
							</button>
						</div>
					</nav>
				</div>
			</motion.header>

			{/* Mobile Navigation Drawer */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-40 bg-white md:hidden"
					>
						{/* Background decorative blobs */}
						<div className="absolute left-[-20%] top-[-20%] size-3/5 rounded-full bg-blue-50/50 blur-3xl" />
						<div className="absolute bottom-[-10%] right-[-10%] size-3/5 rounded-full bg-[#DDA71A]/5 blur-3xl" />

						<div className="flex h-full flex-col justify-between px-6 pb-12 pt-28">
							<div className="flex flex-col gap-6">
								{menuItems.map((item, index) => {
									const isActive = pathname === item.href;
									return (
										<motion.div
											key={item.href}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.05 }}
										>
											<Link
												href={item.href}
												onClick={() => setIsMobileMenuOpen(false)}
												className={cn(
													"text-[28px] font-black tracking-tight text-gray-500 transition-colors hover:text-[#1d4ea8]",
													isActive && "text-[#1d4ea8]",
												)}
											>
												{item.label}
											</Link>
										</motion.div>
									);
								})}
							</div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.25 }}
								className="flex flex-col gap-4"
							>
								{isAuthenticated ? (
									<Link
										href="/dashboard"
										onClick={() => setIsMobileMenuOpen(false)}
										className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
									>
										<div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-gray-200">
											{avatarSrc ? (
												<Image
													src={avatarSrc}
													alt={displayName}
													fill
													className="object-cover"
												/>
											) : (
												<Icon
													icon="solar:user-bold"
													className="size-6 text-gray-400"
												/>
											)}
										</div>
										<div className="flex flex-col text-left">
											<span className="mb-1 text-sm font-bold leading-none text-gray-800">
												{displayName}
											</span>
											<span className="text-xs font-bold text-[#1d4ea8]">
												Go to Dashboard
											</span>
										</div>
									</Link>
								) : (
									<div className="flex flex-col gap-3">
										<Link
											href="/login"
											onClick={() => setIsMobileMenuOpen(false)}
											className="w-full"
										>
											<Button
												variant="outline"
												className="h-14 w-full rounded-2xl border-gray-200 text-base font-bold text-gray-600"
											>
												Login
											</Button>
										</Link>
										<Link
											href="/register"
											onClick={() => setIsMobileMenuOpen(false)}
											className="w-full"
										>
											<Button className="h-14 w-full rounded-2xl bg-[#1d4ea8] text-base font-bold text-white shadow-lg">
												Register
											</Button>
										</Link>
									</div>
								)}
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Header;
