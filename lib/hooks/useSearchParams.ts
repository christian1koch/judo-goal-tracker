import { useCallback } from "react";
import {
	useRouter,
	useSearchParams as next_useSearchParams,
} from "next/navigation";

export function useSearchParams() {
	const router = useRouter();
	const searchParams = next_useSearchParams();

	const setSearchParams = useCallback(
		(
			updateFn: (
				previousSearchParams: URLSearchParams
			) => URLSearchParams,
			options?: { replace?: boolean }
		) => {
			const newSearchParams = updateFn(searchParams);

			// This updates the URL state immediately
			if (options?.replace) {
				window.history.replaceState(
					{},
					"",
					`?${newSearchParams.toString()}`
				);
			} else {
				window.history.pushState(
					{},
					"",
					`?${newSearchParams.toString()}`
				);
			}

			// Schedule the router refresh for the next tick to get the server response as well
			setTimeout(() => {
				router.refresh();
			}, 0);
		},
		[router, searchParams]
	);

	return [searchParams, setSearchParams] as const;
}
