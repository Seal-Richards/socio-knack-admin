export default function StepProgressBar({
	currentStep,
	totalSteps,
	title,
}: {
	currentStep: number;
	totalSteps: number;
	title: string;
}) {
	// Generate array for mapping steps
	const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

	return (
		<div className="mb-8 w-full">
			<h2 className="text-darkBlue-900 mb-1 text-2xl font-bold tracking-tight">
				Step {currentStep}: {title}
			</h2>
			<p className="mb-4 text-sm font-medium text-gray-500">
				Set {currentStep} of {totalSteps}: {title}
			</p>
			<div className="flex w-full gap-2">
				{steps.map((step) => (
					<div key={step} className="h-1 flex-1 overflow-hidden rounded-full bg-blue-100">
						{/* Inner fill logic */}
						<div
							className={`h-full transition-all duration-300 ${step <= currentStep ? "bg-blue-500" : "bg-transparent"}`}
							style={{ width: step <= currentStep ? "100%" : "0%" }}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
