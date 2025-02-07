import React, {
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router-dom";

import axiosInstance from "../../axiosConfig";

const UserPofile = () => {
	const { id } = useParams();

	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		department: "",
	});

	useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		try {
			const result = await axiosInstance.get(
				`account/user/${id}`
			);
			if (result.status === 200) {
				setUser(result.data);
			}
			
		} catch (error) {
			console.error(error);
		}
	};

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
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								<h5 className="my-3">
									{`${user.firstname} ${user.lastname}`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary">
										Call
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1">
										Message
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
											First Nmae
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{user.firstname}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Last Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{user.lastname}
										</p>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											User Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{user.username}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{user.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Role
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{user.role}
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

export default UserPofile;
