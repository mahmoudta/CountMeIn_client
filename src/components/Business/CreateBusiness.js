import React, { Component } from 'react';

class CreateBusiness extends Component {
	render() {
		return (
			<div className="container">
				<div className="col-12 col-md-5 mx-auto">
					<form action="">
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Email address</label>
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default CreateBusiness;
