"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { faqs } from "@/constants/faq";

const FAQSection = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="relative bg-white py-20 md:py-32">
			<div className="container mx-auto flex max-w-4xl flex-col items-center px-6 md:px-8">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-8 inline-flex items-center rounded-full border border-blue-100 bg-[#f4f7fc]/50 px-6 py-3 shadow-sm"
				>
					<span className="text-sm font-bold text-[#204B9B] md:text-lg">FAQs</span>
				</motion.div>

				{/* Title */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center text-4xl font-black tracking-tight text-slate-900 md:text-6xl"
				>
					Common Questions. <span className="text-[#204B9B]">Clear Answers.</span>
				</motion.h2>

				{/* Accordion List */}
				<div className="mb-24 flex w-full flex-col gap-4">
					{faqs.map((faq, index) => {
						const isOpen = openIndex === index;
						return (
							<div
								key={faq.question}
								className="rounded-[20px] border border-gray-100 bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-[#1d4ea8]/20"
							>
								<button
									type="button"
									onClick={() => toggleFAQ(index)}
									className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
								>
									<span className="pr-4 text-base font-bold leading-snug text-slate-800 md:text-xl">
										{faq.question}
									</span>
									<span
										className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1d4ea8] transition-transform duration-300 ${
											isOpen ? "rotate-45" : ""
										}`}
									>
										<Icon icon="lucide:plus" className="size-5" />
									</span>
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3, ease: "easeInOut" }}
											className="overflow-hidden"
										>
											<div className="border-t border-gray-50 px-6 pb-6 pt-2 text-sm font-semibold leading-relaxed text-gray-500 md:text-base">
												{faq.answer}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>

				{/* Action Banner */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-10 flex w-full flex-col items-center gap-6 text-center"
				>
					<h3 className="max-w-2xl text-3xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
						Ready to Scale Your Field Operations with Confidence?
					</h3>
					<p className="max-w-md text-sm font-semibold text-gray-500 md:text-lg">
						Join leading companies already trusting SocioKnack to automate growth.
					</p>
					<Link href="/contact-us">
						<button
							type="button"
							className="h-16 rounded-2xl bg-[#1d4ea8] px-10 text-[16px] font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-105 hover:bg-[#153a82] active:scale-95"
						>
							Schedule Your Free Demo Today
						</button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default FAQSection;
