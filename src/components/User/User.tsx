import { useCallback, useState } from "react";
import { useGlobalContext } from "src/GlobalContext";

const inputId = "username-input-id";

export const User = () => {
	const { username, setUsername } = useGlobalContext();

	const [usernameInput, setUsernameInput] = useState(username);
	const updateUsername = useCallback(
		(newUsername: string) => {
			// TODO: get updated username
			// compare with existsing username, create new one if necessary, else pull existing data
			// update inventory based on new/existing username

			setUsername(newUsername);
		},
		[setUsername],
	);

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
