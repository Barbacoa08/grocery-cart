const HasuraGraphQLApiURL = "https://shopping-cart.hasura.app/v1/graphql/";
const headers = {
	"Content-Type": "application/json",
	"x-hasura-admin-secret": process.env.VITE_HASURA_ADMIN_SECRET || "",
};

export const fetchGraphQL = async (
	method: "GET" | "POST" | "PUT" | "DELETE",
	operationName: string,
	query: string,
	variables: Record<string, string> | undefined,
) => {
	const result = await fetch(HasuraGraphQLApiURL, {
		headers,
		method,
		body: JSON.stringify({
			query,
			variables,
			operationName,
		}),
	});

	return await result.json();
};
