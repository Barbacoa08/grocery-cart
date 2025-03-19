import type { User } from "../../src/types";
import { fetchGraphQL } from "./utils";

const GETUSERSURL = "https://shopping-cart.hasura.app/api/rest/getusers/";

export default async (req: Request) => {
	const { method } = req;
	console.log("method:", method);

	switch (method) {
		case "GET":
			try {
				const resp: User[] = (
					await (
						await fetch(GETUSERSURL, {
							headers: {
								"Content-Type": "application/json",
								"x-hasura-admin-secret":
									process.env.VITE_HASURA_ADMIN_SECRET || "",
							},
						})
					).json()
				).user;

				console.log({ resp });

				return new Response(JSON.stringify(resp || []), {
					headers: {
						"Content-Type": "application/json",
					},
					status: 200,
				});
			} catch (error) {
				console.error("Error fetching users:", error);
				return new Response(
					JSON.stringify({ error: "Failed to fetch users" }),
					{
						headers: {
							"Content-Type": "application/json",
						},
						status: 500,
					},
				);
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

export const config = { path: "/api/users" };
