"use client";

import { useUnit } from "effector-react";
import { useActionState } from "react";
import { $total } from "~/app/_features/shopping-cart/shopping-cart.store";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
	type CheckoutFormState,
	purchaseProducts,
} from "./purchase-product.action";

const initialCheckoutFormState = {
	data: {
		name: "",
		email: "",
		address: "",
		city: "",
		zipCode: "",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
	},
	errors: {
		name: [],
		email: [],
		address: [],
		city: [],
		zipCode: [],
		cardNumber: [],
		expiryDate: [],
		cvv: [],
	},
	success: false,
} satisfies CheckoutFormState;

export function CheckoutForm() {
	const total = useUnit($total);

	const [state, formAction, pending] = useActionState(
		purchaseProducts,
		initialCheckoutFormState,
	);

	return (
		<form action={formAction} className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Información Personal</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="name">Nombre completo</Label>
						<Input
							id="name"
							name="name"
							required
							defaultValue={state.data.name}
						/>
						{state.errors.name && state.errors.name.length > 0 && (
							<p className="text-red-500 text-xs">
								{state.errors.name.join(", ")}
							</p>
						)}{" "}
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							required
							aria-invalid={(state.errors.email?.length ?? 0) > 0}
							defaultValue={state.data.email}
						/>
						{state.errors.email && state.errors.email.length > 0 && (
							<p className="text-red-500 text-xs">
								{state.errors.email.join(", ")}
							</p>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Dirección de Envío</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="address">Dirección</Label>
						<Input
							id="address"
							name="address"
							required
							aria-invalid={(state.errors.address?.length ?? 0) > 0}
							defaultValue={state.data.address}
						/>
						{state.errors.address && state.errors.address.length > 0 && (
							<p className="text-red-500 text-xs">
								{state.errors.address.join(", ")}
							</p>
						)}
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="city">Ciudad</Label>
							<Input
								id="city"
								name="city"
								required
								aria-invalid={(state.errors.city?.length ?? 0) > 0}
								defaultValue={state.data.city}
							/>
							{state.errors.city && state.errors.city.length > 0 && (
								<p className="text-red-500 text-xs">
									{state.errors.city.join(", ")}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="zipCode">Código Postal</Label>
							<Input
								id="zipCode"
								name="zipCode"
								required
								aria-invalid={(state.errors.zipCode?.length ?? 0) > 0}
								defaultValue={state.data.zipCode}
							/>
							{state.errors.zipCode && state.errors.zipCode.length > 0 && (
								<p className="text-red-500 text-xs">
									{state.errors.zipCode.join(", ")}
								</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Información de Pago</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="cardNumber">Número de Tarjeta</Label>
						<Input
							id="cardNumber"
							name="cardNumber"
							placeholder="1234 5678 9012 3456"
							required
							aria-invalid={(state.errors.cardNumber?.length ?? 0) > 0}
							defaultValue={state.data.cardNumber}
						/>
						{state.errors.cardNumber && state.errors.cardNumber.length > 0 && (
							<p className="text-red-500 text-xs">
								{state.errors.cardNumber.join(", ")}
							</p>
						)}
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
							<Input
								id="expiryDate"
								name="expiryDate"
								placeholder="MM/YY"
								required
								aria-invalid={(state.errors.expiryDate?.length ?? 0) > 0}
								defaultValue={state.data.expiryDate}
							/>
							{state.errors.expiryDate &&
								state.errors.expiryDate.length > 0 && (
									<p className="text-red-500 text-xs">
										{state.errors.expiryDate.join(", ")}
									</p>
								)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="cvv">CVV</Label>
							<Input
								id="cvv"
								name="cvv"
								placeholder="123"
								required
								aria-invalid={(state.errors.cvv?.length ?? 0) > 0}
								defaultValue={state.data.cvv}
							/>
							{state.errors.cvv && state.errors.cvv.length > 0 && (
								<p className="text-red-500 text-xs">
									{state.errors.cvv.join(", ")}
								</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Button type="submit" className="w-full" size="lg" disabled={pending}>
				{pending ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
			</Button>
		</form>
	);
}
