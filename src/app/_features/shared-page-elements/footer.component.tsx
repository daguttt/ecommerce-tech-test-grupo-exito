export default function Footer() {
	return (
		<footer className="mt-12 bg-gray-800 py-8 text-white">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					<div>
						<h3 className="mb-4 font-semibold text-lg">Tienda de productos</h3>
						<p className="text-gray-300">
							Tu tienda online favorita con los mejores productos y precios.
						</p>
					</div>

					<div>
						<h4 className="mb-4 font-semibold text-lg">Categorías</h4>
						<ul className="space-y-2 text-gray-300">
							<li>Electrónicos</li>
							<li>Ropa</li>
							<li>Joyería</li>
							<li>Hogar</li>
						</ul>
					</div>

					<div>
						<h4 className="mb-4 font-semibold text-lg">Ayuda</h4>
						<ul className="space-y-2 text-gray-300">
							<li>Contacto</li>
							<li>Envíos</li>
							<li>Devoluciones</li>
							<li>FAQ</li>
						</ul>
					</div>

					<div>
						<h4 className="mb-4 font-semibold text-lg">Síguenos</h4>
						<ul className="space-y-2 text-gray-300">
							<li>Facebook</li>
							<li>Instagram</li>
							<li>Twitter</li>
							<li>YouTube</li>
						</ul>
					</div>
				</div>

				<div className="mt-8 border-gray-700 border-t pt-8 text-center text-gray-300">
					<p>&copy; 2025 Tienda de productos. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
