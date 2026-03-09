import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function OTPVerification({
	onNext,
	onPrev,
}: {
	onNext: () => void;
	onPrev: () => void;
}) {
	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div className="mb-8 text-center">
				<h2 className="text-darkBlue-900 mb-2 text-2xl font-bold">Enter OTP Code</h2>
				<p className="px-8 text-sm text-gray-500">
					Enter the 6-digit code sent to your registered email (g***@company.com)
				</p>
			</div>

			<form
				className="w-full max-w-sm"
				onSubmit={(e) => {
					e.preventDefault();
					toast.success("OTP Verified Successfully!");
					onNext();
				}}
			>
				{/* OTP Input UI Example - Usually we would use Shadcn OTP Input here, mocking standard spacing */}
				<div className="relative mb-6 w-full">
					<Input
						type="text"
						placeholder="X X X O O X"
						className="h-14 border-2 border-gray-200 bg-white text-center text-lg font-bold uppercase tracking-[1em] focus-visible:ring-blue-500"
						maxLength={6}
					/>
				</div>

				<div className="mb-8 text-center">
					<p className="text-sm text-gray-500">
						Didn&apos;t receive a code?{" "}
						<button type="button" className="font-medium text-blue-500 hover:underline">
							Resend OTP Code (15)
						</button>
					</p>
				</div>

				<Button
					type="submit"
					className="text-md mb-4 h-12 w-full bg-blue-500 font-sans font-semibold text-white hover:bg-blue-600"
				>
					Verify
				</Button>

				<button
					type="button"
					onClick={onPrev}
					className="hover:text-darkBlue-900 w-full text-center text-sm font-semibold text-gray-500 transition-colors"
				>
					Back
				</button>
			</form>
		</div>
	);
}
