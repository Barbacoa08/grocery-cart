import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "src/GlobalContext";

import type { User as UserType } from "src/types";

import "./Inventory.css";

const inputId = "username-input-id";

export const Inventory = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { user, setUser } = useGlobalContext();
	const { allUsers } = useGlobalContext();

	const [usernameInput, setUsernameInput] = useState(user?.username || "");

	const updateUsername = useCallback(
		async (newUsername: string) => {
			const existingUser = allUsers.find((u) => u.username === newUsername);
			if (existingUser) {
				setUser(existingUser);
			} else {
				setIsLoading(true);
				setError(null);
				try {
					const response = await fetch(`/api/user/${newUsername}`, {
						method: "POST",
					});

					if (!response.ok) {
						throw new Error(`API responded with status: ${response.status}`);
					}

					const updatedUser: UserType = await response.json();
					setUser(updatedUser);
				} catch (err) {
					setError(err instanceof Error ? err.message : "Failed to set user");
					console.error("Error fetching users:", err);
				} finally {
					setIsLoading(false);
					// TODO: refresh allUsers
					// TODO: update inventory based on new/existing username
				}
			}
		},
		[setUser, allUsers],
	);

	useEffect(() => {
		setUsernameInput(user?.username || "");
	}, [user]);

	return (
		<div className="inventory-page">
			<section className="username-input-container">
				<label className="input-label" htmlFor={inputId}>
					Username:{" "}
				</label>

				<input
					id={inputId}
					className="input-text"
					value={usernameInput}
					onChange={(e) => setUsernameInput(e.currentTarget.value)}
				/>

				<button
					type="button"
					className="input-button"
					onClick={() => updateUsername(usernameInput)}
					disabled={
						user?.username === usernameInput || usernameInput.length < 3
					}
				>
					Set Username
				</button>

				{isLoading && <span className="spacer">Loading...</span>}

				{error && <p className="error">{error}</p>}

				{user === undefined && (
					<div>
						Become admin:{" "}
						<button type="button" onClick={() => updateUsername("barbajoe")}>
							barbajoe
						</button>
					</div>
				)}
			</section>

			<section>
				<h2>Available Inventory</h2>

				<p>TODO: show available inventory</p>

				<ul>
					<li>allow adding items to cart</li>

					<li>add/remove items from cart</li>

					<li>
						must update withing a reasonable time frame when another user
						checksout (not when they add items to their cart, but when they BUY
						the item(s))
					</li>
				</ul>
			</section>
		</div>
	);
};
