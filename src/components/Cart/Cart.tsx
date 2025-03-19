import { useEffect, useState } from "react";
import { useGlobalContext } from "src/GlobalContext";

import type { UserCartItem } from "src/types";

export const Cart = () => {
	const { user } = useGlobalContext();
	const [cart, setCart] = useState<UserCartItem[]>([]);

	useEffect(() => {
		fetch(`/api/cart/${user?.id}`).then(async (r) => {
			const result: UserCartItem[] = await r.json();

			setCart(result);
		});
	}, [user]);

	return (
		<section>
			<h2>Current Shopping Cart data</h2>

			<section>
				{cart.length === 0 && <div>Nothing in your cart... yet!</div>}

				{cart.map((item) => (
					<div key={item.id}>
						<span>{item.name}</span>
						<span>{item.taken}</span>
					</div>
				))}
			</section>
		</section>
	);
};
