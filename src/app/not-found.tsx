"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#4A6D88] via-[#B9C6CF] to-white p-6">
			{/* Cloud and Sun Background Elements (Top Left and Top Right) */}
			<div className="pointer-events-none absolute left-0 top-0 z-0 size-48 select-none md:size-80">
				<Image
					src="/assets/svg/404_cloud_sun.svg"
					alt="Clouds and Sun Left"
					fill
					className="object-contain opacity-80"
					priority
				/>
			</div>
			<div className="pointer-events-none absolute right-0 top-0 z-0 size-48 select-none md:size-80">
				<Image
					src="/assets/svg/404_cloud_sun.svg"
					alt="Clouds and Sun Right"
					fill
					className="-scale-x-100 object-contain opacity-80"
					priority
				/>
			</div>

			{/* Container for Digits and Main Content */}
			<div className="relative z-20 flex max-w-4xl flex-col items-center justify-center space-y-2 px-4 text-center">
				{/* Reduced 404 Background Text (now part of flow or positioned relatively) */}
				<div className="pointer-events-none select-none">
					<span className="text-[25vw] font-black leading-none tracking-tighter text-white/40 drop-shadow-2xl md:text-[20vw] md:text-white/60">
						404
					</span>
				</div>

				{/* Main Content (Positioned Below Digits) */}
				<div className="flex flex-col items-center space-y-6 pt-4">
					<h1 className="text-4xl font-extrabold tracking-tight text-[#111111] md:text-6xl">
						Lost in the Ink?
					</h1>
					<p className="max-w-2xl text-sm font-normal italic leading-relaxed text-gray-600 md:text-lg">
						It looks like this page didn&apos;t make the final cut! Our cartoon crew
						can&apos;t seem to find the address you&apos;re looking for. Let&apos;s get
						you back to the main drawing board.
					</p>

					<Link
						href="/"
						className="mt-6 rounded-full border border-[#111111]/20 bg-white/50 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] shadow-lg backdrop-blur-sm transition-all hover:bg-gray-100 md:text-sm"
					>
						Go Back Home
					</Link>
				</div>
			</div>

			{/* Bottom Decorative SVGs */}
			<div className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-[350px] w-[450px] select-none md:block">
				<Image
					src="/assets/svg/404_human.svg"
					alt="Lost Human"
					fill
					className="object-contain object-bottom"
				/>
			</div>

			<div className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-[350px] w-[450px] select-none md:block">
				<Image
					src="/assets/svg/404_car.svg"
					alt="Lost Car"
					fill
					className="object-contain object-bottom px-8"
				/>
			</div>

			{/* Mobile versions for bottom SVGs */}
			<div className="absolute bottom-4 z-10 flex w-full flex-row justify-between px-4 opacity-70 md:hidden">
				<div className="relative size-28">
					<Image
						src="/assets/svg/404_human.svg"
						alt="Lost Human"
						fill
						className="object-contain"
					/>
				</div>
				<div className="relative h-28 w-36">
					<Image
						src="/assets/svg/404_car.svg"
						alt="Lost Car"
						fill
						className="object-contain"
					/>
				</div>
			</div>
		</main>
	);
}
