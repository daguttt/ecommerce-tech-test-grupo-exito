import z from "zod";

const Rating = z.object({
	rate: z.number(),
	count: z.number(),
});

export const ApiProduct = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	price: z.number(),
	category: z.string(),
	image: z.string(),
	rating: Rating,
});

export const ApiProductCategories = z.array(z.string());

export const ApiProductList = z.array(ApiProduct);

export type ApiProduct = z.infer<typeof ApiProduct>;
