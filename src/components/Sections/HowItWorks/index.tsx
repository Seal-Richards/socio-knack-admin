"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { steps } from "@/constants/sections/howItWorks";

const HowItWorks = () => {
	return (
		<section className="bg-[#F9FAFB]/50 py-20 md:py-32">
			<div className="container mx-auto flex flex-col items-center px-4">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-8 inline-flex items-center rounded-full border border-blue-100 bg-white px-6 py-3 shadow-sm"
				>
					<span className="text-sm font-bold text-[#204B9B] md:text-lg">
						How it Works
					</span>
				</motion.div>

				{/* Title */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-20 text-center text-4xl font-black tracking-tight text-[#111111] md:text-6xl"
				>
					4 Steps to Scalable Growth
				</motion.h2>

				{/* Steps Grid */}
				<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((step, index) => (
						<motion.div
							key={step.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1, duration: 0.5 }}
							className="group relative flex flex-col items-start rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
						>
							<div className="flex w-full items-center gap-6">
								{/* Yellow Circle with Icon */}
								<div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#DDA71A] transition-transform duration-500 group-hover:rotate-[360deg] md:size-20">
									<Icon
										icon={step.icon}
										className="size-8 text-white md:size-10"
									/>
								</div>

								{/* Text content */}
								<div className="flex flex-col">
									<span className="mb-1 text-sm font-bold text-slate-900 md:text-lg">
										{step.title}
									</span>
									<p className="text-sm font-medium leading-snug text-slate-500 md:text-base">
										{step.description}
									</p>
								</div>
							</div>

							{/* Background decorative number */}
							<span className="absolute bottom-4 right-8 select-none text-8xl font-black text-slate-50 opacity-[0.03] transition-opacity group-hover:opacity-[0.07]">
								0{step.id}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
