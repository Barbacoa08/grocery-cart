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
		(newUsername: string) => {
			// TODO: get updated username
			// compare with existsing username, create new one if necessary, else pull existing data
			// update inventory based on new/existing username

			const updatedUser: UserType = {
				id: "0",
				username: newUsername,
			};
			setUser(updatedUser); // BUG: needs to be updated to be a proper User
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
