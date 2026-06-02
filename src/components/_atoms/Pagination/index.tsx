import React from "react";
import { Icon } from "@iconify/react";
import cn from "@/lib/utils";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: PaginationProps) {
	const handlePrev = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	};

	// Generate page numbers to show
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i += 1) {
				pages.push(i);
			}
		} else {
			// Show pages around current page
			let start = Math.max(1, currentPage - 2);
			let end = Math.min(totalPages, currentPage + 2);

			if (start === 1) {
				end = maxVisible;
			} else if (end === totalPages) {
				start = totalPages - maxVisible + 1;
			}

			if (start > 1) {
				pages.push(1);
				if (start > 2) pages.push("...start");
			}

			for (let i = start; i <= end; i += 1) {
				pages.push(i);
			}

			if (end < totalPages) {
				if (end < totalPages - 1) pages.push("...end");
				pages.push(totalPages);
			}
		}
		return pages;
	};

	return (
		<div className={cn("flex items-center justify-end gap-2 py-4", className)}>
			<button
				onClick={handlePrev}
				disabled={currentPage === 1}
				className="flex size-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
				aria-label="Previous page"
			>
				<Icon icon="solar:alt-arrow-left-line-duotone" className="size-5" />
			</button>

			<div className="flex items-center gap-1">
				{getPageNumbers().map((page) => {
					if (typeof page === "string" && page.startsWith("...")) {
						return (
							<span key={page} className="px-2 text-gray-400">
								...
							</span>
						);
					}

					return (
						<button
							key={`page-${page}`}
							onClick={() => onPageChange(page as number)}
							className={cn(
								"flex size-8 items-center justify-center rounded-full text-[13px] font-medium transition-colors",
								currentPage === page
									? "bg-[#1d4ea8] text-white"
									: "text-gray-600 hover:bg-gray-100",
							)}
						>
							{page}
						</button>
					);
				})}
			</div>

			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className="flex size-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
				aria-label="Next page"
			>
				<Icon icon="solar:alt-arrow-right-line-duotone" className="size-5" />
			</button>
		</div>
	);
}
