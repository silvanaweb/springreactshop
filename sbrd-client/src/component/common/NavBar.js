import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../account/AuthContext";

const NavBar = () => {
	const { isAutenticated, isAdmin } = useAuth();
	const logout = useAuth().logout;
	const navigate = useNavigate();
	const location = useLocation()

	useEffect(() => {
		if (!isAutenticated() && location.pathname !== "/login") {	
			navigate("/login");
		}
	});

	const onLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"}>
					Shoessie Shop
				</Link>
				{isAutenticated() ? (
					<Link className="navbar-brand" onClick={onLogout}>
						Logout
					</Link>
				) : (
					<Link className="navbar-brand" to={"/login"}>
						Login
					</Link>
				)}

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarNav">
					<ul className="navbar-nav">
						{isAdmin() && (
							<li className="nav-item">
								<Link
									className="nav-link active"
									aria-current="page"
									to={"/view-products"}>
									View Products
								</Link>
							</li>
						)}

						{isAutenticated() && (
						<li className="nav-item">
							<Link
								className="nav-link active"
								aria-current="page"
								to={"/view-orders"}>
								View Orders
							</Link>
						</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
