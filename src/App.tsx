import { useState } from "react";

import { Admin, Cart, Inventory, User } from "./components";
import { GlobalContextProvider } from "./GlobalContext";

import "./App.css";

export const App = () => {
	const [username, setUsername] = useState("Unknown Name");

	return (
		<GlobalContextProvider value={{ username, setUsername }}>
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
