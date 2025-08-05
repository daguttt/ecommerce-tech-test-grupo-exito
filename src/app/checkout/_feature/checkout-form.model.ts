import { z } from "zod";

export const CheckoutForm = z.object({
	name: z
		.string()
		.min(3, { message: "Nombre debe tener al menos 3 caracteres" }),
	email: z.string().email({ message: "Email debe ser válido" }),
	address: z
		.string()
		.min(3, { message: "Dirección debe tener al menos 3 caracteres" }),
	city: z
		.string()
		.min(3, { message: "Ciudad debe tener al menos 3 caracteres" }),
	zipCode: z
		.string()
		.length(6, { message: "Código postal debe tener 6 caracteres" }),
	cardNumber: z
		.string()
		.length(19, { message: "Número de tarjeta debe tener 19 caracteres" }),
	expiryDate: z
		.string()
		.length(5, { message: "Fecha de vencimiento debe tener 5 caracteres" }),
	cvv: z.string().length(3, { message: "CVV debe tener 3 caracteres" }),
});

export type CheckoutForm = z.infer<typeof CheckoutForm>;
