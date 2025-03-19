import type { Context } from "@netlify/functions";
import { fetchGraphQL } from "./utils";
import type { UserCartItem } from "../../src/types";

interface DBCartResponse {
	inventory_items: DBInventoryItems;
	quantity: number;
}
interface DBInventoryItems {
	id: string;
	name: string;
	quantity: number;
	type: string;
}

export default async (req: Request, context: Context) => {
	const { method } = req;
	const { params } = context;

	switch (method) {
		case "GET": {
			const { userid } = params;

			if (!userid) {
				return new Response(
					JSON.stringify({ error: "Missing userid parameter" }),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			try {
				const variables = {
					userid,
				};
				const getCartQuery = `
					query getCart($userid: uuid) {
						cart(where: {user: {_eq: $userid}}) {
							quantity
							inventory_items {
								id
								name
								quantity
								type
							}
						}
					}
				`;
				const { errors, data } = await fetchGraphQL(
					"POST",
					"getCart",
					getCartQuery,
					variables,
				);

				if (errors) {
					console.error("Error getting cart for userid:", userid, errors);
					return new Response(
						JSON.stringify({ error: "Failed to get cart." }),
						{ status: 500 },
					);
				}

				const cart: DBCartResponse[] = data.cart;
				const resp: UserCartItem[] = cart.map(
					(item) =>
						({
							id: item.inventory_items.id,
							name: item.inventory_items.name,
							type: item.inventory_items.type,
							taken: item.quantity,
							available: item.inventory_items.quantity,
						}) as UserCartItem,
				);

				return new Response(JSON.stringify(resp));
			} catch (error) {
				console.error("Error fetching user cart:", error);
				return new Response(
					JSON.stringify({ error: "Failed to fetch user cart" }),
					{ status: 500 },
				);
			}
		}
	}

	console.error("Unknown method requested: ", req.method);
	return new Response(JSON.stringify({ error: "Method not allowed" }), {
		headers: {
			"Content-Type": "application/json",
		},
		status: 405,
	});
};

export const config = { path: "/api/cart/:userid" };
