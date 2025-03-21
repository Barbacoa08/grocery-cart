import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "src/GlobalContext";

import type { User } from "src/types";

import "./Admin.css";

export const Admin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { user, setUser } = useGlobalContext();
	const { allUsers, setAllUsers } = useGlobalContext();

	const fetchUsers = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/user");
			if (!response.ok) {
				throw new Error(`API responded with status: ${response.status}`);
			}
			const result: User[] = await response.json();

			setAllUsers(result);
			if (result.length) {
				setUser(result[0]);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch users");
			console.error("Error fetching users:", err);
		} finally {
			setIsLoading(false);
		}
	}, [setAllUsers, setUser]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<section className="admin-page">
			<h2>Admin Tools</h2>

			<h3>TODO: implement</h3>

			<ul>
				<li>add more inventory (too an upper of individual and total stock)</li>
				<li>remove inventory</li>
				<li>reset inventory</li>
				<li>impersonate any user (show full list of users)</li>
			</ul>

			<h3>Existing Users</h3>

			<div>
				<button type="button" onClick={fetchUsers} disabled={isLoading}>
					Re-get all users
				</button>

				{isLoading && <span className="spacer">Loading...</span>}

				{error && <p className="error">{error}</p>}

				{allUsers.length < 1 && <p>No users</p>}
			</div>

			<ul>
				{allUsers.map((u) => (
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
