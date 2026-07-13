"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import cn from "@/lib/utils";
import { heroContent, floatingAssets, leftLines, rightLines } from "@/constants/sections/hero";

const Hero = () => {
	const { status } = useSession();
	const isAuthenticated = status === "authenticated";

	return (
		<section className="hero-bg relative flex min-h-[850px] flex-col overflow-hidden pb-0 pt-28 md:min-h-screen md:pt-36">
			{/* Vector Lines Background - Using 5 distinct SVG files per side */}
			<div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
				{/* Left Curvey Lines */}
				{leftLines.map((src) => (
					<Image
						key={src}
						src={src}
						alt=""
						width={1200}
						height={1200}
						className="absolute bottom-[-15%] left-0 h-auto opacity-40 lg:w-[1200px] xl:w-[1400px]"
						style={{ zIndex: 0 }}
					/>
				))}

				{/* Right Curvey Lines */}
				{rightLines.map((src) => (
					<Image
						key={src}
						src={src}
						alt=""
						width={1200}
						height={1200}
						className="absolute bottom-[-15%] right-0 h-auto opacity-40 lg:w-[1200px] xl:w-[1400px]"
						style={{ zIndex: 0 }}
					/>
				))}
			</div>

			{/* Floating SVG Assets */}
			{floatingAssets.map((asset, index) => (
				<motion.div
					key={asset.src}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{
						opacity: 1,
						scale: 1,
						y: [0, -10, 0],
					}}
					transition={{
						opacity: { duration: 0.5, delay: asset.delay },
						scale: { duration: 0.5, delay: asset.delay },
						y: {
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut",
							delay: asset.delay,
						},
					}}
					className={cn("absolute z-20", asset.className)}
				>
					<div className="group relative">
						<Image
							src={asset.src}
							alt={`Marker ${index + 1}`}
							width={150}
							height={180}
							className="h-auto w-10 drop-shadow-xl transition-transform duration-300 group-hover:scale-110 sm:w-14 md:w-24 lg:w-28 xl:w-32"
						/>
					</div>
				</motion.div>
			))}

			<div className="container relative z-10 mx-auto flex max-w-7xl grow flex-col justify-between px-4 text-center">
				{/* Hero Content */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="flex flex-col items-center pt-6 md:pt-16"
				>
					<h1 className="mb-4 max-w-[95%] text-[26px] font-black leading-[1.1] tracking-tighter text-slate-900 sm:text-[38px] md:mb-6 md:max-w-5xl md:text-[54px] lg:text-[76px]">
						{heroContent.title}
					</h1>

					<p className="mx-auto mb-8 max-w-3xl px-6 text-sm font-medium leading-relaxed text-slate-600 opacity-90 md:mb-12 md:text-lg lg:text-xl xl:text-2xl">
						{heroContent.subtitle}
					</p>

					{/* Action Buttons in Hero */}
					<div className="mb-10 flex flex-col items-center gap-4 sm:flex-row">
						<Link href={isAuthenticated ? "/dashboard" : "/register"}>
							<button
								type="button"
								className="h-14 rounded-2xl bg-[#1d4ea8] px-8 text-[16px] font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:bg-[#153a82] active:scale-95"
							>
								{isAuthenticated ? "My Dashboard" : "Get Started"}
							</button>
						</Link>
						<Link href="#features">
							<button
								type="button"
								className="h-14 rounded-2xl border border-blue-100 bg-blue-50/50 px-8 text-[16px] font-bold text-[#1d4ea8] transition-all hover:scale-105 hover:bg-blue-50 active:scale-95"
							>
								How it Works
							</button>
						</Link>
					</div>

					{/* Highlights List */}
					<div className="flex flex-col items-center gap-3">
						{heroContent.highlights.map((text, i) => (
							<motion.div
								key={text}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.8 + i * 0.1 }}
								className="flex items-center gap-2 rounded-full border border-blue-100/50 bg-blue-50/50 px-4 py-2 text-xs font-bold text-slate-700 md:px-6 md:text-lg"
							>
								<div className="size-1.5 rounded-full bg-[#DDA71A] md:size-2" />
								{text}
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Mockup Container - Anchored to bottom */}
				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="relative mx-auto mt-8 w-full md:mt-12"
				>
					{/* Desktop Dashboard - Hidden on mobile */}
					<div className="relative z-10 mx-auto hidden max-w-[1300px] overflow-hidden border border-slate-200/40 bg-white p-1 shadow-[0_-15px_60px_-15px_rgba(32,75,155,0.25)] md:block md:p-2 lg:p-3">
						<Image
							src="/assets/svg/DashboardUi-01.svg"
							alt="SocioKnack Dashboard"
							width={1400}
							height={1000}
							className="h-auto w-full"
							priority
						/>
					</div>

					{/* Mobile App View - Visible only on smaller screens */}
					<div className="relative z-10 mx-auto max-w-[300px] drop-shadow-2xl md:hidden">
						<Image
							src="/assets/svg/socio-knack-app.svg"
							alt="SocioKnack App"
							width={400}
							height={800}
							className="h-auto w-full"
							priority
						/>
					</div>

					{/* Decorative glow behind mockup */}
					<div className="absolute left-1/2 top-0 -z-10 h-full w-[90%] -translate-x-1/2 bg-blue-600/15 blur-[60px] md:blur-[180px]" />
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
