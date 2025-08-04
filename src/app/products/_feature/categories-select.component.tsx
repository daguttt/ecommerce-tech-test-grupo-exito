"use client";

import { useSearchParamFromNext } from "~/app/_features/search/use-search-param-from-next.hook";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

export function CategoriesSelect({ categories }: { categories: string[] }) {
	const { currentValue, handleValueChange: handleCategoryChange } =
		useSearchParamFromNext({
			key: "category",
			defaultValue: "all",
		});

	return (
		<Select value={currentValue} onValueChange={handleCategoryChange}>
			<SelectTrigger className="w-full md:w-48">
				<SelectValue placeholder="Categoría" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">Todas las categorías</SelectItem>
				{categories.map((category) => (
					<SelectItem key={category} value={category}>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
