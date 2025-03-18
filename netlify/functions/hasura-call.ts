import type { Config, Context } from "@netlify/functions";

const GETUSERSCARTURL =
	"https://shopping-cart.hasura.app/api/rest/getusercart/";
const GETUSERSURL = "https://shopping-cart.hasura.app/api/rest/getusers/";

// route: BASEURL/api/cart
// example: GET https://deploy-preview-10--react-vite-base.netlify.app/api/cart
export default async (req: Request, context: Context) => {
	const { params } = context;

	if (req.method === "POST") {
		// const { city, country } = params;

		const resp = await (
			await fetch(GETUSERSURL, {
				headers: {
					"Content-Type": "application/json",
					"x-hasura-admin-secret": process.env.VITE_HASURA_ADMIN_SECRET || "",
				},
			})
		).json();

		return new Response(JSON.stringify(resp));
	}

	return new Response("BAD");
};

export const config = { path: "/api/cart" };
