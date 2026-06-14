import { toast } from "@/lib/toast";

export function useToast() {
	return {
		success: (message: string, options?: Record<string, any>) =>
			toast.success(message, options),

		error: (message: string, options?: Record<string, any>) => toast.error(message, options),

		info: (message: string, options?: Record<string, any>) => toast.info(message, options),

		warning: (message: string, options?: Record<string, any>) =>
			toast.warning(message, options),
	};
}
