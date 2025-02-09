import React, {
	useEffect,
	useState,
} from "react";

import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";
import axiosInstance from "../../axiosConfig";

const EditProduct = () => {
	let navigate = useNavigate();
	const [ imagePreview, setImagePreview ] = useState('');
	const [ image, setImage ] = useState('');

	const { id } = useParams();

	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		brand: {
			id: 1,
			name: "Nike",
		},
	});
	const {
		name,
		description,
		price,
		brand,
	} = product;

	useEffect(() => {
		loadProduct();
	}, []);

	const loadProduct = async () => {
		const result = await axiosInstance.get(
			`/products/${id}`
		);
		setProduct(result.data);
		setImage(result.data.image);
	};

	const handleSelectChange = (e) => {
		const selectedBrandId = e.target.value;
		const selectedBrandName = e.target.options[e.target.selectedIndex].text;
		setProduct({
			...product,
			brand: {
				id: selectedBrandId,
				name: selectedBrandName,
			},
		});
	};

	const handleInputChange = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};
	const [file, setFile] = useState(null);
	const [errors, setErrors] = useState('');

	const handleInputFile = (e) => {
		const fileData = e.target.files[0];
		setImagePreview(URL.createObjectURL(fileData));
		setProduct({
			...product,
			image: fileData.name
		});
		setFile(fileData);
	};

	const saveImage = async () => {
		const formData = new FormData();
		formData.append("file", file);
		try {
			const response = await axiosInstance.post(
				"/file/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return response.data;
		} catch (error) {
			setErrors(error);
		}
	};

	const saveProduct = async (e) => {
		e.preventDefault();

		const form = new FormData();
		form.append("product", product);
		try {
			await axiosInstance.put(
				`/products/update/${id}`,
				product
			)
			if (file) {
				await saveImage();
			}
			setTimeout(() => {
				navigate("/view-products");
			}, 2000);
		} catch (error) {
			setErrors("Falied loading the product");
		}
	};

	return (
		<div className='container mt-5'>
			<div className="col-sm-8 py-2 px-5 offset-2 shadow">
				<h2 className="mt-5"> Edit Product</h2>
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
						<textarea
							className="form-control col-sm-6"
							name="description"
							id="description"
							defaultValue={description}
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
							value={brand.id}
							onChange={(e) => handleSelectChange(e)}
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

					{image && (
						<div className="input-group mb-5">
							<h3>Current Image</h3>
							<div className="w-100">
								<img src={`http://localhost:8080/file/download/${image}`}  height="200"  />
							</div>
						</div>
					)}

					<div className="input-group mb-5">
						<label
							className="input-group-text"
							htmlFor="formFile">
							Update Image 
						</label>&nbsp;&nbsp;
						<input className="form-control" name="file" type="file" id="formFile" onChange={handleInputFile} />
					</div>

					{imagePreview && (
						<div className="input-group mb-5">
							<h3>Image Preview</h3>
							<div className="w-100">
								<img src={imagePreview} alt="preview" height="200" />
							</div>
						</div>
					)}


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
		</div>
	);
};

export default EditProduct;
