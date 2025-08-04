import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

import "~/styles/globals.css";
import Footer from "~/app/_features/shared-page-elements/footer.component";
import Header from "~/app/_features/shared-page-elements/header.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tienda de productos",
	description: "Tu tienda online favorita con los mejores productos",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className={inter.className}>
				<div className="flex min-h-screen flex-col">
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
