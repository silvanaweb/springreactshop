import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Home from "./Home";
import ProductsView from "./component/products/ProductsView";
import NavBar from "./component/common/NavBar";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import AddProduct from "./component/products/AddProduct";
import EditProduct from "./component/products/EditProduct";
import ProductView from "./component/products/ProductView";
import Login from "./component/account/Login";
import LoginSuccess from "./component/account/LoginSuccess";
import { AuthProvider } from "./component/account/AuthContext";
import ProtectedRoute from "./component/account/ProtectedRoute";
import UserRoute from "./component/account/UserRoute";
import OrdersView from "./component/orders/OdersView";

function App() {
	return (
		<main className="container mt-5">
			<AuthProvider>
				<BrowserRouter>
					<NavBar />
						<Routes>
							<Route
								exact
								path="/"
								element={<Home />}></Route>
							<Route
								exact
								path="/view-products"
								element={<ProtectedRoute><ProductsView /></ProtectedRoute>}></Route>
							<Route
								exact
								path="/view-orders"
								element={<UserRoute><OrdersView /></UserRoute>}></Route>
							<Route
								exact
								path="/add-products"
								element={<AddProduct />}></Route>
							<Route
								exact
								path="/edit-product/:id"
								element={<EditProduct />}></Route>
							<Route
								exact
								path="/product-view/:id"
								element={<ProductView />}></Route>
							<Route
								exact
								path="/login"
								element={<Login />}></Route>
							<Route
								exact
								path="/login-success"
								element={<LoginSuccess />}></Route>
						</Routes>
				</BrowserRouter>
			</AuthProvider>
		</main>
	);
}

export default App;
