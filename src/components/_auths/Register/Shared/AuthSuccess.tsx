import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthSuccess() {
	const router = useRouter();

	return (
		<div className="flex size-full flex-col items-center justify-center py-8">
			<div className="mb-6">
				<Image
					src="/assets/images/success_badge.svg"
					alt="Success Badge"
					width={128}
					height={128}
					priority
				/>
			</div>

			<h2 className="text-darkBlue-900 mb-8 text-2xl font-bold">You are all set!</h2>

			<Button
				onClick={() => router.push("/dashboard")}
				className="text-md h-12 w-full max-w-[250px] bg-blue-500 font-sans font-semibold text-white hover:bg-blue-600"
			>
				Proceed to Dashboard
			</Button>
		</div>
	);
}
