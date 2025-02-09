import React, {
	useEffect,
	useState,
} from "react";

import {
	FaEdit,
	FaEye,
	FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import axiosInstance from "../../axiosConfig";

const UsersView = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		loadUsers();
	}, []);

	const loadUsers = async () => {
		try {
			const result = await axiosInstance.get(
				"account/users",
				{
					validateStatus: () => {
						return true;
					},
				}
			);

			if (result.status === 200) {
				setUsers(result.data);
			}
			
		} catch (error) {
			
		}
	};

	const handleDelete = async (id) => {
		await axiosInstance.delete(
			`account/	user/${id}`
		);
		loadUsers();
	};

	return (
		<div className='container mt-5'>
		<section>
			<Search
				placeholder="Search by First Name"
				search={search}
				setSearch={setSearch}
			/>
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Role</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>

				<tbody className="text-center">
					{users
						.filter((st) =>
							st.firstname
								.toLowerCase()
								.includes(search)
						)
						.map((user, index) => (
							<tr key={user.id}>
								<th scope="row" key={index}>
									{index + 1}
								</th>
								<td>{user.firstname}</td>
								<td>{user.lastname}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td className="mx-2">
									<Link
										to={`/user-profile/${user.id}`}
										className="btn btn-info">
										<FaEye />
									</Link>
								</td>
								<td className="mx-2">
									<Link
										to={`/edit-user/${user.id}`}
										className="btn btn-warning">
										<FaEdit />
									</Link>
								</td>
								<td className="mx-2">
									<button
										className="btn btn-danger"
										onClick={() =>
											handleDelete(user.id)
										}>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
		</div>
	);
};

export default UsersView;
