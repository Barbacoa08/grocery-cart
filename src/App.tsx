import { useState } from "react";

import type { User as UserType } from "./types";

import { Admin, Cart, Inventory, User } from "./components";
import { GlobalContextProvider } from "./GlobalContext";

import "./App.css";

export const App = () => {
	const [user, setUser] = useState<UserType | undefined>();

	return (
		<GlobalContextProvider value={{ user, setUser }}>
			<header className="site-header">Shared Grocery Cart</header>

			<main>
				<h1>Your Shopping Cart</h1>

				<User />

				<Inventory />

				<Cart />

				<Admin />
			</main>
		</GlobalContextProvider>
	);
};
