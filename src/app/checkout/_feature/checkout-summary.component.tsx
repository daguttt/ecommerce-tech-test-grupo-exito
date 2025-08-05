"use client";

import { useUnit } from "effector-react";

import {
	$cart,
	$total,
} from "~/app/_features/shopping-cart/shopping-cart.store";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function CheckoutSummary() {
	const [cart, total] = useUnit([$cart, $total]);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Resumen del Pedido</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{cart.items.map((item) => (
					<div key={item.id} className="flex justify-between">
						<span>
							{item.title} x{item.quantity}
						</span>
						<span>${(item.price * item.quantity).toFixed(2)}</span>
					</div>
				))}
				<div className="border-t pt-4">
					<div className="flex justify-between font-bold text-lg">
						<span>Total:</span>
						<span>${total.toFixed(2)}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
