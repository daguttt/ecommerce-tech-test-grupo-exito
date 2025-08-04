import { createEffect, createEvent, createStore, sample } from "effector";
import type { ApiProduct } from "~/app/products/_feature";

export interface CartItem extends ApiProduct {
	quantity: number;
}

interface CartState {
	items: CartItem[];
}

export const pageLoaded = createEvent();
export const cartItemAdded = createEvent<ApiProduct>();
export const cartItemRemoved = createEvent<number>();
export const cartItemQuantityChanged = createEvent<{
	id: number;
	quantity: number;
}>();
export const cartCleared = createEvent<void>();

const getCartFx = createEffect(() => {
	const cartItems = JSON.parse(
		localStorage.getItem("cart-items") || "[]",
	) as CartItem[];

	return {
		items: cartItems,
	};
});

const saveCartFx = createEffect((cart: CartItem[]) => {
	console.log("saveCartFx");
	localStorage.setItem("cart-items", JSON.stringify(cart));
});

export const $cart = createStore<CartState>({
	items: [],
})
	.on(getCartFx.doneData, (_initialState, { items }) => {
		return { items };
	})
	.on(cartItemAdded, (state, product) => {
		const foundItem = state.items.find((item) => item.id === product.id);
		if (foundItem) {
			return {
				items: state.items.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				),
			};
		}
		return {
			items: [...state.items, { ...product, quantity: 1 }],
		};
	})
	.on(cartItemRemoved, (state, id) => {
		const foundItem = state.items.find((item) => item.id === id);
		if (foundItem) {
			return {
				items: state.items.filter((item) => item.id !== id),
			};
		}
		throw new Error(`Cart item with id ${id} not found`);
	})
	.on(cartItemQuantityChanged, (state, { id, quantity }) => {
		const foundItem = state.items.find((item) => item.id === id);
		if (foundItem) {
			return {
				items: state.items.map((item) =>
					item.id === id ? { ...item, quantity } : item,
				),
			};
		}
		throw new Error(`Cart item with id ${id} not found`);
	})
	.on(cartCleared, () => ({
		items: [],
	}));

export const $itemCount = $cart.map((state) =>
	state.items.reduce((total, item) => total + item.quantity, 0),
);

export const $total = $cart.map((state) =>
	state.items.reduce((total, item) => total + item.price * item.quantity, 0),
);

sample({
	clock: [cartItemAdded, cartItemRemoved, cartItemQuantityChanged, cartCleared],
	source: $cart,
	fn: (state) => state.items,
	target: saveCartFx,
});

sample({
	source: pageLoaded,
	target: getCartFx,
});
