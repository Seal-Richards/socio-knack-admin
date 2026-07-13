"use client";

import React from "react";

// ─────────────────────────────────────────────
// Shimmer primitive — Facebook / YouTube style
// A moving gradient sweep
// ─────────────────────────────────────────────

export function Shimmer({ className = "" }: { className?: string }) {
	return (
		<div className={`relative overflow-hidden rounded-xl bg-gray-200 ${className}`}>
			<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
		</div>
	);
}

export function HeaderSkeleton() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 flex h-20 w-full items-center bg-white/80 px-4 backdrop-blur-md md:h-24 md:px-6">
			<div className="container mx-auto flex w-full items-center justify-between">
				{/* Logo Skeleton */}
				<Shimmer className="h-8 w-40 rounded-lg md:h-10 md:w-48" />

				{/* Button Skeleton */}
				<Shimmer className="h-12 w-44 rounded-full md:h-14 md:w-52" />
			</div>
		</header>
	);
}

export function HeroSkeleton() {
	return (
		<div className="relative flex min-h-screen flex-col items-center bg-slate-50 pb-0 pt-32">
			<div className="container mx-auto flex flex-col items-center px-4">
				{/* Floating Markers Skeletons */}
				<div className="absolute left-[10%] top-1/4 hidden lg:block">
					<Shimmer className="h-36 w-28 rounded-2xl" />
				</div>
				<div className="absolute right-[10%] top-1/4 hidden lg:block">
					<Shimmer className="h-36 w-28 rounded-2xl" />
				</div>

				{/* Title Skeleton */}
				<div className="mb-10 flex flex-col items-center space-y-4">
					<Shimmer className="h-12 w-[80vw] rounded-xl md:h-16 md:w-[600px] lg:h-20 lg:w-[800px]" />
					<Shimmer className="h-12 w-[60vw] rounded-xl md:h-16 md:w-[400px] lg:h-20 lg:w-[600px]" />
				</div>

				{/* Subtitle Skeleton */}
				<div className="mb-16 flex flex-col items-center space-y-3">
					<Shimmer className="h-4 w-[70vw] rounded-full md:h-6 md:w-[500px]" />
					<Shimmer className="h-4 w-[50vw] rounded-full md:h-6 md:w-[400px]" />
				</div>

				{/* Dashboard Mockup Skeleton */}
				<div className="mt-auto w-full max-w-[1200px]">
					<Shimmer className="h-[400px] w-full rounded-t-[40px] shadow-2xl md:h-[600px]" />
				</div>
			</div>
		</div>
	);
}

export function BrandSkeleton() {
	return (
		<div className="flex flex-col items-center bg-white py-20">
			{/* Badge Skeleton */}
			<Shimmer className="mb-16 h-14 w-[300px] rounded-full md:w-[450px]" />

			{/* Brands Row Skeleton */}
			<div className="container mx-auto flex w-full items-center justify-around overflow-hidden px-4">
				<Shimmer className="h-12 w-40 rounded-lg opacity-40 md:h-16 md:w-56" />
				<Shimmer className="hidden h-12 w-40 rounded-lg opacity-40 sm:block md:h-16 md:w-56" />
				<Shimmer className="hidden h-12 w-40 rounded-lg opacity-40 md:block md:h-16 md:w-56" />
			</div>
		</div>
	);
}

export function InfoSectionSkeleton() {
	return (
		<div className="container mx-auto space-y-24 px-4 py-20">
			{[1, 2].map((i) => (
				<div key={i} className="flex flex-col items-center gap-20 md:flex-row">
					<div className="flex-1 space-y-6">
						<Shimmer className="h-12 w-full rounded-xl md:h-16" />
						<div className="space-y-4">
							<Shimmer className="h-6 w-64 rounded-full" />
							<Shimmer className="h-6 w-56 rounded-full" />
							<Shimmer className="h-6 w-60 rounded-full" />
						</div>
					</div>
					<div className="w-full flex-1">
						<Shimmer className="aspect-[16/10] w-full rounded-[32px]" />
					</div>
				</div>
			))}
		</div>
	);
}

export function HowItWorksSkeleton() {
	return (
		<div className="flex flex-col items-center bg-slate-50/50 py-20">
			<Shimmer className="mb-8 h-10 w-40 rounded-full" />
			<Shimmer className="mb-20 h-16 w-[300px] rounded-xl md:w-[600px]" />

			<div className="container mx-auto grid w-full grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className="flex items-center gap-6 rounded-3xl border border-slate-100 bg-white p-8"
					>
						<Shimmer className="size-16 shrink-0 rounded-full md:size-20" />
						<div className="flex-1 space-y-2">
							<Shimmer className="h-5 w-20 rounded-full" />
							<Shimmer className="h-4 w-full rounded-full" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function FeaturesSkeleton() {
	return (
		<div className="flex flex-col items-center overflow-hidden bg-white py-20">
			<Shimmer className="mb-8 h-10 w-32 rounded-full" />
			<Shimmer className="mb-16 h-16 w-[300px] rounded-xl md:w-[700px]" />

			<div className="mb-20 flex w-full flex-wrap justify-center gap-8 px-4">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="flex items-center gap-3">
						<Shimmer className="size-6 rounded-full" />
						<Shimmer className="h-6 w-32 rounded-full md:w-48" />
					</div>
				))}
			</div>

			<div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 lg:flex-row lg:items-end">
				<Shimmer className="aspect-[1/2] w-full max-w-[320px] rounded-[40px] md:max-w-[400px] md:rounded-[60px]" />
				<Shimmer className="hidden aspect-[16/10] w-full max-w-[900px] rounded-[32px] md:rounded-[48px] lg:block" />
			</div>
		</div>
	);
}

export function FooterSkeleton() {
	return (
		<div className="flex flex-col items-center bg-[#041126] py-20">
			<div className="container mx-auto flex w-full flex-col items-start justify-between gap-16 px-4 lg:flex-row lg:items-center lg:gap-24">
				<div className="w-full max-w-xl space-y-8">
					<Shimmer className="h-16 w-64 rounded-lg bg-slate-800/50" />
					<div className="space-y-4">
						<Shimmer className="h-10 w-full rounded-lg bg-slate-800/50" />
						<Shimmer className="h-10 w-3/4 rounded-lg bg-slate-800/50" />
					</div>
				</div>
				<div className="w-full space-y-6 lg:w-[500px]">
					<Shimmer className="h-12 w-64 rounded-lg bg-slate-800/50" />
					<Shimmer className="h-16 w-full rounded-full bg-slate-800/50" />
					<Shimmer className="h-16 w-full rounded-full bg-slate-800/50" />
				</div>
			</div>
		</div>
	);
}
