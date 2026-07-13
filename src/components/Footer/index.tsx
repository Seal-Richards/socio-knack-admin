"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerData } from "@/constants/sections/footer";
import { aboutBanner } from "@/constants/about";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const column1Links = [
		{ label: "Home", href: "/" },
		{ label: "Features", href: "/#features" },
		{ label: "Pricing", href: "/#pricing" },
		{ label: "About Us", href: "/about-us" },
	];

	const column2Links = [
		{ label: "FAQs", href: "/#faq" },
		{ label: "Contact Us", href: "/contact-us" },
		{ label: "Terms & Conditions", href: "/terms-conditions" },
		{ label: "Privacy Policy", href: "/privacy-policy" },
	];

	return (
		<footer className="relative overflow-hidden bg-[#051329] py-16 text-white md:py-24">
			{/* Subtle decorative background light */}
			<div className="pointer-events-none absolute bottom-0 right-0 size-[400px] rounded-full bg-blue-500/5 blur-[100px]" />

			<div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-8">
				{/* Top Panel Grid */}
				<div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left brand column */}
					<div className="flex max-w-md flex-col gap-6 lg:col-span-5">
						<Link href="/" className="inline-block">
							<Image
								src={footerData.logo}
								alt="SocioKnack Logo"
								width={180}
								height={45}
								className="h-8 w-auto"
							/>
						</Link>
						<p className="text-base font-medium leading-relaxed text-gray-400 md:text-lg">
							{footerData.description.prefix}{" "}
							<span className="font-bold text-[#DDA71A]">
								{footerData.description.highlight}
							</span>{" "}
							{footerData.description.suffix}
						</p>

						{/* App Download Buttons */}
						<div className="flex flex-row flex-wrap items-center gap-3">
							<a
								href={aboutBanner.appStoreUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-11 items-center gap-2 rounded-full bg-[#1d4ea8] px-5 text-sm font-bold text-white shadow-md shadow-blue-500/10 transition-all hover:scale-[1.03] hover:bg-[#153a82] hover:shadow-lg active:scale-[0.97]"
							>
								<Image
									src="/assets/svg/appstore.svg"
									alt="App Store Icon"
									width={18}
									height={18}
									className="brightness-[10]"
								/>
								App Store
							</a>
							<a
								href={aboutBanner.playStoreUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-11 items-center gap-2 rounded-full bg-yellow-400 px-5 text-sm font-bold text-white shadow-md shadow-yellow-500/10 transition-all hover:scale-[1.03] hover:bg-yellow-400 hover:shadow-lg active:scale-[0.97]"
							>
								<Image
									src="/assets/svg/playstore.svg"
									alt="Play Store Icon"
									width={18}
									height={18}
								/>
								Play Store
							</a>
						</div>
					</div>

					{/* Spacer */}
					<div className="hidden lg:col-span-1 lg:block" />

					{/* Right navigation links columns */}
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:col-span-6">
						{/* Column 1 */}
						<ul className="flex flex-col gap-5">
							{column1Links.map((link) => (
								<li key={link.href} className="group flex items-center gap-3">
									<span className="size-2 shrink-0 rounded-full bg-[#DDA71A]" />
									<Link
										href={link.href}
										className="text-[15px] font-bold text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white md:text-[16px]"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>

						{/* Column 2 */}
						<ul className="flex flex-col gap-5">
							{column2Links.map((link) => (
								<li key={link.href} className="group flex items-center gap-3">
									<span className="size-2 shrink-0 rounded-full bg-[#DDA71A]" />
									<Link
										href={link.href}
										className="text-[15px] font-bold text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white md:text-[16px]"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Divider line */}
				<div className="my-10 h-px w-full bg-slate-800 md:my-14" />

				{/* Copyright */}
				<div className="flex flex-col items-center justify-center text-center sm:flex-row">
					<p className="text-xs font-bold uppercase tracking-wider text-gray-500 md:text-sm">
						All right reserved, socioknack © {currentYear}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
