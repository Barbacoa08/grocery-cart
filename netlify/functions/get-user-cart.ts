import type { Context } from "@netlify/functions";

const GETUSERSCARTURL =
	"https://shopping-cart.hasura.app/api/rest/getusercart/";

// route: BASEURL/api/cart
// example: GET https://deploy-preview-10--react-vite-base.netlify.app/api/cart
export default async (req: Request, context: Context) => {
	const { params } = context;

	if (req.method === "POST") {
		const { userid } = params;

		try {
			const resp = await (
				await fetch(GETUSERSCARTURL + userid, {
					headers: {
						"Content-Type": "application/json",
						"x-hasura-admin-secret": process.env.VITE_HASURA_ADMIN_SECRET || "",
					},
				})
			).json();

			return new Response(JSON.stringify(resp));
		} catch (error) {
			console.error("Error fetching user cart:", error);
			return new Response(
				JSON.stringify({ error: "Failed to fetch user cart" }),
				{ status: 500 }
			);
		}
	}

	return new Response(
		JSON.stringify({ error: "Method not allowed" }),
		{ status: 405, headers: { "Allow": "POST" } }
	);
};

export const config = { path: "/api/cart" };
