import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "src/GlobalContext";

import type { User as UserType } from "src/types";

const inputId = "username-input-id";
const randomUsername = "random user number 8";

export const User = () => {
	const { user, setUser } = useGlobalContext();

	const [usernameInput, setUsernameInput] = useState(
		user?.username || randomUsername,
	);
	const updateUsername = useCallback(
		async (newUsername: string) => {
			// TODO: get updated username
			// compare with existsing username, create new one if necessary, else pull existing data
			// update inventory based on new/existing username

			// setIsLoading(true);
			// setError(null);
			try {
				const response = await fetch(`/api/user/${newUsername}`, {
					method: "POST",
				});

				if (!response.ok) {
					throw new Error(`API responded with status: ${response.status}`);
				}

				const updatedUser: UserType = await response.json();
				console.log({ updatedUser });
				setUser(updatedUser);
			} catch (err) {
				// setError(err instanceof Error ? err.message : "Failed to fetch users");
				console.error("Error fetching users:", err);
			} finally {
				// setIsLoading(false);
			}
		},
		[setUser],
	);

	useEffect(() => {
		setUsernameInput(user?.username || randomUsername);
	}, [user]);

	return (
		<section>
			<h2>My Info</h2>

			<section>
				<label htmlFor={inputId}>Username: </label>

				<input
					id={inputId}
					value={usernameInput}
					onChange={(e) => setUsernameInput(e.currentTarget.value)}
				/>

				<button type="button" onClick={() => updateUsername(usernameInput)}>
					Update Username
				</button>
			</section>

			<p>TODO: implement</p>

			<ul>
				<li>show user's username and allow them to update it</li>
				<li>DO ALLOW multiple sessions to use the same username</li>
				<li>query for existing user</li>
				<li>if this user exists, pull their data</li>
				<li>
					if this user DOES NOT exist, create new user when users submits
					username, or adds any item to their cart (make up random name)
				</li>
			</ul>
		</section>
	);
};
