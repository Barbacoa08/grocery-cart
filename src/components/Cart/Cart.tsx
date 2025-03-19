import { useEffect, useState } from "react";
import { useGlobalContext } from "src/GlobalContext";

import type { UserCartItem } from "src/types";

import "./Cart.css";

export const Cart = () => {
	const { user } = useGlobalContext();
	const [cart, setCart] = useState<UserCartItem[]>([]);

	useEffect(() => {
		if (user?.id) {
			fetch(`/api/cart/${user?.id}`).then(async (r) => {
				const result: UserCartItem[] = await r.json();

				setCart(result);
			});
		} else {
			setCart([]);
		}
	}, [user]);

	return (
		<section className="cart-page">
			<h2>Checkout area</h2>

			<section>
				{cart.map((item) => (
					<div key={`checkout-${item.name}`}>
						<span>{`${item.name}: ${item.taken} in Cart`}</span>

						<button
							className="icon-button"
							type="button"
							aria-label={`remove one ${item.name}`}
							// onClick={() => handleReduceFromCart(item.name)}
						>
							➖
						</button>

						<button
							className="icon-button"
							type="button"
							aria-label={`remove all ${item.name}`}
							// onClick={() => handleRemoveFromCart(item.name)}
						>
							❌
						</button>
					</div>
				))}

				<div>
					<h3>{cart.length ? "Complete checkout?" : "No items selected"}</h3>

					<button
						type="button"
						disabled={cart.length === 0}
						// onClick={handleCheckout}
					>
						submit checkout
					</button>
				</div>
			</section>
		</section>
	);
};
