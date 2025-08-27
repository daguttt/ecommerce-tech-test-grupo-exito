import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { fetchProductById } from "../_feature/products.service";
import { AddToCartButton } from "./_feature/add-to-cart-button.component";
import {
	QuantitySelect,
	QuantitySelectWrapper,
} from "./_feature/quantity-select.component";
import { Stars } from "./stars.component";
import { toUrlSearchParams } from "~/lib/to-url-search-params.util";

export default async function ProductDetailPage({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const paramsObj = await params;
	const productId = paramsObj.id;

	const productResult = await fetchProductById(productId);

	if (productResult.isErr()) {
		const error = productResult.error;

		console.error(error);
		if (error.type === "HTTP_ERROR") {
			error.response.status === 404 && notFound();
		}
		if (error.type === "JSON_PARSE_ERROR") {
			notFound();
		}

		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">
					<p className="text-gray-500 text-lg">
						Ocurrió un error al cargar el producto
					</p>
					<Link href={`/products/${paramsObj.id}`}>Reintentar</Link>
				</div>
			</div>
		);
	}

	const product = productResult.value;

	const searchParamObj = toUrlSearchParams(await searchParams);
	const queryQuantity = searchParamObj.get("quantity");
	const quantity = queryQuantity ? Number(queryQuantity) : 1;

	return (
		<div className="container mx-auto px-4 py-8">
			<Link href="/">
				<Button variant="outline" className="mb-6 bg-transparent">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Volver
				</Button>
			</Link>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div className="relative aspect-square">
					<Image
						src={product.image || "/placeholder.svg"}
						alt={product.title}
						fill
						className="rounded-lg object-contain"
					/>
				</div>

				<div className="space-y-6">
					<div>
						<Badge variant="secondary" className="mb-2">
							{product.category.charAt(0).toUpperCase() +
								product.category.slice(1)}
						</Badge>
						<h1 className="mb-4 font-bold text-3xl">{product.title}</h1>

						<div className="mb-4 flex items-center">
							<div className="flex items-center">
								<Stars rating={product.rating.rate} />
							</div>
							<span className="ml-2 text-gray-600">
								{product.rating.rate} ({product.rating.count} reseñas)
							</span>
						</div>

						<p className="mb-6 font-bold text-4xl text-green-600">
							${product.price.toFixed(2)}
						</p>
					</div>

					<div>
						<h3 className="mb-2 font-semibold text-lg">Descripción</h3>
						<p className="text-gray-700 leading-relaxed">
							{product.description}
						</p>
					</div>

					<QuantitySelectWrapper>
						<QuantitySelect />
					</QuantitySelectWrapper>

					<AddToCartButton quantity={quantity} product={product} />
				</div>
			</div>
		</div>
	);
}
