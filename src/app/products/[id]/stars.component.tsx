import { Star } from "lucide-react";

const START_NUMBERS = [1, 2, 3, 4, 5];
export function Stars({ rating }: { rating: number }) {
	return START_NUMBERS.map((starNum) => (
		<Star
			key={starNum}
			className={`h-5 w-5 ${
				starNum <= Math.floor(rating)
					? "fill-yellow-400 text-yellow-400"
					: "text-gray-300"
			}`}
		/>
	));
}
