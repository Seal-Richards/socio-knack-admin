import { format } from "date-fns";

export function formatCheckInDate(dateString: string | undefined | null): string {
	if (!dateString) return "No check-in";
	try {
		const dt = new Date(dateString);
		if (Number.isNaN(dt.getTime())) return "Invalid date";
		return format(dt, "MMM d, yyyy | h:mm a");
	} catch (e) {
		return "Invalid date";
	}
}

export function formatDateTime(dateString: string | undefined | null): string {
	if (!dateString) return "N/A";
	try {
		const dt = new Date(dateString);
		if (Number.isNaN(dt.getTime())) return "Invalid date";
		return format(dt, "MMM d, yyyy | h:mm a");
	} catch (e) {
		return "Invalid date";
	}
}
