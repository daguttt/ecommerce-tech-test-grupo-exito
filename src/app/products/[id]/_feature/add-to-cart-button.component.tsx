"use client";

import { useUnit } from "effector-react";
import { ShoppingCart } from "lucide-react";
import { cartItemAdded } from "~/app/_features/shopping-cart/shopping-cart.store";
import type { ApiProduct } from "~/app/products/_feature/products.model";
import { Button } from "~/components/ui/button";

// **************************************************
// Public API
export { AddToCartButton };
// **************************************************

function AddToCartButton({
	quantity,
	product,
}: { quantity: number; product: ApiProduct }) {
	const addCartItem = useUnit(cartItemAdded);
	return (
		<Button
			size="lg"
			className="w-full"
			onClick={() => addCartItem({ ...product, quantity })}
		>
			<ShoppingCart className="mr-2 h-5 w-5" />
			Agregar al carrito
		</Button>
	);
}
