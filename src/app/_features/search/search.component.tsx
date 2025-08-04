"use client";

import { Search } from "lucide-react";
import { type ReactElement, Suspense } from "react";

import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/cn.util";
import { useSearchParamFromNext } from "./use-search-param-from-next.hook";

// **************************************************
// Public API
export { SearchInput, SearchInputWrapper };
// **************************************************

function SearchInput({
	className,
	id = "search",
}: { className?: string; id?: string }) {
	const { currentValue: initialSearch, handleValueChange: handleSearch } =
		useSearchParamFromNext({
			key: "search",
			defaultValue: "",
		});
	return (
		<div className={cn("relative", className)}>
			<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
			<Input
				type="text"
				placeholder="Buscar productos..."
				className="pl-10"
				defaultValue={initialSearch}
				onChange={(e) => handleSearch(e.target.value)}
				id={id}
			/>
		</div>
	);
}

function SearchInputSkeleton() {
	return <Skeleton className="h-10 w-80 min-w-20" />;
}

function SearchInputWrapper({
	children,
}: { children: ReactElement<typeof SearchInput> }) {
	return <Suspense fallback={<SearchInputSkeleton />}>{children}</Suspense>;
}
