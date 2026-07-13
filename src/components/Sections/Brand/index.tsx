"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { brands } from "@/constants/sections/brand";

const BrandSection = () => {
	// Create exactly 4 sets for a seamless loop and generate unique keys beforehand
	const marqueeBrands = [0, 1, 2, 3].flatMap((setIndex) =>
		brands.map((brand) => ({
			...brand,
			uniqueKey: `${brand.id}-${setIndex}`,
		})),
	);

	return (
		<section className="relative overflow-hidden border-y border-slate-50 bg-white py-12 md:py-20">
			<div className="container mx-auto flex flex-col items-center px-4">
				{/* Badge Title */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-14 inline-flex items-center rounded-full border border-blue-100 bg-blue-50/50 px-6 py-3 shadow-[0_4px_20px_-4px_rgba(32,75,155,0.1)] backdrop-blur-sm md:px-10 md:py-4"
				>
					<span className="text-center text-base font-bold tracking-tight text-[#204B9B] md:text-xl">
						Trusted by modern teams across the nation
					</span>
				</motion.div>

				{/* Animated Marquee Container */}
				<div className="group relative flex w-full items-center overflow-hidden">
					{/* Left Shadow Mask */}
					<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/80 to-transparent md:w-64" />

					{/* Marquee Content - Pure CSS for maximum smoothness and ease of control */}
					<div className="animate-scroll-linear group-hover:pause flex items-center gap-16 py-6 md:gap-32">
						{marqueeBrands.map((brand) => (
							<div
								key={brand.uniqueKey}
								className="flex shrink-0 items-center justify-center opacity-70 grayscale transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0"
							>
								<Image
									src={brand.src}
									alt={brand.name}
									width={280}
									height={80}
									className="h-10 w-auto object-contain md:h-16"
								/>
							</div>
						))}
					</div>

					{/* Right Shadow Mask */}
					<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/80 to-transparent md:w-64" />
				</div>
			</div>
		</section>
	);
};

export default BrandSection;
