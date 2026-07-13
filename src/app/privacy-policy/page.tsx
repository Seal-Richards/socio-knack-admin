"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import cn from "@/lib/utils";
import { privacyPolicy } from "@/constants/privacy";

const escapeRegExp = (string: string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export default function PrivacyPolicyPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeSection, setActiveSection] = useState("");
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	// Scrollspy effect
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 160;

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

		privacyPolicy.sections.forEach((section) => {
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

			section.subsections.forEach((sub) => {
				if (sub.title.toLowerCase().includes(q)) count += 1;
				sub.paragraphs.forEach((p) => {
					const matches = p.toLowerCase().match(new RegExp(escapeRegExp(q), "g"));
					count += matches ? matches.length : 0;
				});
				sub.bullets.forEach((b) => {
					const matches = b.toLowerCase().match(new RegExp(escapeRegExp(q), "g"));
					count += matches ? matches.length : 0;
				});
				if (sub.table) {
					sub.table.rows.forEach((row) => {
						row.forEach((cell) => {
							const matches = cell
								.toLowerCase()
								.match(new RegExp(escapeRegExp(q), "g"));
							count += matches ? matches.length : 0;
						});
					});
				}
			});

			counts[section.id] = count;
		});

		return counts;
	}, [searchQuery]);

	// Filter sections based on search query
	const filteredSections = useMemo(() => {
		if (!searchQuery) return privacyPolicy.sections;

		const q = searchQuery.toLowerCase();
		return privacyPolicy.sections.filter((section) => {
			if (section.title.toLowerCase().includes(q)) return true;
			if (section.id.toLowerCase().includes(q)) return true;
			if (section.paragraphs.some((p) => p.toLowerCase().includes(q))) return true;
			if (section.bullets.some((b) => b.toLowerCase().includes(q))) return true;

			return section.subsections.some((sub) => {
				if (sub.title.toLowerCase().includes(q)) return true;
				if (sub.paragraphs.some((p) => p.toLowerCase().includes(q))) return true;
				if (sub.bullets.some((b) => b.toLowerCase().includes(q))) return true;
				if (sub.table) {
					return sub.table.rows.some((row) =>
						row.some((cell) => cell.toLowerCase().includes(q)),
					);
				}
				return false;
			});
		});
	}, [searchQuery]);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const yOffset = -100;
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
			setIsMobileNavOpen(false);
		}
	};

	return (
		<main className="selection:bg-primary/20 relative min-h-screen bg-[#F6F9FF] dark:bg-black">
			<Header />

			{/* Hero / Header Section */}
			<section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-[#F6F9FF] pb-16 pt-32 dark:from-slate-950/20 dark:via-black dark:to-black">
				<div className="bg-grid-slate-900/[0.04] dark:bg-grid-white/[0.02] absolute inset-0 bg-[size:20px_20px]" />
				<div className="container relative mx-auto max-w-7xl px-4 text-center md:px-8">
					<span className="text-primary inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold dark:bg-blue-950/30 dark:text-blue-300">
						<Icon icon="lucide:shield-check" className="size-3.5" />
						Legal Document
					</span>
					<h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
						Privacy Policy
					</h1>
					<p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base">
						This document explains how SocioKnack collects, processes, stores, and
						protects your personal and business data. We are committed to transparency
						and the security of your information.
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
								placeholder="Search policy content (e.g. cookies, GPS, retention)..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="placeholder:text-muted-foreground flex-1 bg-transparent px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none dark:text-white"
								aria-label="Search privacy policy"
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

			{/* Main Document Portal Content */}
			<div className="container mx-auto max-w-7xl px-4 pb-32 md:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
					{/* Left Sticky Navigation Column (Desktop) */}
					<div className="hidden lg:block">
						<div className="scrollbar-thin scrollbar-thumb-slate-200 sticky top-28 max-h-[calc(100vh-140px)] space-y-4 overflow-y-auto pr-2">
							<div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
								<h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
									Document Outline
								</h3>
								<nav className="flex flex-col gap-1 text-sm">
									<button
										onClick={() =>
											window.scrollTo({ top: 0, behavior: "smooth" })
										}
										className={cn(
											"flex items-center gap-2 rounded-lg px-3 py-2.5 text-left font-bold text-muted-foreground transition-all hover:bg-slate-50 hover:text-[#1d4ea8] dark:hover:bg-zinc-800",
											activeSection === "" &&
												"bg-blue-50/50 text-[#1d4ea8] dark:bg-blue-950/20",
										)}
									>
										<Icon icon="lucide:book-open" className="size-4" />
										<span>Top / Overview</span>
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
										<span>Document Control</span>
									</button>

									<div className="my-2 border-t border-slate-100 dark:border-zinc-800" />

									{filteredSections.map((sec) => {
										const isSectionActive =
											activeSection === `section-${sec.id}`;
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
													<span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-[10px] font-black text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300">
														{matches}
													</span>
												)}
											</button>
										);
									})}
								</nav>
							</div>
						</div>
					</div>

					{/* Right Document Content Column */}
					<div className="space-y-8 lg:col-span-3">
						{/* Document Overview Metadata Panel */}
						<div
							id="doc-control"
							className="scroll-mt-28 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8 dark:border-zinc-800 dark:bg-zinc-900"
						>
							<div className="flex flex-col gap-6 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between dark:border-zinc-800">
								<div>
									<h2 className="text-xl font-black text-slate-900 dark:text-white">
										Document Control & Metadata
									</h2>
									<p className="text-muted-foreground mt-1 text-xs">
										Official records for compliance and regulatory tracking.
									</p>
								</div>

								{/* Download PDF button (placeholder action but UI is premium) */}
								<Button
									variant="outline"
									onClick={() => window.print()}
									className="inline-flex h-10 items-center gap-2 rounded-full border-slate-200 px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
								>
									<Icon icon="lucide:printer" className="size-4" />
									Print Document
								</Button>
							</div>

							<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Classification
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										Public Document
									</p>
								</div>
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Document Owner
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										Socioknack Ltd.
									</p>
								</div>
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Review Frequency
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										Annual / Triggered
									</p>
								</div>
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Version & Date
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										Version 1.0 (July 2026)
									</p>
								</div>
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Initial Release
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										August 1, 2026
									</p>
								</div>
								<div className="rounded-xl bg-slate-50/50 p-4 dark:bg-zinc-800/40">
									<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Jurisdictions
									</span>
									<p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-zinc-200">
										Nigeria & Operating Hubs
									</p>
								</div>
							</div>

							<div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/30 p-4 dark:border-blue-900/30 dark:bg-blue-950/10">
								<p className="text-xs font-semibold leading-relaxed text-blue-900/90 dark:text-blue-200">
									{
										privacyPolicy.documentControl.items[
											privacyPolicy.documentControl.items.length - 1
										]
									}
								</p>
							</div>
						</div>

						{/* Legal Notice Callout Box */}
						<div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50/30 p-6 shadow-sm md:p-8 dark:bg-amber-950/10">
							<div className="flex items-start gap-4">
								<div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
									<Icon icon="lucide:alert-triangle" className="size-5" />
								</div>
								<div className="space-y-3">
									<h4 className="text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
										{privacyPolicy.legalNotice.title}
									</h4>
									{privacyPolicy.legalNotice.paragraphs.map((p) => (
										<p
											key={p}
											className="text-sm leading-relaxed text-amber-900/80 dark:text-amber-200/80"
										>
											{p}
										</p>
									))}
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
									className="text-primary text-xs hover:underline"
								>
									Clear Search
								</button>
							</div>
						)}

						{/* Document Sections Render */}
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
												// Quick browser alert or toast
											}}
											className="hover:text-primary p-1 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600 dark:hover:text-zinc-400"
											title="Copy link to this section"
										>
											<Icon icon="lucide:link-2" className="size-4" />
										</button>
									</div>

									{/* Main Section Paragraphs */}
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

									{/* Main Section Bullets */}
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

									{/* Subsections Loop */}
									{section.subsections.length > 0 && (
										<div className="mt-6 space-y-6">
											{section.subsections.map((sub) => (
												<div
													key={sub.id}
													className="rounded-xl border border-slate-50 bg-slate-50/20 p-4 dark:border-zinc-800 dark:bg-zinc-900/30"
												>
													<h3 className="mb-3 text-sm font-bold text-slate-800 dark:text-zinc-200">
														{sub.id}{" "}
														{highlightText(sub.title, searchQuery)}
													</h3>

													{sub.paragraphs.length > 0 && (
														<div className="space-y-3">
															{sub.paragraphs.map((p) => (
																<p
																	key={p}
																	className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300"
																>
																	{highlightText(p, searchQuery)}
																</p>
															))}
														</div>
													)}

													{sub.bullets.length > 0 && (
														<ul className="mt-3 space-y-2">
															{sub.bullets.map((b) => (
																<li
																	key={b}
																	className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-zinc-300"
																>
																	<span className="text-primary mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50">
																		<Icon
																			icon="lucide:check"
																			className="size-2"
																		/>
																	</span>
																	<span>
																		{highlightText(
																			b,
																			searchQuery,
																		)}
																	</span>
																</li>
															))}
														</ul>
													)}

													{/* Retention Schedule Table */}
													{sub.table && (
														<div className="mt-4 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
															<div className="overflow-x-auto">
																<table className="w-full border-collapse text-left text-xs text-slate-600 dark:text-zinc-300">
																	<thead>
																		<tr className="border-b border-slate-100 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-800/50">
																			{sub.table.headers.map(
																				(h) => (
																					<th
																						key={h}
																						className="px-5 py-3 font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400"
																					>
																						{h}
																					</th>
																				),
																			)}
																		</tr>
																	</thead>
																	<tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
																		{sub.table.rows.map(
																			(row) => (
																				<tr
																					key={
																						row[0] ?? ""
																					}
																					className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30"
																				>
																					<td className="px-5 py-3 font-bold text-slate-900 dark:text-white">
																						{highlightText(
																							row[0] ??
																								"",
																							searchQuery,
																						)}
																					</td>
																					<td className="px-5 py-3 text-slate-600 dark:text-zinc-300">
																						{highlightText(
																							row[1] ??
																								"",
																							searchQuery,
																						)}
																					</td>
																				</tr>
																			),
																		)}
																	</tbody>
																</table>
															</div>
														</div>
													)}
												</div>
											))}
										</div>
									)}
								</section>
							))}
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
								Document Control
							</button>
							{privacyPolicy.sections.map((sec) => (
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
