import React, {
	useEffect,
	useState,
} from "react";
import { useParams, useNavigate } from 'react-router-dom';

import axiosInstance from "../../axiosConfig";

const ProductPofile = () => {
	const { id } = useParams();
 const navigate = useNavigate();
	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		brand: {},
	});

	useEffect(() => {
		if (product.id != id) {
			loadProduct();
		}
	}, []);

	const loadProduct = async () => {
		const result = await axiosInstance.get(
			`products/${id}`
		);
		console.log('silvana after loading', product)
		setProduct(result.data);

	};
	const image = product.image
	? `http://localhost:8080/file/download/${product.image}`
	: "/shoe.png";
	return (
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src={image}
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>

								<div className="d-flex justify-content-center mt-4 mb-2">
									<button
										type="button"
										className="btn btn-outline-primary"
										onClick={() => { 
											navigate(`/edit-product/${id}`);
										 }
										}>
										Edit
									</button>

								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{product.name}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
										Description
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{product.description}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Brand
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{product.brand.name}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Price
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											£ {product.price}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductPofile;
