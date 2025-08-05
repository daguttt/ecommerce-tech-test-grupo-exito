"use server";

import { redirect } from "next/navigation";

import { CheckoutForm } from "./checkout-form.model";

export type CheckoutFormState = Awaited<ReturnType<typeof purchaseProducts>> & {
	data: CheckoutForm;
};

export async function purchaseProducts(
	_previousFormState: {
		errors: Record<string, string[]>;
		success: boolean;
		data: CheckoutForm;
	},
	formData: FormData,
) {
	const rawCheckoutForm = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		address: formData.get("address") as string,
		city: formData.get("city") as string,
		zipCode: formData.get("zipCode") as string,
		cardNumber: formData.get("cardNumber") as string,
		expiryDate: formData.get("expiryDate") as string,
		cvv: formData.get("cvv") as string,
	};
	const parsedCheckoutForm = CheckoutForm.safeParse(rawCheckoutForm);

	if (!parsedCheckoutForm.success) {
		return {
			data: rawCheckoutForm,
			errors: parsedCheckoutForm.error.flatten().fieldErrors,
			success: false,
		};
	}

	redirect("/checkout/success");
}
