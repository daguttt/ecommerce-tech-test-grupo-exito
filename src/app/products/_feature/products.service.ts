import { fetchApi } from "~/app/_features/api/fetch-api.util";
import {
	ApiProduct,
	ApiProductCategories,
	ApiProductList,
} from "./products.model";

export function fetchProducts(options?: {
	throwOnError?: boolean;
	requestInit?: RequestInit;
}) {
	return fetchApi({
		path: "/products",
		schema: ApiProductList,
		throwOnError: options?.throwOnError,
		requestInit: options?.requestInit,
	});
}

export function fetchProductById(
	id: string,
	options?: { throwOnError?: boolean; requestInit?: RequestInit },
) {
	return fetchApi({
		path: `/products/${id}`,
		schema: ApiProduct,
		throwOnError: options?.throwOnError,
		requestInit: options?.requestInit,
	});
}

export function fetchProductCategories(options?: {
	throwOnError?: boolean;
	requestInit?: RequestInit;
}) {
	return fetchApi({
		path: "/products/categories",
		schema: ApiProductCategories,
		throwOnError: options?.throwOnError,
		requestInit: options?.requestInit,
	});
}
