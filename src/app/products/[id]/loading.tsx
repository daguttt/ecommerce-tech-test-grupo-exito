export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex h-64 items-center justify-center">
				<div className="h-32 w-32 animate-spin rounded-full border-red-600 border-t-2 border-b-2" />
			</div>
		</div>
	);
}
