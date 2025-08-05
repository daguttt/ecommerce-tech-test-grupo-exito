"use client";

import { useUnit } from "effector-react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { cartCleared } from "~/app/_features/shopping-cart/shopping-cart.store";

import { Button } from "~/components/ui/button";

export default function CheckoutSuccessPage() {
	const clearCart = useUnit(cartCleared);

	useEffect(() => {
		clearCart();
	}, [clearCart]);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="py-12 text-center">
				<CheckCircle className="mx-auto mb-6 h-24 w-24 text-green-500" />
				<h1 className="mb-4 font-bold text-3xl">¡Compra Exitosa!</h1>
				<p className="mb-8 text-gray-600">
					Tu pedido ha sido procesado correctamente. Recibirás un email de
					confirmación pronto.
				</p>
				<div className="space-x-4">
					<Link href="/">
						<Button>Continuar comprando</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
