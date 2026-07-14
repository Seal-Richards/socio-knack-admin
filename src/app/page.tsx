"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Sections/Hero";
import Brand from "@/components/Sections/Brand";
import InfoSection from "@/components/Sections/InfoSection";
import HowItWorks from "@/components/Sections/HowItWorks";
import Features from "@/components/Sections/Features";
import PricingSection from "@/components/Sections/Pricing";
import FAQSection from "@/components/Sections/FAQ";
import Footer from "@/components/Footer";
import {
	HeaderSkeleton,
	HeroSkeleton,
	BrandSkeleton,
	InfoSectionSkeleton,
	HowItWorksSkeleton,
	FeaturesSkeleton,
	FooterSkeleton,
} from "@/components/Skeletons";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate a loading delay so the skeletons are visible
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000); // 1.0 second delay for smooth entrance

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			const { hash } = window.location;
			if (hash) {
				const targetId = hash.replace("#", "");
				setTimeout(() => {
					const element = document.getElementById(targetId);
					if (element) {
						element.scrollIntoView({ behavior: "smooth" });
					}
				}, 100);
			}
		}
	}, [isLoading]);

	if (isLoading) {
		return (
			<main className="relative min-h-screen bg-slate-50/20">
				<HeaderSkeleton />
				<HeroSkeleton />
				<BrandSkeleton />
				<InfoSectionSkeleton />
				<HowItWorksSkeleton />
				<FeaturesSkeleton />
				<FooterSkeleton />
			</main>
		);
	}

	return (
		<main className="relative min-h-screen bg-slate-50/10">
			<Header />
			<Hero />
			<Brand />
			<InfoSection />
			<HowItWorks />
			<div id="features">
				<Features />
			</div>
			<div id="pricing">
				<PricingSection />
			</div>
			<div id="faq">
				<FAQSection />
			</div>
			<Footer />
		</main>
	);
}
