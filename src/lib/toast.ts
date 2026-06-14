// src/lib/toast.ts

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastEvent {
	type: ToastType;
	title: string;
	message: string;
}

export interface ToastOptions {
	title?: string;
	description?: string;
	duration?: number;
}

type Listener = (event: ToastEvent | null) => void;
const listeners = new Set<Listener>();

function trigger(type: ToastType, mainText: string, options?: unknown) {
	let title = "";
	let message = mainText;

	if (options && typeof options === "object") {
		const optRecord = options as Record<string, unknown>;
		if (typeof optRecord.description === "string") {
			title = mainText;
			message = optRecord.description;
		} else if (typeof optRecord.title === "string") {
			title = optRecord.title;
		}
	}

	if (!title) {
		switch (type) {
			case "success":
				title = "Success";
				break;
			case "error":
				title = "Error occurred";
				break;
			case "warning":
				title = "Warning";
				break;
			case "info":
			default:
				title = "Notification";
				break;
		}
	}

	listeners.forEach((l) => l({ type, title, message }));
}

export const toast = {
	success(message: string, options?: unknown) {
		trigger("success", message, options);
	},

	error(message: string, options?: unknown) {
		trigger("error", message, options);
	},

	info(message: string, options?: unknown) {
		trigger("info", message, options);
	},

	warning(message: string, options?: unknown) {
		trigger("warning", message, options);
	},

	loading(message: string, options?: unknown) {
		let title = "Please Wait";
		if (options && typeof options === "object") {
			const optRecord = options as Record<string, unknown>;
			if (typeof optRecord.title === "string") {
				title = optRecord.title;
			}
		}
		listeners.forEach((l) => l({ type: "info", title, message }));
		return "loading-toast-id";
	},

	dismiss(_toastId?: string | number) {
		// Clear the active toast/modal
		listeners.forEach((l) => l(null));
	},

	subscribe(listener: Listener) {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	},
};
