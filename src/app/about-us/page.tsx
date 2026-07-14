"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/Sections/FAQ";
import { leftLines, rightLines } from "@/constants/sections/hero";
import { aboutBanner, aboutContent } from "@/constants/about";

export default function AboutUsPage() {
	return (
		<main className="relative min-h-screen bg-[#f4f7fc]/30">
			<Header />

			{/* Banner Section with Hero background design */}
			<section className="hero-bg relative flex flex-col items-center overflow-hidden pb-0 pt-32 md:pt-40">
				{/* Vector Lines Background */}
				<div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
					{/* Left Curvey Lines */}
					{leftLines.map((src) => (
						<Image
							key={src}
							src={src}
							alt=""
							width={1200}
							height={1200}
							className="absolute bottom-[-15%] left-0 h-auto opacity-45 lg:w-[1100px] xl:w-[1300px]"
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
							className="absolute bottom-[-15%] right-0 h-auto opacity-45 lg:w-[1100px] xl:w-[1300px]"
							style={{ zIndex: 0 }}
						/>
					))}
				</div>

				{/* Floating Glow elements */}
				<div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-4/5 -translate-x-1/2 -translate-y-1/2 bg-blue-600/10 blur-[100px]" />

				{/* Content & Actions (centered layout, matches Hero structure on mobile/smaller screens) */}
				<div className="container relative z-10 mx-auto max-w-7xl px-4 pb-20 md:px-8 lg:pb-36">
					<div className="flex flex-col items-center text-center">
						<motion.div
							initial={{ opacity: 0, y: 25 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="flex flex-col items-center"
						>
							<h1 className="mb-4 text-[38px] font-black leading-none tracking-tighter text-[#111111] sm:text-[48px] md:text-[60px] lg:text-[72px]">
								{aboutBanner.title}
							</h1>
							<p className="mx-auto mb-8 max-w-lg text-sm font-semibold leading-relaxed text-slate-500 opacity-90 md:text-base">
								{aboutBanner.subtitle}
							</p>

							{/* App Download Buttons */}
							<div className="flex flex-row items-center gap-4">
								<a
									href={aboutBanner.appStoreUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-12 items-center gap-2 rounded-full bg-[#1d4ea8] px-6 text-sm font-bold text-white shadow-md shadow-blue-500/10 transition-all hover:scale-[1.03] hover:bg-[#153a82] hover:shadow-lg active:scale-[0.97]"
								>
									<Image
										src="/assets/svg/appstore.svg"
										alt="App Store Icon"
										width={20}
										height={20}
										className="brightness-[10]"
									/>
									App Store
								</a>
								<a
									href={aboutBanner.playStoreUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-12 items-center gap-2 rounded-full border border-blue-100 bg-white/95 px-6 text-sm font-bold text-[#1d4ea8] shadow-md shadow-blue-500/5 transition-all hover:scale-[1.03] hover:bg-white hover:shadow-lg active:scale-[0.97]"
								>
									<Image
										src="/assets/svg/playstore.svg"
										alt="Play Store Icon"
										width={20}
										height={20}
									/>
									Play Store
								</a>
							</div>
						</motion.div>

						{/* On mobile/smaller screens: Show centered mobile mockup just like Hero */}
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="relative z-10 mx-auto mt-12 max-w-[260px] drop-shadow-2xl lg:hidden"
						>
							<Image
								src="/assets/svg/socio-knack-app.svg"
								alt="SocioKnack App"
								width={320}
								height={640}
								className="h-auto w-full"
								priority
							/>
						</motion.div>
					</div>
				</div>

				{/* On desktop: Absolutely positioned mockups touching the bottom edge of the banner */}
				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-full lg:block">
					<div className="relative size-full">
						{/* Left Slant Desktop Mockup */}
						<motion.div
							initial={{ opacity: 0, x: -50, y: 50 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							transition={{ duration: 0.7 }}
							className="absolute bottom-0 left-0 w-[420px] xl:w-[500px]"
						>
							<Image
								src="/assets/svg/slant_desktop.svg"
								alt="Desktop Mockup Left"
								width={500}
								height={450}
								className="h-auto w-full object-bottom"
								priority
							/>
						</motion.div>

						{/* Right Slant Mobile Mockup */}
						<motion.div
							initial={{ opacity: 0, x: 50, y: 50 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							transition={{ duration: 0.7 }}
							className="absolute bottom-0 right-0 w-[260px] xl:w-[320px]"
						>
							<Image
								src="/assets/svg/slantmobile.svg"
								alt="Mobile Mockup Right"
								width={320}
								height={640}
								className="h-auto w-full object-bottom"
								priority
							/>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Main Content Card Container */}
			<section className="relative px-6 pb-12 pt-4 md:px-8">
				<div className="container mx-auto max-w-4xl">
					<motion.div
						initial={{ opacity: 0, y: 35 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.1 }}
						className="relative z-20 -mt-16 rounded-[2.5rem] border-[1.5px] border-[#111111] bg-white p-8 shadow-xl md:-mt-24 md:p-16 lg:p-20"
					>
						{/* Main Paragraphs */}
						<div className="space-y-6 text-[15px] font-medium leading-relaxed text-gray-700 md:text-[16px]">
							{aboutContent.mainParagraphs.map((para) => (
								<p key={para}>{para}</p>
							))}
						</div>

						{/* Header Sections */}
						<div className="mt-12 space-y-12">
							{aboutContent.sections.map((section) => (
								<div key={section.header} className="space-y-4">
									<h3 className="text-xl font-black tracking-tight text-[#1d4ea8] md:text-2xl">
										{section.header}
									</h3>

									{section.text && (
										<p className="text-[15px] font-medium leading-relaxed text-gray-500 md:text-[16px]">
											{section.text}
										</p>
									)}

									{section.paragraphs && section.paragraphs.length > 0 && (
										<div className="space-y-3">
											{section.paragraphs.map((p) => (
												<p
													key={p}
													className="text-[15px] font-medium leading-relaxed text-gray-500 md:text-[16px]"
												>
													{p}
												</p>
											))}
										</div>
									)}

									{section.bullets && section.bullets.length > 0 && (
										<ul className="space-y-3">
											{section.bullets.map((bullet) => (
												<li
													key={bullet}
													className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-gray-500 md:text-[16px]"
												>
													<span className="mt-2 flex size-1.5 shrink-0 rounded-full bg-[#DDA71A]" />
													<span>{bullet}</span>
												</li>
											))}
										</ul>
									)}

									{section.footerParagraphs &&
										section.footerParagraphs.length > 0 && (
											<div className="mt-4 space-y-3">
												{section.footerParagraphs.map((p) => (
													<p
														key={p}
														className="text-[15px] font-medium leading-relaxed text-gray-500 md:text-[16px]"
													>
														{p}
													</p>
												))}
											</div>
										)}
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* FAQ Section */}
			<FAQSection />

			<Footer />
		</main>
	);
}
