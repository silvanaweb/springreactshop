import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './component/account/AuthContext';

const Home = () => {
	const navigate = useNavigate();
	const { isAutenticated } = useAuth();

	useEffect(() => {
		if (isAutenticated()) {
			navigate('/view-orders');
		}
	}, []);

	return (
		<div className="container py-5">
			<div className="row">
				<div className="col-lg-12">
					<div className=" mb-4">
						<div className="text-center">
							<h2>Welcome to Shoessie Shope</h2>
							<h2>Login to see your orders</h2>
							<div className="d-flex justify-content-center mt-4 mb-2">
								<button
									type="button"
									className="btn btn-outline-primary"
									onClick={() => {
										navigate(`/login`);
									}
									}>
									Login
								</button>

							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default Home;
