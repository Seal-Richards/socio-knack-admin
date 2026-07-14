export const aboutBanner = {
	title: "ABOUT SOCIOKNACK",
	subtitle:
		"Join leading companies already trusting SocioKnack to automate growth. Get the App now.",
	appStoreUrl: "https://apps.apple.com",
	playStoreUrl: "https://play.google.com",
};

export interface AboutSection {
	header: string;
	text?: string;
	paragraphs?: string[];
	bullets?: string[];
	footerParagraphs?: string[];
}

export interface AboutContentData {
	mainParagraphs: string[];
	sections: AboutSection[];
}

export const aboutContent: AboutContentData = {
	mainParagraphs: [
		"At Socioknack, we believe that businesses don't lose revenue because of a lack of opportunities—they lose revenue because of a lack of visibility, accountability, and control over their sales operations.",
		"We are a modern Sales Operations Platform built to help businesses organize their sales processes, empower their sales teams, and turn every customer conversation into measurable business growth.",
		"Whether your team operates across cities, territories, or countries, Socioknack gives you the tools to manage leads, monitor field activities, automate commissions, and gain real-time visibility into sales performance from a single platform.",
		"Our solution is designed for organizations that rely on field sales teams, remote sales agents, distributors, merchant acquisition teams, and business development executives.",
	],
	sections: [
		{
			header: "What We Do",
			bullets: [
				"Track every sales lead from first contact to closure.",
				"Monitor sales team performance in real time.",
				"Manage territories and field operations.",
				"Automate commission calculations and incentive tracking.",
				"Improve customer follow-ups and reduce revenue leakage.",
				"Generate actionable sales reports and performance insights.",
				"Strengthen accountability across distributed sales teams.",
			],
			paragraphs: [
				"Our platform enables businesses to replace spreadsheets, disconnected messaging apps, and manual reporting with a centralized system built for sales excellence.",
			],
		},
		{
			header: "Our Mission",
			text: "To empower businesses with intelligent sales management tools that improve visibility, accountability, and sustainable revenue growth.",
		},
		{
			header: "Our Vision",
			text: "To become Africa's leading Sales Operations Platform, enabling businesses of every size to build high-performing, data-driven sales organizations.",
		},
		{
			header: "Our Core Values",
			bullets: [
				"Customer Success: Our customers' growth defines our success.",
				"Measurability: We believe every lead, every activity, and every sales opportunity should be measurable.",
				"Innovation: We continuously build technology that simplifies complex sales operations.",
				"Integrity: We are committed to transparency, security, fairness, and ethical business practices.",
				"Excellence: We strive to deliver reliable, scalable, and enterprise-grade solutions that exceed customer expectations.",
			],
		},
		{
			header: "Who We Serve",
			paragraphs: [
				"Socioknack is built for organizations that manage distributed sales operations, including:",
			],
			bullets: [
				"FMCG companies",
				"Insurance companies",
				"Fintech companies",
				"Buy Now, Pay Later (BNPL) providers",
				"Asset financing companies",
				"Real estate companies",
				"Pharmaceutical distributors",
				"Logistics companies",
				"Manufacturing companies",
				"Telecommunications companies",
				"Businesses with field marketers, sales representatives, and merchant acquisition teams",
			],
		},
		{
			header: "Why Socioknack?",
			paragraphs: [
				"Unlike traditional CRMs that simply store customer information, Socioknack focuses on sales execution and operational control.",
				"We help businesses answer critical questions such as:",
			],
			bullets: [
				"Which sales agent is performing best?",
				"Where are we losing potential customers?",
				"Which territories generate the highest revenue?",
				"Are follow-ups happening on time?",
				"How much commission has each sales agent earned?",
				"Which leads require immediate attention?",
			],
			footerParagraphs: [
				"With Socioknack, every lead becomes visible, every sales activity becomes measurable, and every opportunity contributes to smarter business decisions.",
			],
		},
		{
			header: "Our Commitment",
			paragraphs: [
				"We are committed to helping businesses transform scattered sales activities into structured, predictable, and scalable revenue growth.",
				"By combining technology, automation, analytics, and operational intelligence, Socioknack enables organizations to build more productive sales teams, strengthen customer relationships, and make better business decisions with confidence.",
			],
		},
		{
			header: "Our Promise",
			text: "Turn Sales Conversations Into Controlled Revenue Growth",
		},
	],
};
