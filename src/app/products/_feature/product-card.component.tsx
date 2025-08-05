"use client";

import type React from "react";

import { useUnit } from "effector-react";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cartItemAdded } from "~/app/_features/shopping-cart/shopping-cart.store";
import type { ApiProduct } from "~/app/products/_feature/products.model";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

interface ProductCardProps {
	product: ApiProduct;
}

export function ProductCard({ product }: ProductCardProps) {
	const addCartItem = useUnit(cartItemAdded);
	return (
		<Card className="group transition-shadow duration-300 hover:shadow-lg">
			<Link href={`/products/${product.id}`}>
				<CardContent className="p-4">
					<div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
						<Image
							src={product.image || "/placeholder.svg"}
							alt={product.title}
							fill
							className="object-contain transition-transform duration-300 group-hover:scale-105"
						/>
					</div>

					<h3 className="mb-2 line-clamp-2 min-h-[2.5rem] font-semibold text-sm">
						{product.title}
					</h3>

					<div className="mb-2 flex items-center">
						<div className="flex items-center">
							<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
							<span className="ml-1 text-gray-600 text-sm">
								{product.rating.rate} ({product.rating.count})
							</span>
						</div>
					</div>

					<p className="font-bold text-green-600 text-lg">
						${product.price.toFixed(2)}
					</p>
				</CardContent>
			</Link>

			<CardFooter className="p-4 pt-0">
				<Button
					className="w-full"
					size="sm"
					onClick={() => addCartItem({ ...product, quantity: 1 })}
				>
					<ShoppingCart className="mr-2 h-4 w-4" />
					Agregar al carrito
				</Button>
			</CardFooter>
		</Card>
	);
}
