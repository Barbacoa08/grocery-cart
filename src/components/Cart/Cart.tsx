import { useGlobalContext } from "src/GlobalContext";

export const Cart = () => {
	const { user } = useGlobalContext();

	return (
		<section>
			<h2>Current Shopping Cart data</h2>

			<button
				type="button"
				onClick={() =>
					fetch(`/api/cart/${user?.id}`, { method: "POST" }).then(async (r) => {
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
