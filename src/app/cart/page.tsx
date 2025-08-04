import { CartPageContent } from "./_feature/cart-page-content.component";

export default function CartPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-8 font-bold text-3xl">Carrito de Compras</h1>

			<CartPageContent />
		</div>
	);
}
