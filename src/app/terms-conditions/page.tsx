"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icon } from "@iconify/react";
import cn from "@/lib/utils";
import { termsAndConditions } from "@/constants/terms";
import { toast } from "@/lib/toast";

const escapeRegExp = (string: string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export default function TermsConditionsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeSection, setActiveSection] = useState("");
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	// Scrollspy effect
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 140;

			// Find which section is currently in view
			let current = "";
			const sections = document.querySelectorAll("section[id]");

			sections.forEach((el) => {
				const htmlEl = el as HTMLElement;
				if (htmlEl.offsetTop <= scrollPosition) {
					current = htmlEl.id;
				}
			});

			if (current) {
				setActiveSection(current);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // initial call
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Helper to highlight matching text
	const highlightText = (text: string, query: string) => {
		if (!query) return <span>{text}</span>;
		const escapedQuery = escapeRegExp(query);
		const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));

		const mappedParts = parts.map((part, idx) => ({
			id: `highlight-${part}-${idx}`,
			part,
		}));

		return (
			<span>
				{mappedParts.map((item) =>
					item.part.toLowerCase() === query.toLowerCase() ? (
						<mark
							key={item.id}
							className="rounded bg-yellow-200/80 px-0.5 font-semibold text-yellow-950 dark:bg-yellow-500/30 dark:text-yellow-200"
						>
							{item.part}
						</mark>
					) : (
						<span key={item.id}>{item.part}</span>
					),
				)}
			</span>
		);
	};

	// Calculate matches per section
	const sectionMatchCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		if (!searchQuery) return counts;

		const q = searchQuery.toLowerCase();

		termsAndConditions.sections.forEach((section) => {
			let count = 0;

			if (section.title.toLowerCase().includes(q)) count += 1;
			section.paragraphs.forEach((p) => {
				const matches = p.toLowerCase().match(new RegExp(escapeRegExp(q), "g"));
				count += matches ? matches.length : 0;
			});
			section.bullets.forEach((b) => {
				const matches = b.toLowerCase().match(new RegExp(escapeRegExp(q), "g"));
				count += matches ? matches.length : 0;
			});

			counts[section.id] = count;
		});

		return counts;
	}, [searchQuery]);

	// Filter sections based on search query
	const filteredSections = useMemo(() => {
		if (!searchQuery) return termsAndConditions.sections;

		const q = searchQuery.toLowerCase();

		return termsAndConditions.sections.filter((section) => {
			if (section.title.toLowerCase().includes(q)) return true;
			if (section.id.toLowerCase().includes(q)) return true;
			if (section.paragraphs.some((p) => p.toLowerCase().includes(q))) return true;
			if (section.bullets.some((b) => b.toLowerCase().includes(q))) return true;
			return false;
		});
	}, [searchQuery]);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsMobileNavOpen(false);
		}
	};

	return (
		<main className="relative min-h-screen bg-slate-50/10">
			<Header />

			{/* Hero Heading Section */}
			<section className="bg-slate-900 pb-20 pt-36 text-white dark:bg-black">
				<div className="container mx-auto max-w-7xl px-4 text-center md:px-8">
					<h1 className="text-3xl font-black tracking-tight md:text-5xl">
						Terms & Conditions of Use
					</h1>
					<p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
						Please read these terms carefully. They govern your contractual use of the
						SocioKnack platform, services, and software solutions.
					</p>

					{/* Search input in Hero */}
					<div className="mx-auto mt-8 max-w-xl px-4">
						<div className="focus-within:ring-primary relative flex items-center rounded-full bg-white p-1.5 shadow-md shadow-blue-900/5 ring-1 ring-slate-100 transition-all dark:bg-zinc-900 dark:ring-zinc-800">
							<Icon
								icon="lucide:search"
								className="text-muted-foreground ml-3 size-5"
							/>
							<input
								type="text"
								placeholder="Search terms content (e.g. license, liability, payment)..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="placeholder:text-muted-foreground flex-1 bg-transparent px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none dark:text-white"
								aria-label="Search terms and conditions"
							/>
							{searchQuery && (
								<button
									onClick={() => setSearchQuery("")}
									className="text-muted-foreground mr-2 rounded-full p-1 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-zinc-800"
								>
									<Icon icon="lucide:x" className="size-4" />
								</button>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Main Document Content */}
			<div className="container mx-auto max-w-7xl px-4 pb-32 pt-12 md:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
					{/* Left Sticky Navigation Column (Desktop) */}
					<div className="hidden lg:block">
						<div className="scrollbar-thin scrollbar-thumb-slate-200 sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
							<h3 className="mb-4 text-xs font-black uppercase tracking-wider text-slate-400">
								Sections Map
							</h3>
							<nav className="flex flex-col gap-1 text-sm">
								<button
									onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
									className={cn(
										"flex items-center gap-2 rounded-lg px-3 py-2.5 text-left font-bold text-muted-foreground transition-all hover:bg-slate-50 hover:text-[#1d4ea8] dark:hover:bg-zinc-800",
										activeSection === "" &&
											"bg-blue-50/50 text-[#1d4ea8] dark:bg-blue-950/20",
									)}
								>
									<Icon icon="lucide:book-open" className="size-4" />
									Overview
								</button>
								<button
									onClick={() => scrollToSection("doc-control")}
									className={cn(
										"flex items-center gap-2 rounded-lg px-3 py-2.5 text-left font-bold text-muted-foreground transition-all hover:bg-slate-50 hover:text-[#1d4ea8] dark:hover:bg-zinc-800",
										activeSection === "doc-control" &&
											"bg-blue-50/50 text-[#1d4ea8] dark:bg-blue-950/20",
									)}
								>
									<Icon icon="lucide:file-text" className="size-4" />
									Version Control
								</button>

								<div className="my-2 border-t border-slate-100 dark:border-zinc-800" />

								{filteredSections.map((sec) => {
									const isSectionActive = activeSection === `section-${sec.id}`;
									const matches = sectionMatchCounts[sec.id] || 0;

									return (
										<button
											key={sec.id}
											onClick={() => scrollToSection(`section-${sec.id}`)}
											className={cn(
												"group flex items-start justify-between rounded-lg px-3 py-2 text-left text-xs font-bold text-muted-foreground transition-all hover:bg-slate-50 hover:text-[#1d4ea8] dark:hover:bg-zinc-800",
												isSectionActive &&
													"bg-blue-50 text-[#1d4ea8] dark:bg-blue-950/20",
											)}
										>
											<span className="truncate pr-2">
												{sec.id}. {sec.title}
											</span>
											{matches > 0 && (
												<span className="shrink-0 rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300">
													{matches}
												</span>
											)}
										</button>
									);
								})}
							</nav>
						</div>
					</div>

					{/* Right Content Column */}
					<div className="space-y-8 lg:col-span-3">
						{/* Version Control Panel */}
						<div
							id="doc-control"
							className="scroll-mt-28 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8 dark:border-zinc-800 dark:bg-zinc-900"
						>
							<div className="border-b border-slate-100 pb-6 dark:border-zinc-800">
								<h2 className="text-xl font-black text-slate-900 dark:text-white">
									Document Control & Version Info
								</h2>
								<p className="text-muted-foreground mt-1 text-sm font-medium">
									Legal framework and operational version parameters.
								</p>
							</div>

							<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Document Owner
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										Socioknack Technologies Ltd.
									</p>
								</div>
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Version & Edition
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										Version 1.0 Enterprise Edition
									</p>
								</div>
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Last Updated
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										July 13, 2026
									</p>
								</div>
							</div>
						</div>

						{/* Search results banner if searching */}
						{searchQuery && (
							<div className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
								<span>
									Found {filteredSections.length} sections matching &ldquo;
									{searchQuery}&rdquo;
								</span>
								<button
									onClick={() => setSearchQuery("")}
									className="text-xs text-[#1d4ea8] hover:underline"
								>
									Clear Search
								</button>
							</div>
						)}

						{/* Terms and Conditions Section List */}
						<div className="space-y-6">
							{filteredSections.map((section) => (
								<section
									key={section.id}
									id={`section-${section.id}`}
									className="scroll-mt-28 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8 dark:border-zinc-800 dark:bg-zinc-900"
								>
									{/* Section Heading */}
									<div className="group mb-6 flex items-center justify-between border-b border-slate-50 pb-4 dark:border-zinc-800">
										<h2 className="flex items-center gap-2 text-lg font-black text-slate-900 md:text-xl dark:text-white">
											<span className="text-primary/70">{section.id}.</span>
											{highlightText(section.title, searchQuery)}
										</h2>

										{/* Copy anchor link */}
										<button
											onClick={() => {
												navigator.clipboard
													.writeText(
														`${window.location.origin}${window.location.pathname}#section-${section.id}`,
													)
													.catch(() => undefined);
												toast.success("Section link copied to clipboard");
											}}
											className="hover:text-primary p-1 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600 dark:hover:text-zinc-400"
											title="Copy link to this section"
										>
											<Icon icon="lucide:link-2" className="size-4" />
										</button>
									</div>

									{/* Section Paragraphs */}
									{section.paragraphs.length > 0 && (
										<div className="space-y-4">
											{section.paragraphs.map((p) => (
												<p
													key={p}
													className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300"
												>
													{highlightText(p, searchQuery)}
												</p>
											))}
										</div>
									)}

									{/* Section Bullets */}
									{section.bullets.length > 0 && (
										<ul className="mt-4 space-y-2.5">
											{section.bullets.map((bullet) => (
												<li
													key={bullet}
													className="flex items-start gap-3 text-sm text-slate-600 dark:text-zinc-300"
												>
													<span className="text-primary mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300">
														<Icon
															icon="lucide:check"
															className="size-2.5"
														/>
													</span>
													<span>
														{highlightText(bullet, searchQuery)}
													</span>
												</li>
											))}
										</ul>
									)}
								</section>
							))}

							{filteredSections.length === 0 && (
								<div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
									<Icon
										icon="lucide:file-question"
										className="mx-auto size-12 text-slate-300 dark:text-zinc-700"
									/>
									<h3 className="mt-4 text-base font-bold text-slate-800 dark:text-zinc-200">
										No matches found
									</h3>
									<p className="mt-2 text-sm text-slate-500">
										Try searching for standard legal keywords or clear the
										active query.
									</p>
								</div>
							)}
						</div>

						{/* Acceptance Callout Banner */}
						<div className="rounded-2xl border-l-4 border-[#DDA71A] bg-yellow-50/20 p-6 shadow-sm md:p-8 dark:bg-yellow-950/10">
							<div className="flex items-start gap-4">
								<div className="rounded-full bg-yellow-100 p-2 text-[#DDA71A] dark:bg-yellow-900/30">
									<Icon icon="lucide:alert-circle" className="size-5" />
								</div>
								<div className="space-y-2">
									<h4 className="text-sm font-bold uppercase tracking-wider text-yellow-800 dark:text-yellow-400">
										Declaration & Consent Acceptance
									</h4>
									<p className="text-sm font-bold leading-relaxed text-slate-800 dark:text-zinc-200">
										{termsAndConditions.acceptance}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Floating Outline Trigger */}
			<div className="fixed bottom-6 right-6 z-40 lg:hidden">
				<button
					onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
					className="flex size-12 items-center justify-center rounded-full bg-[#1d4ea8] text-white shadow-lg shadow-blue-500/20 transition-transform active:scale-95"
				>
					<Icon icon={isMobileNavOpen ? "lucide:x" : "lucide:menu"} className="size-5" />
				</button>
			</div>

			{/* Mobile Navigation Outline Drawer */}
			{isMobileNavOpen && (
				<div className="fixed inset-0 z-30 lg:hidden">
					{/* Backdrop Button to close */}
					<button
						type="button"
						aria-label="Close outline drawer"
						className="absolute inset-0 size-full cursor-default border-none bg-slate-900/50 text-left outline-none backdrop-blur-sm"
						onClick={() => setIsMobileNavOpen(false)}
					/>
					{/* Drawer Container */}
					<div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl dark:bg-zinc-900">
						<h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
							Document Outline
						</h3>
						<nav className="flex flex-col gap-2">
							<button
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
									setIsMobileNavOpen(false);
								}}
								className="rounded-xl bg-slate-50 px-4 py-3 text-left text-sm font-bold text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
							>
								Top / Overview
							</button>
							<button
								onClick={() => scrollToSection("doc-control")}
								className="rounded-xl bg-slate-50 px-4 py-3 text-left text-sm font-bold text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
							>
								Version Control
							</button>
							{termsAndConditions.sections.map((sec) => (
								<button
									key={sec.id}
									onClick={() => scrollToSection(`section-${sec.id}`)}
									className="rounded-xl bg-slate-50 px-4 py-3 text-left text-sm font-bold text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
								>
									{sec.id}. {sec.title}
								</button>
							))}
						</nav>
					</div>
				</div>
			)}

			<Footer />
		</main>
	);
}
