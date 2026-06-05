"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type PricingCardProps = {
	title: string;
	subtitle: string;
	price?: string;
	setupFee?: string;
	features: string[];
	isCustom?: boolean;
	buttonText: string;
	theme: "green" | "blue" | "purple" | "orange";
	isSelected: boolean;
	onSelect: () => void;
	onAction: () => void;
};

const colorThemes = {
	green: {
		border: "border-[#4aa850]",
		headerBg: "bg-[#4aa850]",
		iconBg: "bg-[#eaf5eb]",
		iconColor: "text-[#4aa850]",
		buttonBg: "bg-[#4aa850] hover:bg-[#3d8b42]",
	},
	blue: {
		border: "border-[#3f63b6]",
		headerBg: "bg-[#3f63b6]",
		iconBg: "bg-[#eef1f8]",
		iconColor: "text-[#3f63b6]",
		buttonBg: "bg-[#3f63b6] hover:bg-[#325196]",
	},
	purple: {
		border: "border-[#a34cb8]",
		headerBg: "bg-[#a34cb8]",
		iconBg: "bg-[#f5eef8]",
		iconColor: "text-[#a34cb8]",
		buttonBg: "bg-[#a34cb8] hover:bg-[#883e9a]",
	},
	orange: {
		border: "border-[#e08925]",
		headerBg: "bg-[#e08925]",
		iconBg: "bg-[#fdf4ea]",
		iconColor: "text-[#e08925]",
		buttonBg: "bg-[#e08925] hover:bg-[#c2751f]",
	},
};

export default function PricingCard({
	title,
	subtitle,
	price,
	setupFee,
	features,
	isCustom = false,
	buttonText,
	theme,
	isSelected,
	onSelect,
	onAction,
}: PricingCardProps) {
	const colors = colorThemes[theme];

	return (
		<motion.div
			whileHover={{ y: -8 }}
			onClick={onSelect}
			className={`relative flex h-full cursor-pointer flex-col rounded-[2rem] bg-white p-2.5 shadow-sm transition-all duration-300 hover:shadow-xl ${
				isCustom
					? `border-[1.5px] border-[#e08925] ring-[1.5px] ring-[#e08925] ring-offset-[6px] ring-offset-[#f4f7fc]`
					: `border-[1.5px] ${colors.border}`
			} ${isSelected ? "z-10 scale-[1.02] shadow-2xl ring-2 ring-offset-4 ring-offset-[#f4f7fc]" : ""}`}
			style={isSelected ? { outlineColor: "currentcolor" } : {}}
		>
			{/* Header Block (Inner padded colored block as per design) */}
			<div
				className={`flex w-full items-start gap-3 rounded-2xl p-5 text-white ${colors.headerBg}`}
			>
				<div className="mt-1.5 size-2.5 shrink-0 rounded-full bg-white" />
				<div className="flex flex-col">
					<span className="text-[17px] font-bold leading-tight tracking-wide">
						{title}
					</span>
					<span className="mt-0.5 text-[11px] font-medium text-white/90">{subtitle}</span>
				</div>
			</div>

			<div className="flex flex-1 flex-col px-5 pb-3 pt-8">
				{/* Pricing Area */}
				<div className="mb-4 flex h-[75px] flex-col justify-center">
					{!isCustom ? (
						<>
							<div className="flex items-center gap-1.5">
								<span className="text-[2.5rem] font-extrabold leading-none tracking-tighter text-[#2a2a2a]">
									{price}
								</span>
								<div className="ml-1 flex flex-col text-[9px] font-bold uppercase leading-[1.2] text-gray-400">
									<span>/ MONTH</span>
									<span>(PER USER)</span>
								</div>
							</div>
							<div className="mt-4 flex items-center gap-1.5">
								<span className="text-[15px] font-bold leading-none text-[#2a2a2a]">
									{setupFee}
								</span>
								<div className="ml-1 flex flex-col text-[9px] font-bold uppercase leading-[1.2] text-gray-400">
									<span>Setup Fee</span>
									<span>(one-time)</span>
								</div>
							</div>
						</>
					) : (
						<div className="flex w-full flex-col pt-4 text-center leading-[1.1]">
							<span className="text-[2.5rem] font-bold tracking-tight text-[#555555]">
								Custom
							</span>
							<span className="text-[2.5rem] font-bold tracking-tight text-[#555555]">
								Pricing
							</span>
						</div>
					)}
				</div>

				{/* Divider line removed to match the uploaded design clean look, or kept invisible to space correctly */}
				<div className="h-4 w-full" />

				{/* Features List */}
				<div className="mb-10 flex flex-1 flex-col gap-[15px]">
					{features.map((feature, i) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={i} className="flex items-center gap-3.5">
							<div
								className={`flex size-[18px] shrink-0 items-center justify-center rounded-full ${colors.iconBg}`}
							>
								<Icon
									icon="lucide:check"
									className={`size-3 stroke-[3] ${colors.iconColor}`}
								/>
							</div>
							<span className="text-[13px] font-medium tracking-tight text-gray-500">
								{feature}
							</span>
						</div>
					))}
				</div>

				{/* Action Button */}
				<motion.button
					whileTap={{ scale: 0.96 }}
					onClick={(e) => {
						e.stopPropagation();
						onAction();
					}}
					className={`mt-auto w-full rounded-xl py-4 text-[13px] font-bold text-white shadow-md transition-all ${colors.buttonBg}`}
				>
					{buttonText}
				</motion.button>
			</div>
		</motion.div>
	);
}
