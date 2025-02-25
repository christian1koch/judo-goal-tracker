import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getURL = () => {
	let url =
		process?.env?.VERCEL_PROJECT_PRODUCTION_URL ?? // Automatically set by Vercel.
		process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
		"http://localhost:3000/";
	// Make sure to include `https://` when not localhost.
	url = url.startsWith("http") ? url : `https://${url}`;
	// Make sure to include a trailing `/`.
	url = url.endsWith("/") ? url : `${url}/`;
	return url;
};
