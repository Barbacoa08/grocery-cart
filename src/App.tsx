import "./App.css";

export const App = () => {
	return (
		<>
			<header className="site-header">Shared Grocery Cart</header>

			<main>
				<h1>Your Shopping Cart</h1>

				<section>
					<h2>User Info</h2>

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

				<section>
					<h2>Admin Tools</h2>

					<p>TODO: implement</p>

					<ul>
						<li>
							add more inventory (too an upper of individual and total stock)
						</li>
						<li>remove inventory</li>
						<li>reset inventory</li>
						<li>impersonate any user (show full list of users)</li>
					</ul>
				</section>

				<section>
					<h2>Available Inventory</h2>

					<p>TODO: show available inventory</p>

					<ul>
						<li>allow adding items to cart</li>
						<li>add/remove items from cart</li>
					</ul>
				</section>

				<section>
					<h2>Current Shopping Cart data</h2>

					<button
						type="button"
						onClick={() =>
							fetch("/api/cart", { method: "POST" }).then(async (r) => {
								const result = await r.json();
								console.log(result);
							})
						}
					>
						Grab starting data
					</button>
				</section>
			</main>
		</>
	);
};
