"use client";

import { useUnit } from "effector-react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	$cart,
	cartItemQuantityChanged,
	cartItemRemoved,
} from "../../_features/shopping-cart/shopping-cart.store";
import { CartSummary } from "./cart-summary.component";

// **************************************************
// Public API
export { CartPageContent };
// **************************************************

function CartPageContent() {
	const {
		$cart: cart,
		cartItemRemoved: removeItem,
		cartItemQuantityChanged: updateQuantity,
	} = useUnit({ $cart, cartItemRemoved, cartItemQuantityChanged });

	if (cart.items.length === 0) {
		return (
			<div className="py-12 text-center">
				<ShoppingBag className="mx-auto mb-4 h-24 w-24 text-gray-300" />
				<h2 className="mb-4 font-semibold text-2xl">Tu carrito está vacío</h2>
				<p className="mb-6 text-gray-500">
					¡Agrega algunos productos para comenzar!
				</p>
				<Link href="/">
					<Button>Continuar comprando</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<div className="space-y-4 lg:col-span-2">
				{cart.items.map((item) => (
					<Card key={item.id}>
						<CardContent className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								{/* Image */}
								<div className="relative h-20 w-20 shrink-0">
									<Image
										src={item.image || "/placeholder.svg"}
										alt={item.title}
										fill
										className="rounded object-contain"
									/>
								</div>
								<div className="space-y-2">
									{/* Title and price */}
									<div className="text-sm sm:text-base">
										<h3 className="mb-1 font-semibold">{item.title}</h3>
										<p className="font-bold text-green-600">
											${item.price.toFixed(2)}
										</p>
									</div>
									{/* Quantity and remove */}
									<div className="flex flex-wrap items-center gap-4">
										<div className="flex items-center space-x-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													updateQuantity({
														id: item.id,
														quantity: item.quantity - 1,
													})
												}
											>
												<Minus className="h-4 w-4" />
											</Button>
											<span className="w-8 text-center">{item.quantity}</span>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													updateQuantity({
														id: item.id,
														quantity: item.quantity + 1,
													})
												}
											>
												<Plus className="h-4 w-4" />
											</Button>
										</div>
										<div className="flex items-center gap-2">
											<p className="font-bold">
												${(item.price * item.quantity).toFixed(2)}
											</p>
											<Button
												className="md:hidden"
												variant="destructive"
												size="sm"
												onClick={() => removeItem(item.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>
							</div>

							<Button
								className="hidden md:block"
								variant="destructive"
								size="lg"
								onClick={() => removeItem(item.id)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
			<CartSummary />
		</div>
	);
}
