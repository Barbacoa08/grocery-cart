import { useState } from "react";
import { useGlobalContext } from "src/GlobalContext";

import type { User } from "src/types";

export const Admin = () => {
	const [users, setUsers] = useState<User[]>([]);
	const { user, setUser } = useGlobalContext();

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

			<button
				type="button"
				onClick={() =>
					fetch("/api/users", { method: "POST" }).then(async (r) => {
						const result: User[] = await r.json();
						setUsers(result);
					})
				}
			>
				Grab all users
			</button>
		</section>
	);
};
