import { useState } from "react";

import type { User as UserType } from "./types";

import { GlobalContextProvider } from "./GlobalContext";
import { Admin, Cart, Inventory } from "./components";

import "./App.css";

const adminusername = "barbajoe";

export const App = () => {
	const [user, setUser] = useState<UserType | undefined>();
	const [allUsers, setAllUsers] = useState<UserType[]>([]);

	return (
		<GlobalContextProvider value={{ user, setUser, allUsers, setAllUsers }}>
			<header className="site-header">Shared Grocery Cart</header>

			<main>
				<h1>Your Shopping Cart</h1>

				<Inventory />

				<Cart />

				{user?.username === adminusername && <Admin />}
			</main>
		</GlobalContextProvider>
	);
};
