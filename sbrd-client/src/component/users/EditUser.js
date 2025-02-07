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

const EditUser = () => {
	let navigate = useNavigate();

	const { id } = useParams();
	const [pwd, setPwd] = useState("");

	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		email: "",
		role: "USER",
		username: "",
		password: "",
	});
	
	useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		const result = await axiosInstance.get(
			`account/user/${id}`
		);
		if (result.status === 200) {
			setUser(result.data);
		}
	};

	const handlePasswordChange = (e) => {
		setPwd(e.target.value);
	};

	const handleInputChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const updateUser = async (e) => {
		e.preventDefault();
		// add password to user object if it is not empty
		if (user.password !== "" && pwd !== "") {
			user.password = pwd;
		}
		await axiosInstance.put(
			`account/user/${id}`,
			user
		);
		navigate("/view-users");
	};

	return (
		<div className='container mt-5'>

		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit User</h2>
			<form onSubmit={(e) => updateUser(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="fristName">
						First Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="firstname"
						id="firstname"
						required
						value={user.firstname}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="lastname">
						Last Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="lastname"
						id="lastname"
						required
						value={user.lastname}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="email">
						Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="email"
						id="email"
						required
						value={user.email}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="username">
						Username
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="username"
						id="username"
						readOnly
						value={user.username}
					
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="password">
						Password
					</label>
					<input
						className="form-control col-sm-6"
						type="password"
						name="password"
						id="password"
						value={pwd}
						onChange={(e) => handlePasswordChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="department">
						Role
					</label>
					<select
							className="form-control col-sm-6"
							name="role"
							id="role"
							required
							value={user.role}
							onChange={(e) => handleInputChange(e)}
						>
							<option value="USER">USER</option>
							<option value="ADMIN">ADMIN</option>
						</select>
				</div>

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
							to={"/view-users"}
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

export default EditUser;
