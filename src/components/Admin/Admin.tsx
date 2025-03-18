import { useState } from "react";
import { useGlobalContext } from "src/GlobalContext";

import type { User } from "src/types";

export const Admin = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { user, setUser } = useGlobalContext();

	const fetchUsers = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/users", { method: "POST" });
			if (!response.ok) {
				throw new Error(`API responded with status: ${response.status}`);
			}
			const result: User[] = await response.json();
			setUsers(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch users");
			console.error("Error fetching users:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section>
			<h2>Admin Tools</h2>

			<h3>TODO: implement</h3>

			<ul>
				<li>add more inventory (too an upper of individual and total stock)</li>
				<li>remove inventory</li>
				<li>reset inventory</li>
				<li>impersonate any user (show full list of users)</li>
			</ul>

			<h3>Existing Users</h3>

			<button type="button" onClick={fetchUsers} disabled={isLoading}>
				{isLoading ? "Loading..." : "Grab all users"}
			</button>
			{error && <p className="error">{error}</p>}

			<ul>
				{users.length < 1 && <li>No users</li>}
				{users.map((u) => (
					<li key={u.id}>
						{u.username}{" "}
						<button
							type="button"
							disabled={u.id === user?.id}
							onClick={() => setUser(u)}
						>
							Use
						</button>
					</li>
				))}
			</ul>
		</section>
	);
};
