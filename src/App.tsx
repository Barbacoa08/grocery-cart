import { useState } from "react";
import viteLogo from "/vite.svg";

import reactLogo from "./assets/react.svg";

import "./App.css";

export const App = () => {
	const [count, setCount] = useState(0);

	return (
		<main>
			<div>
				<a href="https://vite.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>

				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>

			<h1>Vite + React</h1>

			<div className="card">
				<button type="button" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>

				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>

			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</main>
	);
};

// <section>
// <h2>Hasura endpoints</h2>

// <button
// 	type="button"
// 	onClick={() =>
// 		fetch("https://shopping-cart.hasura.app/api/rest/getstartingdata", {
// 			headers: {
// 				"Content-Type": "application/json",
// 				"x-hasura-admin-secret": import.meta.env
// 					.VITE_HASURA_ADMIN_SECRET, // TODO: DO NOT put this on the client, put it on the server you fool!
// 			},
// 		}).then(async (r) => {
// 			const result = (await r.json()).cart[0].items.replaceAll(
// 				"'",
// 				'"',
// 			);

// 			console.log(result);
// 			console.log(typeof result);
// 			console.log(JSON.parse(result));
// 			// const items = JSON.parse(result);
// 			// console.log("parsed items", items);

// 			setStartingData(result);
// 		})
// 	}
// >
// 	Grab starting data
// </button>
// </section>
