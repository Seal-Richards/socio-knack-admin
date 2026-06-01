import { Suspense } from "react";
import Register from "@/components/_auths/Register";

export default function RegisterPage() {
	return (
		<Suspense
			fallback={
				<div className="bg-darkBlue-900 flex min-h-screen w-full items-center justify-center text-white">
					<div className="flex flex-col items-center gap-4">
						<div className="size-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
						<p className="text-gray-300">Loading registration details...</p>
					</div>
				</div>
			}
		>
			<Register />
		</Suspense>
	);
}
