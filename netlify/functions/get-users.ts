import type { User } from "../../src/types";

const GETUSERSURL = "https://shopping-cart.hasura.app/api/rest/getusers/";

// route: BASEURL/api/cart
// example: GET https://deploy-preview-10--react-vite-base.netlify.app/api/cart
export default async (req: Request) => {
	if (req.method === "POST") {
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

		return new Response(JSON.stringify(resp || []));
	}

	return new Response("BAD");
};

export const config = { path: "/api/users" };
