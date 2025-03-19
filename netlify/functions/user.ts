import type { Context } from "@netlify/functions";
import type { User } from "../../src/types";
import { fetchGraphQL } from "./utils";

export default async (req: Request, context: Context) => {
	const { method } = req;
	const { params } = context;

	switch (method) {
		case "GET":
			try {
				return new Response(JSON.stringify(await getAllUsers()), {
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

		case "POST": {
			const username = decodeURI(params.username);

			const allUsers = await getAllUsers();
			const existingUser = allUsers.find((u) => u.username === username);
			if (existingUser) {
				return new Response(JSON.stringify(existingUser), { status: 201 });
			}

			const variables = {
				username,
			};
			const addUserQuery = `
        mutation addUser($username: String = "") {
          insert_user(objects: {username: $username}) {
            affected_rows
            returning {
              id
              username
            }
          }
        }
      `;

			const { errors, data } = await fetchGraphQL(
				"POST",
				"addUser",
				addUserQuery,
				variables,
			);

			if (errors) {
				console.error("Error adding user:", username, errors);
				return new Response(
					JSON.stringify({ error: "Failed to create user." }),
					{ status: 500 },
				);
			}
			if (data.insert_user.affected_rows !== 1) {
				console.error(
					"Error adding user, unexpected result.",
					username,
					errors,
					data,
				);
				return new Response(
					JSON.stringify({ error: "Error adding user, unexpected result." }),
					{ status: 500 },
				);
			}

			const newUser: User = {
				id: data.insert_user.returning[0].id,
				username: data.insert_user.returning[0].username,
			};
			return new Response(JSON.stringify(newUser), { status: 201 });
		}

		case "PUT":
			return new Response(JSON.stringify({ error: "Method not implemented" }), {
				headers: {
					"Content-Type": "application/json",
				},
				status: 404,
			});

		case "DELETE":
			return new Response(JSON.stringify({ error: "Method not implemented" }), {
				headers: {
					"Content-Type": "application/json",
				},
				status: 404,
			});
	}

	console.error("Unknown method requested: ", req.method);
	return new Response(JSON.stringify({ error: "Method not allowed" }), {
		headers: {
			"Content-Type": "application/json",
		},
		status: 405,
	});
};

export const config = { path: ["/api/user/:username", "/api/user"] };

const GETUSERSURL = "https://shopping-cart.hasura.app/api/rest/getusers/";
const getAllUsers = async (): Promise<User[]> =>
	(
		await (
			await fetch(GETUSERSURL, {
				headers: {
					"Content-Type": "application/json",
					"x-hasura-admin-secret": process.env.VITE_HASURA_ADMIN_SECRET || "",
				},
			})
		).json()
	).user || [];
