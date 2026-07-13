export type PlanKey = "starter" | "growth" | "business" | "enterprise";

export const planFeatures: Record<PlanKey, string[]> = {
	starter: ["Basic reporting", "Territory management", "Visit tracking"],
	growth: ["Advanced analytics", "Priority support", "Unlimited territories"],
	business: ["Custom branding", "API access", "Manager roles"],
	enterprise: ["Dedicated account manager", "SLA", "Custom integrations"],
};

export const pricingPlans = [
	{
		key: "starter" as PlanKey,
		theme: "green" as const,
		title: "Starter Plan",
		subtitle: "1-50 employees",
		price: "₦4,000",
		setupFee: "₦50,000",
		buttonText: "Start 14-Day Free Trial",
	},
	{
		key: "growth" as PlanKey,
		theme: "blue" as const,
		title: "Growth Plan",
		subtitle: "51-100 employees",
		price: "₦4,000",
		setupFee: "₦100,000",
		buttonText: "Start 14-Day Free Trial",
	},
	{
		key: "business" as PlanKey,
		theme: "purple" as const,
		title: "Business Plan",
		subtitle: "101-200 employees",
		price: "₦4,000",
		setupFee: "₦200,000",
		buttonText: "Start 14-Day Free Trial",
	},
	{
		key: "enterprise" as PlanKey,
		theme: "orange" as const,
		title: "Enterprise Plan",
		subtitle: "200+ employees",
		isCustom: true,
		buttonText: "Contact Sales",
	},
];
