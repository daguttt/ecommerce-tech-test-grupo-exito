import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export default function NotFound() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="text-center">
				<p className="text-gray-500 text-lg">Producto no encontrado</p>
				<Link href="/">
					<Button className="mt-4">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Volver al inicio
					</Button>
				</Link>
			</div>
		</div>
	);
}
