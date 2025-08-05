"use client";

import { Suspense } from "react";
import { useSearchParamFromNext } from "~/app/_features/search/use-search-param-from-next.hook";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";

// **************************************************
// Public API
export { QuantitySelect, QuantitySelectWrapper };
// **************************************************

const DEFAULT_QUANTITY = "1";
const QUANTITY_OPTIONS = [...Array(10)].map((_, i) => i + 1);

function QuantitySelect() {
	const { currentValue: quantity, handleValueChange: setQuantity } =
		useSearchParamFromNext({ key: "quantity", defaultValue: DEFAULT_QUANTITY });

	return (
		<div className="flex items-center space-x-2">
			<label htmlFor="quantity" className="font-medium">
				Cantidad:
			</label>
			<Select value={quantity} onValueChange={(e) => setQuantity(e)}>
				<SelectTrigger className="rounded border px-3 py-1">
					<SelectValue placeholder="Cantidad" />
				</SelectTrigger>
				<SelectContent>
					{QUANTITY_OPTIONS.map((quantityNum) => (
						<SelectItem key={quantityNum} value={quantityNum.toString()}>
							{quantityNum}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

function QuantitySelectSkeleton() {
	return <Skeleton className="h-8 w-24" />;
}

function QuantitySelectWrapper({
	children,
}: { children: React.ReactElement<typeof QuantitySelect> }) {
	return <Suspense fallback={<QuantitySelectSkeleton />}>{children}</Suspense>;
}
