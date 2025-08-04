"use client";

import { useUnit } from "effector-react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import Link from "next/link";
import { $total } from "../../_features/shopping-cart/shopping-cart.store";

// **************************************************
// Public API
export { CartSummary };
// **************************************************

function CartSummary() {
	const total = useUnit($total);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Resumen del pedido</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between">
					<span>Subtotal:</span>
					<span>${total.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span>Envío:</span>
					<span>Gratis</span>
				</div>
				<div className="border-t pt-4">
					<div className="flex justify-between font-bold text-lg">
						<span>Total:</span>
						<span>${total.toFixed(2)}</span>
					</div>
				</div>

				<Button asChild className="w-full" size="lg">
					<Link href="/checkout">Proceder al pago</Link>
				</Button>
				<Button asChild className="w-full" variant="outline">
					<Link href="/">Continuar comprando</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
