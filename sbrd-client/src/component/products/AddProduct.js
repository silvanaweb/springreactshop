import { useState } from "react";
import {
	Link,
	useNavigate,
} from "react-router-dom";

import axiosInstance from "../../axiosConfig";
import axios from "axios";

const AddProduct = () => {
	const [errors, setErrors] = useState('');

	let navigate = useNavigate();
	const [file, setFile] = useState(null);
	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		brand: 1,
	});
	const {
		name,
		description,
		price,
		brand,
	} = product;

	const handleInputChange = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};

	const handleInputFile = (e) => {
		setFile(e.target.files[0]);
	};
	
	const saveProduct = async (e) => {
		e.preventDefault();
		console.log('silvana ', product)
		console.log('silvana ', file)
		const form = new FormData();
		form.append(
      "product",
      product
    );
		// form.append("file", file);
		try {
			axiosInstance.post(`/products`, product)
			// axios({
			// 	method: 'post',
			// 	url: 'http://localhost:8080/products',
			// 	data: form,
			// 	headers: {
			// 		Authorization: `Bearer ${localStorage.getItem('token')}`,
			// 		'Content-Type': 'application/json; charset=utf-8',
			// 	},
			// })
		} catch (error) {
			setErrors(error.response.data.error);
			
		}

		// try {
		// 	await axiosInstance.post(
		// 		"/products",
		// 		{
		// 			product, 
		// 			file
		// 		},
		// 	);
		// 	navigate("/view-products");
		// } catch (error) {
		// 	setErrors(error.response.data.error);
		// }
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Add Product</h2>
			<form onSubmit={(e) => saveProduct(e)} encType="multipart/form-data">
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="fristName">
						Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="name"
						id="name"
						required
						value={name}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="description">
						Description
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="description"
						id="description"
						value={description}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="brand">
						Brand
					</label>
					<select
						className="form-control col-sm-6"
						name="brand"
						id="brand"
						required
						value={brand}
						onChange={(e) => handleInputChange(e)}
					>
						<option value="1">NiKe</option>
						<option value="2">Adidas</option>
						<option value="3">Puma</option>
						<option value="4">Reebook</option>
						<option value="5">Fila</option>
					</select>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="price">
						Price
					</label>
					<input
						className="form-control col-sm-6"
						type="number"
						name="price"
						id="price"
						required
						value={price}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
				<label
						className="input-group-text"
						htmlFor="formFile">
						Image 
					</label>&nbsp;&nbsp;
					<input class="form-control" name="file" type="file" id="formFile" onChange={handleInputFile} />
				</div>


				{errors && (
						<div style={{ color: "red" }}>
							<p>{errors}</p>
						</div>
					)}
					
				<div className="row mb-5">
					<div className="col-sm-2">
						<button
							type="submit"
							className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={"/view-products"}
							type="submit"
							className="btn btn-outline-warning btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddProduct;
