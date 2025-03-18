export const Cart = () => {
	return (
		<section>
			<h2>Current Shopping Cart data</h2>

			<button
				type="button"
				onClick={() =>
					fetch("/api/cart", { method: "POST" }).then(async (r) => {
						const result = await r.json();

						// TODO: use this
						console.error(result);
					})
				}
			>
				Grab my cart data
			</button>
		</section>
	);
};
