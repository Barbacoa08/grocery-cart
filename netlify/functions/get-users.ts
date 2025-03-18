import type { User } from "../../src/types";

const GETUSERSURL = "https://shopping-cart.hasura.app/api/rest/getusers/";

// route: BASEURL/api/cart
// example: GET https://deploy-preview-10--react-vite-base.netlify.app/api/cart
export default async (req: Request) => {
	if (req.method === "POST") {
		try {
			const resp: User[] = (
				await (
					await fetch(GETUSERSURL, {
						headers: {
							"Content-Type": "application/json",
							"x-hasura-admin-secret": process.env.VITE_HASURA_ADMIN_SECRET || "",
						},
					})
				).json()
			).user;

			return new Response(JSON.stringify(resp || []), {
				headers: {
					"Content-Type": "application/json"
				},
				status: 200
			});
		} catch (error) {
			console.error("Error fetching users:", error);
			return new Response(
				JSON.stringify({ error: "Failed to fetch users" }),
				{
					headers: {
						"Content-Type": "application/json"
					},
					status: 500
				}
			);
		}
	}

	return new Response(
		JSON.stringify({ error: "Method not allowed" }),
		{
			headers: {
				"Content-Type": "application/json"
			},
			status: 405
		}
	);
};

export const config = { path: "/api/users" };
