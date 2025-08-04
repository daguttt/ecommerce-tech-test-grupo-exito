"use client";

import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

const DEFAULT_QUANTITY = 1;

const QUANTITY_OPTIONS = [...Array(10)].map((_, i) => i + 1);

export function QuantitySelect() {
	const [quantity, setQuantity] = useState<number>(DEFAULT_QUANTITY);

	return (
		<div className="flex items-center space-x-2">
			<label htmlFor="quantity" className="font-medium">
				Cantidad:
			</label>
			<Select
				value={quantity.toString()}
				onValueChange={(e) => setQuantity(Number(e))}
			>
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
