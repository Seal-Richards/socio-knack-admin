"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { infoCards } from "@/constants/sections/info";

const InfoSection = () => {
	return (
		<section className="bg-white py-20 md:py-32">
			<div className="container mx-auto space-y-12 px-4 md:space-y-24">
				{infoCards.map((item) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className={`flex flex-col ${
							item.imageRight ? "md:flex-row" : "md:flex-row-reverse"
						} items-center gap-12 rounded-[40px] p-8 md:gap-20 md:p-16 ${item.bgColor} border border-slate-50 shadow-sm`}
					>
						{/* Text Content */}
						<div className="flex-1 space-y-8">
							<h2 className="text-3xl font-black leading-tight tracking-tight text-[#111111] md:text-5xl">
								{item.title}
							</h2>
							{item.description && (
								<p className="text-lg font-semibold text-slate-500 md:text-2xl">
									{item.description}
								</p>
							)}
							<ul className="space-y-4">
								{item.bullets.map((bullet) => (
									<li key={bullet} className="group flex items-start gap-4">
										<div className="relative mt-1 size-6 shrink-0 transition-transform duration-300 group-hover:scale-110 md:size-8">
											<Image
												src={item.icon}
												alt="Check"
												fill
												className="object-contain"
											/>
										</div>
										<span className="text-base font-semibold leading-snug text-slate-600 transition-colors duration-300 group-hover:text-black md:text-xl">
											{bullet}
										</span>
									</li>
								))}
							</ul>
							{item.footerText && (
								<p className="pt-4 text-lg font-bold text-[#111111] md:text-2xl">
									{item.footerText}
								</p>
							)}
						</div>

						{/* Image Content */}
						<div className="relative w-full flex-1">
							<div className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-2xl transition-transform duration-700 hover:scale-[1.02] md:aspect-[16/10]">
								<Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover"
									priority
								/>
								{/* Subtle overlay for depth */}
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
							</div>

							{/* Decorative background element */}
							<div className="absolute -inset-4 -z-10 rounded-full bg-blue-600/5 opacity-50 blur-2xl" />
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default InfoSection;
