"use client";

import type React from "react";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { SearchInput } from "../search/search.component";

export default function Header() {
	// TODO: Replace with cart itemCount
	const itemCount = 0;

	return (
		<header className="sticky top-0 z-50 bg-white shadow-md">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between gap-1">
					<Link href="/" className="font-bold text-2xl text-red-600">
						Tienda Éxito
					</Link>

					<SearchInput className="w-80 min-w-20 md:w-80" />

					<div className="flex items-center space-x-4">
						<Link href="/cart">
							<Button variant="outline" className="relative bg-transparent">
								<ShoppingCart className="h-5 w-5" />
								{itemCount > 0 && (
									<span className="-top-2 -right-2 absolute flex h-5 w-5 justify-center rounded-full bg-red-600 text-white">
										{itemCount}
									</span>
								)}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
