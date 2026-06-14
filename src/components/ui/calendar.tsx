"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import cn from "@src/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const CalendarChevron = ({ orientation }: { orientation?: "left" | "right" }) => {
	if (orientation === "left") {
		return <ChevronLeft className="size-4" />;
	}
	return <ChevronRight className="size-4" />;
};

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				month_caption: "flex justify-between pt-1 relative items-center px-8",
				caption_label: "text-sm font-bold text-gray-800",
				nav: "space-x-1 flex items-center",
				button_previous: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1",
				),
				button_next: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1",
				),
				month_grid: "w-full border-collapse space-y-1",
				weekdays: "flex",
				weekday: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem] text-center",
				week: "flex w-full mt-2",
				day: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
				day_button: cn(
					buttonVariants({ variant: "ghost" }),
					"h-9 w-9 p-0 font-normal aria-selected:opacity-100",
				),
				selected:
					"bg-[#1d4ea8] text-white hover:bg-[#1d4ea8] hover:text-white focus:bg-[#1d4ea8] focus:text-white [&_button]:!bg-[#1d4ea8] [&_button]:!text-white [&_button]:hover:!bg-[#1d4ea8] [&_button]:hover:!text-white [&_button]:focus:!bg-[#1d4ea8] [&_button]:focus:!text-white [&_button]:!rounded-md",
				today: "bg-gray-100 text-gray-900 font-bold [&_button]:bg-gray-100 [&_button]:text-gray-900 [&_button]:font-bold",
				outside:
					"day-outside text-gray-500 opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-500 aria-selected:opacity-30 [&_button]:text-gray-500 [&_button]:opacity-50",
				disabled: "text-gray-500 opacity-50 [&_button]:text-gray-500 [&_button]:opacity-50",
				range_start:
					"day-range-start rounded-l-md [&_button]:!rounded-l-md [&_button]:!bg-[#1d4ea8] [&_button]:!text-white [&_button]:hover:!bg-[#1d4ea8] [&_button]:hover:!text-white [&_button]:focus:!bg-[#1d4ea8] [&_button]:focus:!text-white",
				range_end:
					"day-range-end rounded-r-md [&_button]:!rounded-r-md [&_button]:!bg-[#1d4ea8] [&_button]:!text-white [&_button]:hover:!bg-[#1d4ea8] [&_button]:hover:!text-white [&_button]:focus:!bg-[#1d4ea8] [&_button]:focus:!text-white",
				range_middle:
					"day-range-middle aria-selected:bg-gray-100 aria-selected:text-gray-900 [&_button]:bg-gray-100 [&_button]:text-gray-900 [&_button]:rounded-none [&_button]:hover:bg-gray-100 [&_button]:hover:text-gray-900 [&_button]:focus:bg-gray-100 [&_button]:focus:text-gray-900",
				hidden: "invisible",
				...classNames,
			}}
			components={{
				Chevron: CalendarChevron,
			}}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
