export interface InfoCard {
	id: number;
	title: string;
	description?: string;
	bullets: string[];
	footerText?: string;
	icon: string;
	image: string;
	imageRight: boolean;
	bgColor: string;
}

export const infoCards: InfoCard[] = [
	{
		id: 1,
		title: "You Don’t Just Have Sales Agents- You Have Uncontrolled Sales Funnel",
		bullets: [
			"Leads are spread across multiple territories",
			"Sales Agent responds at will and lose sales to competition.",
			"Managers cannot track performance in real time",
			"Follow-ups are inconsistent or forgotten",
			"Revenue leaks happen silently every day",
			"Sales Agents are overwhelmed switching between apps, missing context, and struggling to keep up.",
			"Sales Agents have no real-time visibility into how commissions are (manually) calculated",
		],
		icon: "/assets/svg/ph_seal-check-fill.svg",
		image: "/assets/svg/waitlist-team01right.svg",
		imageRight: true,
		bgColor: "bg-[#F9FAFB]",
	},
	{
		id: 2,
		title: "One System That Aligns Business Control With Agent Performance",
		description: "Socioknack brings structure to chaos by connecting:",
		bullets: [
			"Field (sales) visibility and control",
			"Sales Agent workflow and productivity",
			"Leads and revenue tracking",
		],
		footerText:
			"So every lead becomes trackable, and every Sales Agent becomes accountable and effective.",
		icon: "/assets/svg/ph_verify-check-fill.svg",
		image: "/assets/svg/waitlist-team02-left.svg",
		imageRight: false,
		bgColor: "bg-white",
	},
];
