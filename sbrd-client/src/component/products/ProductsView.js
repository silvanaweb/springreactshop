import React, {
	useEffect,
	useState,
} from "react";

import {
	FaEdit,
	FaEye,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Search from "../common/Search";
import axiosInstance from "../../axiosConfig";

const ProductsView = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();


	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		try {
			const result = await axiosInstance.get(
				"/products",
				{
					validateStatus: () => {
						return true;
					},
				}
			);
			if (result.status === 302) {
				setProducts(result.data);
			}

		} catch (error) {

		}
	};

	return (
		<section>
			<div className="container">
				<div className="row">
					<div className="col">
						<button type="button" class="btn btn-dark" onClick={() => { navigate('/add-products') }}>Add Product</button>
					</div>
					<div className="col">
						<Search
							search={search}
							setSearch={setSearch}
						/>

					</div>
				</div>
			</div>
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Name</th>
						<th>Brand</th>
						<th>Price</th>
						<th>Image</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>

				<tbody className="text-center">
					{products
						.filter((st) =>
							st.name
								.toLowerCase()
								.includes(search)
						)
						.map((product) => {
							const image = product.image
								? `http://localhost:8080/file/download/${product.image}`
								: "/shoe.png";
							return (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>{product.name}</td>
									<td>{product.brand.name}</td>
									<td>{product.price}</td>
									<td>
										<img
											src={image}
											alt="avatar"
											className="img-fluid"
											style={{ width: 150 }}
										/>
									</td>
									<td className="mx-2">
										<Link
											to={`/product-view/${product.id}`}
											className="btn btn-info">
											<FaEye />
										</Link>
									</td>
									<td className="mx-2">
										<Link
											to={`/edit-product/${product.id}`}
											className="btn btn-warning">
											<FaEdit />
										</Link>
									</td>

								</tr>
							)
						})}
				</tbody>
			</table>
		</section>
	);
};

export default ProductsView;
