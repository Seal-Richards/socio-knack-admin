"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
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
	isCurrentPlan?: boolean;
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
function getCardClassName({
	isCurrentPlan,
	isCustom,
	isSelected,
	borderColor,
	className,
}: {
	isCurrentPlan: boolean;
	isCustom: boolean;
	isSelected: boolean;
	borderColor: string;
	className?: string;
}) {
	const base =
		"relative flex h-full flex-col rounded-[2rem] bg-white p-2.5 lg:p-2 xl:p-2.5 shadow-sm transition-all duration-300";

	let borderStyles: string;
	if (isCurrentPlan) {
		borderStyles = "cursor-default border-[1.5px] border-gray-200";
	} else if (isCustom) {
		borderStyles =
			"cursor-pointer border-[1.5px] border-[#e08925] ring-[1.5px] ring-[#e08925] ring-offset-[6px] ring-offset-[#f4f7fc] hover:shadow-xl";
	} else {
		borderStyles = `border-[1.5px] ${borderColor} cursor-pointer hover:shadow-xl`;
	}

	const selectedStyles =
		isSelected && !isCurrentPlan
			? "z-10 scale-[1.02] shadow-2xl ring-2 ring-offset-4 ring-offset-[#f4f7fc]"
			: "";

	return `${base} ${borderStyles} ${selectedStyles} ${className || ""}`.trim();
}

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
	isCurrentPlan = false,
	onSelect,
	onAction,
	className,
	...rest
}: PricingCardProps & HTMLMotionProps<"div">) {
	const colors = colorThemes[theme];

	return (
		<motion.div
			{...rest}
			whileHover={isCurrentPlan ? {} : { y: -8 }}
			onClick={isCurrentPlan ? undefined : onSelect}
			className={getCardClassName({
				isCurrentPlan,
				isCustom,
				isSelected,
				borderColor: colors.border,
				className,
			})}
			style={
				isSelected && !isCurrentPlan
					? { ...rest.style, outlineColor: "currentcolor" }
					: rest.style
			}
		>
			{/* Header Block (Inner padded colored block as per design) */}
			<div
				className={`flex w-full items-start gap-3 rounded-2xl p-5 text-white lg:p-3.5 xl:p-5 ${isCurrentPlan ? "bg-gray-400" : colors.headerBg}`}
			>
				<div className="mt-1.5 size-2.5 shrink-0 rounded-full bg-white" />
				<div className="flex flex-col">
					<span className="text-[17px] font-bold leading-tight tracking-wide lg:text-[15px] xl:text-[17px]">
						{title}
					</span>
					<span className="mt-0.5 text-[11px] font-medium text-white/90">{subtitle}</span>
				</div>
			</div>

			<div className="flex flex-1 flex-col px-5 pb-3 pt-8 lg:px-3.5 lg:pt-6 xl:px-5 xl:pt-8">
				{/* Pricing Area */}
				<div className="mb-4 flex h-[75px] flex-col justify-center">
					{!isCustom ? (
						<>
							<div className="flex items-center gap-1.5">
								<span className="text-[2.5rem] font-extrabold leading-none tracking-tighter text-[#2a2a2a] lg:text-[2rem] xl:text-[2.5rem]">
									{price}
								</span>
								<div className="ml-1 flex flex-col text-[9px] font-bold uppercase leading-[1.2] text-gray-400">
									<span>/ MONTH</span>
									<span>(PER USER)</span>
								</div>
							</div>
							<div className="mt-4 flex items-center gap-1.5">
								<span className="text-[15px] font-bold leading-none text-[#2a2a2a] lg:text-[13px] xl:text-[15px]">
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
							<span className="text-[2.5rem] font-bold tracking-tight text-[#555555] lg:text-[2rem] xl:text-[2.5rem]">
								Custom
							</span>
							<span className="text-[2.5rem] font-bold tracking-tight text-[#555555] lg:text-[2rem] xl:text-[2.5rem]">
								Pricing
							</span>
						</div>
					)}
				</div>

				{/* Divider line removed to match the uploaded design clean look, or kept invisible to space correctly */}
				<div className="h-4 w-full" />

				{/* Features List */}
				<div className="mb-10 flex flex-1 flex-col gap-[15px]">
					{features.map((feature) => (
						<div key={feature} className="flex items-center gap-3.5">
							<div
								className={`flex size-[18px] shrink-0 items-center justify-center rounded-full lg:size-[16px] xl:size-[18px] ${isCurrentPlan ? "bg-gray-100" : colors.iconBg}`}
							>
								<Icon
									icon="lucide:check"
									className={`size-3 stroke-[3] lg:size-2.5 xl:size-3 ${isCurrentPlan ? "text-gray-400" : colors.iconColor}`}
								/>
							</div>
							<span className="text-[13px] font-medium tracking-tight text-gray-500 lg:text-[12px] xl:text-[13px]">
								{feature}
							</span>
						</div>
					))}
				</div>

				{/* Action Button */}
				{isCurrentPlan ? (
					<button
						disabled
						className="bg-gray-150 mt-auto w-full cursor-not-allowed rounded-xl border border-gray-200 py-4 text-[13px] font-bold text-gray-400 lg:py-3 lg:text-[12px] xl:py-4 xl:text-[13px]"
					>
						Current Plan
					</button>
				) : (
					<motion.button
						whileTap={{ scale: 0.96 }}
						onClick={(e) => {
							e.stopPropagation();
							onAction();
						}}
						className={`mt-auto w-full rounded-xl py-4 text-[13px] font-bold text-white shadow-md transition-all lg:py-3 lg:text-[12px] xl:py-4 xl:text-[13px] ${colors.buttonBg}`}
					>
						{buttonText}
					</motion.button>
				)}
			</div>
		</motion.div>
	);
}
