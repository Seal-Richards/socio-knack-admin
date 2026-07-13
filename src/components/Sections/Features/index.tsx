"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { featureHighlights, featureAssets } from "@/constants/sections/features";

const Features = () => {
	return (
		<section className="flex flex-col overflow-hidden bg-white pt-24 md:pt-40">
			<div className="container mx-auto flex flex-col items-center px-4">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-10 inline-flex items-center rounded-full border border-blue-100 bg-blue-50/30 px-8 py-4 shadow-sm backdrop-blur-sm"
				>
					<span className="text-sm font-bold text-[#204B9B] md:text-lg">Features</span>
				</motion.div>

				{/* Title */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-20 text-center text-4xl font-black tracking-tight md:text-7xl"
				>
					<span className="text-[#DDA71A]">Advanced Features.</span>{" "}
					<span className="text-[#204B9B]">Trusted Operations.</span>
				</motion.h2>

				{/* Feature Highlights Row */}
				<div className="mb-24 flex flex-wrap justify-center gap-8 md:mb-32 md:gap-16">
					{featureHighlights.map((feature, index) => (
						<motion.div
							key={feature.id}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="group flex items-center gap-4"
						>
							<div className="relative size-6 shrink-0 transition-transform duration-300 group-hover:scale-125 md:size-8">
								<Image
									src={featureAssets.checkIcon}
									alt="Check"
									fill
									className="object-contain"
								/>
							</div>
							<span className="whitespace-nowrap text-sm font-bold text-slate-700 md:text-2xl">
								{feature.text}
							</span>
						</motion.div>
					))}
				</div>

				{/* Mockups Container - Anchored to bottom */}
				<div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center gap-12 px-4 lg:flex-row lg:items-end lg:gap-24 lg:px-0">
					{/* Mobile Mockup - Always Visible */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="animate-float relative z-20 w-full max-w-[280px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.2)] md:max-w-[340px]"
					>
						<Image
							src={featureAssets.mobile}
							alt="Mobile App"
							width={500}
							height={1000}
							className="h-auto w-full"
						/>
					</motion.div>

					{/* Desktop Mockup - Hidden on smaller screens (below lg) */}
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative z-10 hidden w-full max-w-[1000px] border-x border-t border-slate-100 bg-white shadow-[0_-25px_100px_-20px_rgba(32,75,155,0.25)] lg:block"
					>
						<Image
							src={featureAssets.desktop}
							alt="Desktop Dashboard"
							width={1400}
							height={900}
							className="h-auto w-full"
						/>

						{/* Subtle gradient glow behind */}
						<div className="absolute left-1/2 top-0 -z-10 size-full -translate-x-1/2 rounded-full bg-blue-600/5 blur-[150px]" />
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Features;
