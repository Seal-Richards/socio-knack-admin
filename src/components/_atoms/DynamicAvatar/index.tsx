import React from "react";
import Image from "next/image";

interface DynamicAvatarProps {
	name: string;
	image?: string | null;
	className?: string;
}

export default function DynamicAvatar({ name, image, className }: DynamicAvatarProps) {
	const isFallback =
		!image ||
		image.includes("admin-avatar.png") ||
		image.includes("default") ||
		image === "/assets/images/admin-avatar.png";

	// Handle name safely, split by space to get initials if desired, but user requested "first letter"
	const initial = name ? name.charAt(0).toUpperCase() : "?";

	if (isFallback) {
		return (
			<div
				className={`flex items-center justify-center bg-blue-50 font-bold text-[#1d4ea8] ${className}`}
			>
				{initial}
			</div>
		);
	}

	return (
		<div className={`relative overflow-hidden ${className}`}>
			<Image src={image || ""} alt={name || "Avatar"} fill className="object-cover" />
		</div>
	);
}
