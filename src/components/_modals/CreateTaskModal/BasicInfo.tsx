"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetAgents } from "@/hooks/useAgent";
import cn from "@/lib/utils";
import { createTaskBasicSchema } from "@/schemas/task";

interface BasicInfoProps {
	onNext: () => void;
	formData: {
		title: string;
		agentId: string;
		scheduledDate: string;
		scheduledTime: string;
		priority: string;
	};
	updateFormData: (fields: Partial<BasicInfoProps["formData"]>) => void;
}

export default function BasicInfo({ onNext, formData, updateFormData }: BasicInfoProps) {
	const priorities = ["Low", "Medium", "High"];
	const [errors, setErrors] = useState<{ title?: string; agentId?: string }>({});

	const { data: agentsRes, isLoading: loadingAgents } = useGetAgents();
	const agents = agentsRes?.data || [];

	const handleNext = () => {
		const result = createTaskBasicSchema.safeParse({
			title: formData.title,
			agentId: formData.agentId,
		});

		if (!result.success) {
			const formattedErrors: { title?: string; agentId?: string } = {};
			result.error.issues.forEach((issue) => {
				if (issue.path[0] === "title") formattedErrors.title = issue.message;
				if (issue.path[0] === "agentId") formattedErrors.agentId = issue.message;
			});
			setErrors(formattedErrors);
			return;
		}

		setErrors({});
		onNext();
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Visit Name */}
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Visit Name</Label>
				<Input
					placeholder="Enter Here"
					value={formData.title}
					onChange={(e) => {
						updateFormData({ title: e.target.value });
						if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
					}}
					className={cn(
						"h-14 rounded-2xl border px-5 text-[14px] placeholder:text-gray-400 focus-visible:ring-offset-0",
						errors.title
							? "border-red-500 focus-visible:ring-red-500/20"
							: "border-gray-200 focus-visible:ring-[#1d4ea8]/20",
					)}
				/>
				{errors.title && (
					<p className="pl-1 text-xs font-semibold text-red-500">{errors.title}</p>
				)}
			</div>

			{/* Assign Agent */}
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Assign Field Agent</Label>
				<Select
					value={formData.agentId}
					onValueChange={(val) => {
						updateFormData({ agentId: val });
						if (errors.agentId) setErrors((prev) => ({ ...prev, agentId: undefined }));
					}}
				>
					<SelectTrigger
						className={cn(
							"h-14 rounded-2xl border px-5 text-[14px] focus:ring-offset-0",
							errors.agentId
								? "border-red-500 focus:ring-red-500/20"
								: "border-gray-200 focus:ring-[#1d4ea8]/20",
						)}
					>
						<SelectValue
							placeholder={loadingAgents ? "Loading agents..." : "Select Agent"}
						/>
					</SelectTrigger>
					<SelectContent className="rounded-2xl border-gray-100 shadow-xl">
						{agents.map((agent) => (
							<SelectItem
								key={agent.id || agent._id}
								value={agent.id || agent._id || ""}
							>
								{`${agent.firstName || ""} ${agent.lastName || ""}`.trim() ||
									agent.email}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.agentId && (
					<p className="pl-1 text-xs font-semibold text-red-500">{errors.agentId}</p>
				)}
			</div>

			{/* Deadline */}
			<div className="flex flex-col gap-3">
				<Label className="text-[14px] font-bold text-gray-700">Deadline</Label>
				<div className="flex flex-wrap items-center gap-4">
					<div className="relative flex-1">
						<span className="absolute left-0 top-1/2 -translate-y-1/2 text-[14px] text-gray-400">
							Date
						</span>
						<div className="relative ml-10">
							<Input
								type="date"
								value={formData.scheduledDate}
								onChange={(e) => updateFormData({ scheduledDate: e.target.value })}
								className="h-14 rounded-2xl border-gray-200 pl-4 pr-10 text-[14px] focus-visible:ring-[#1d4ea8]/20"
							/>
						</div>
					</div>
					<div className="relative flex-1">
						<span className="absolute left-0 top-1/2 -translate-y-1/2 text-[14px] text-gray-400">
							Time
						</span>
						<div className="relative ml-10 flex gap-2">
							{(() => {
								const time24 = formData.scheduledTime || "10:00";
								const [tHourStr, tMinStr] = time24.split(":");
								let hr = parseInt(tHourStr || "10", 10);
								const minStr = tMinStr || "00";
								const period = hr >= 12 ? "PM" : "AM";
								hr %= 12;
								hr = hr || 12;
								const hrStr = String(hr);

								const updateTimeStr = (
									newHr: string,
									newMin: string,
									newPeriod: string,
								) => {
									let hr24 = parseInt(newHr, 10);
									if (newPeriod === "PM" && hr24 !== 12) {
										hr24 += 12;
									} else if (newPeriod === "AM" && hr24 === 12) {
										hr24 = 0;
									}
									const timeStr = `${String(hr24).padStart(2, "0")}:${newMin}`;
									updateFormData({ scheduledTime: timeStr });
								};

								return (
									<>
										<select
											value={hrStr}
											onChange={(e) =>
												updateTimeStr(e.target.value, minStr, period)
											}
											className="h-14 flex-1 cursor-pointer rounded-2xl border border-gray-200 bg-white px-2 text-[14px] focus:border-[#1d4ea8] focus:outline-none focus:ring-1 focus:ring-[#1d4ea8]/20"
										>
											{Array.from({ length: 12 }, (_, i) =>
												String(i + 1),
											).map((h) => (
												<option key={h} value={h}>
													{h}
												</option>
											))}
										</select>
										<select
											value={minStr}
											onChange={(e) =>
												updateTimeStr(hrStr, e.target.value, period)
											}
											className="h-14 flex-1 cursor-pointer rounded-2xl border border-gray-200 bg-white px-2 text-[14px] focus:border-[#1d4ea8] focus:outline-none focus:ring-1 focus:ring-[#1d4ea8]/20"
										>
											{Array.from({ length: 60 }, (_, i) =>
												String(i).padStart(2, "0"),
											).map((m) => (
												<option key={m} value={m}>
													{m}
												</option>
											))}
										</select>
										<select
											value={period}
											onChange={(e) =>
												updateTimeStr(hrStr, minStr, e.target.value)
											}
											className="h-14 cursor-pointer rounded-2xl border border-gray-200 bg-white px-3 text-[14px] focus:border-[#1d4ea8] focus:outline-none focus:ring-1 focus:ring-[#1d4ea8]/20"
										>
											<option value="AM">AM</option>
											<option value="PM">PM</option>
										</select>
									</>
								);
							})()}
						</div>
					</div>
				</div>
			</div>

			{/* Priority */}
			<div className="flex flex-col gap-4">
				<Label className="text-[14px] font-bold text-gray-700">Priority</Label>
				<div className="grid grid-cols-3 gap-3">
					{priorities.map((p) => (
						<button
							key={p}
							type="button"
							onClick={() => updateFormData({ priority: p })}
							className={cn(
								"flex h-12 items-center justify-center rounded-xl border text-[13px] font-medium transition-all",
								formData.priority.toLowerCase() === p.toLowerCase()
									? "border-[#1d4ea8] bg-[#1d4ea8]/5 text-[#1d4ea8]"
									: "border-gray-200 text-gray-500 hover:border-gray-300",
							)}
						>
							{p}
						</button>
					))}
				</div>
			</div>

			<button
				type="button"
				onClick={handleNext}
				className="mt-4 h-14 w-full rounded-xl bg-[#1d4ea8] text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#153a82] active:scale-[0.98]"
			>
				Next
			</button>
		</div>
	);
}
