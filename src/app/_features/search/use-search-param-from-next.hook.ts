import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"

export function useSearchParamFromNext({
	key,
	defaultValue,
	debounced = false
}: {
	key: string;
	defaultValue: string;
	debounced?: boolean
}) {
	const searchParams = useSearchParams();
	const currentValue = searchParams.get(key) ?? defaultValue;
	const pathname = usePathname();
	const router = useRouter();

	const handleValueChange = useDebouncedCallback((value: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (value) newSearchParams.set(key, value);
		else newSearchParams.delete(key);

		router.replace(`${pathname}?${newSearchParams.toString()}`);
	}, debounced ? 300 : 0)


	return {
		currentValue,
		handleValueChange,
	};
}
