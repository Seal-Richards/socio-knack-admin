"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/toast";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters."),
	email: z.string().email("Please enter a valid email address."),
	message: z.string().min(5, "Please write a message with at least 5 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactUsPage() {
	const [isSending, setIsSending] = useState(false);

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	const onSubmit = async (_data: ContactFormValues) => {
		setIsSending(true);
		// Simulate network call
		setTimeout(() => {
			toast.success("Thank you! Your message has been sent successfully.");
			form.reset();
			setIsSending(false);
		}, 1200);
	};

	return (
		<main className="relative min-h-screen bg-slate-50/10">
			<Header />
			<div className="container mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-8 md:pb-36">
				<div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left Side: Contact Info */}
					<div className="flex flex-col gap-8 lg:col-span-5">
						<div className="space-y-4">
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className="inline-flex items-center rounded-full border border-blue-100 bg-[#f4f7fc]/50 px-6 py-2.5 shadow-sm"
							>
								<span className="text-sm font-bold text-[#204B9B]">Contact Us</span>
							</motion.div>
							<h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
								Get in Touch with our team.
							</h1>
							<p className="max-w-md text-base font-semibold leading-relaxed text-slate-500 md:text-lg">
								Have questions about our plans, custom pricing, or need a platform
								demo? Reach out to us.
							</p>
						</div>

						{/* Info List */}
						<div className="flex flex-col gap-6">
							<div className="flex items-start gap-4">
								<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1d4ea8]">
									<Icon icon="solar:letter-bold-duotone" className="size-6" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-xs font-black uppercase tracking-wider text-slate-400">
										Email Support
									</span>
									<span className="text-base font-bold text-slate-800 md:text-lg">
										info@socioknack.com
									</span>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1d4ea8]">
									<Icon icon="solar:phone-bold-duotone" className="size-6" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-xs font-black uppercase tracking-wider text-slate-400">
										Call Center
									</span>
									<span className="text-base font-bold text-slate-800 md:text-lg">
										(+234) 02012298322
									</span>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1d4ea8]">
									<Icon icon="solar:map-point-bold-duotone" className="size-6" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-xs font-black uppercase tracking-wider text-slate-400">
										Headquarters
									</span>
									<span className="text-base font-bold leading-snug text-slate-800 md:text-lg">
										2nd floor, 52-54 Isaac John St, Ikeja, Lagos 101233, Lagos
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side: Contact Form Card */}
					<div className="w-full lg:col-span-7">
						<div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl shadow-slate-100/50 md:p-12">
							<h2 className="mb-8 text-center text-2xl font-black tracking-tight text-[#0f2d6b] md:text-3xl">
								Hello! How can we be of help to you today?
							</h2>

							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
									<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem className="space-y-2">
													<FormLabel className="text-[13px] font-bold text-slate-700">
														Name
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Input full name"
															className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#1d4ea8]"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem className="space-y-2">
													<FormLabel className="text-[13px] font-bold text-slate-700">
														Email
													</FormLabel>
													<FormControl>
														<Input
															type="email"
															placeholder="Input email address"
															className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#1d4ea8]"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="message"
										render={({ field }) => (
											<FormItem className="space-y-2">
												<FormLabel className="text-[13px] font-bold text-slate-700">
													Talk to us
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Input your message details"
														className="min-h-[140px] resize-none rounded-xl border-gray-200 focus-visible:ring-[#1d4ea8]"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										disabled={isSending}
										className="h-14 w-full rounded-2xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-[#153a82] active:scale-[0.99] disabled:opacity-50"
									>
										{isSending ? "Sending..." : "Submit"}
									</Button>
								</form>
							</Form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</main>
	);
}
