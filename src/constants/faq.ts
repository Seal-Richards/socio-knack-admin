export interface FAQItem {
	question: string;
	answer: string;
}

export const faqs: FAQItem[] = [
	{
		question: "How does the AI detect fraud?",
		answer: "Our system matches real-time GPS coordinates of the agent check-in against the pre-defined geofencing boundaries of the assigned territory. It identifies patterns of GPS spoofing, anomalies in reporting times, and flags discrepancies instantly on the supervisor dashboard.",
	},
	{
		question: "What are geofencing boundary checks?",
		answer: "Geofencing uses GeoJSON polygon boundaries coordinates to establish the operational area of a territory. When agents log visits or complete tasks, their device's location is verified against these boundaries to guarantee they are physically on-site.",
	},
	{
		question: "How are agent commission payouts automated?",
		answer: "Payout logic is based on customizable rules (flat rate or percentage per sale). Once a supervisor approves a visit report, the calculated incentive is transferred instantly from the business's secure escrow wallet into the agent's mobile wallet.",
	},
	{
		question: "Is there a setup fee for subscription plans?",
		answer: "Yes, subscription plans include a one-time setup fee: ₦30,000 for the Starter Plan, ₦100,000 for the Growth Plan, and ₦200,000 for the Business Plan. These fees cover configuration, onboarding support, and escrow wallet initialization.",
	},
	{
		question: "How does the 14-day free trial work?",
		answer: "You can start a 14-day free trial on any of our standard plans. You will have full access to all features to test the platform. At the end of the trial, you can choose to upgrade or subscribe to keep your workspace operational.",
	},
	{
		question: "How do agents get onboarded?",
		answer: "Agents get onboarded by downloading the SocioKnack App on the Apple App Store or Google Play Store. Once the app is downloaded, they can register, connect with their organization, and start receiving assigned territories and tasks immediately.",
	},
];
