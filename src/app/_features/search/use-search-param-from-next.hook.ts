import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchParamFromNext({
	key,
	defaultValue,
}: {
	key: string;
	defaultValue: string;
}) {
	const searchParams = useSearchParams();
	const currentValue = searchParams.get(key) ?? defaultValue;
	const pathname = usePathname();
	const router = useRouter();

	const handleValueChange = (value: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (value) newSearchParams.set(key, value);
		else newSearchParams.delete(key);

		router.replace(`${pathname}?${newSearchParams.toString()}`);
	};

	return {
		currentValue,
		handleValueChange,
	};
}
