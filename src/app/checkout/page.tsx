import { CheckoutForm, CheckoutSummary } from "./_feature";

export default function CheckoutPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-8 font-bold text-3xl">Finalizar Compra</h1>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<CheckoutForm />

				<CheckoutSummary />
			</div>
		</div>
	);
}
