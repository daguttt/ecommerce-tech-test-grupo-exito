import Link from "next/link";
import { env } from "~/env";

import { toUrlSearchParams } from "~/lib/to-url-search-params.util";
import {
	SearchInput,
	SearchInputWrapper,
} from "~/app/_features/search/search.component";

import {
	CategoriesSelect,
	ProductCard,
	fetchProductCategories,
	fetchProducts,
} from "./_feature";

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const productsResult = await fetchProducts();

	if (productsResult.isErr()) {
		console.error(productsResult.error);
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">
					<p className="text-gray-500 text-lg">
						Ocurrió un error al cargar los productos
					</p>
					<Link href="/products">Reintentar</Link>
				</div>
			</div>
		);
	}

	const searchParamsObj = toUrlSearchParams(await searchParams);
	const searchQuery = searchParamsObj.get("search");
	const selectedCategory = searchParamsObj.get("category") ?? "all";

	const products = productsResult.value;
	const filteredProducts = (() => {
		let filtered = products;

		if (searchQuery) {
			filtered = filtered.filter(
				(product) =>
					product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.description.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		if (selectedCategory !== "all") {
			filtered = filtered.filter(
				(product) => product.category === selectedCategory,
			);
		}

		return filtered;
	})();

	const categoriesResult = await fetchProductCategories();

	categoriesResult.orTee((err) => {
		if (env.NODE_ENV === "development") throw err;
		console.error(err);
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="mb-6 font-bold text-3xl">Nuestros Productos</h1>

				<div className="mb-6 flex flex-col gap-4 md:flex-row">
					<SearchInputWrapper>
						<SearchInput id="main-search" className="flex-1" />
					</SearchInputWrapper>
					{categoriesResult.isOk() && (
						<CategoriesSelect categories={categoriesResult.value} />
					)}
				</div>
			</div>

			{filteredProducts.length === 0 ? (
				<div className="py-12 text-center">
					<p className="text-gray-500 text-lg">No se encontraron productos</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
}
