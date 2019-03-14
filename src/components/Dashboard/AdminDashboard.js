import React, { Component } from 'react';

class AdminDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: '',
			categories: [],
			subCategory: ''
		};
	}
	handleChange = (e) => {
		console.log(e.target.name);
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-6">
						<form className=" p-3 border shadow-sm bg-white">
							<p className="text-muted">
								write the name of the category that you want to add then press add
							</p>
							<div className="form-group">
								<label htmlFor="category">Create new category</label>
								<input
									type="text"
									className="form-control"
									name="category"
									placeholder="Ex: Beauty"
									value={this.state.category}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							<button type="submit" className="btn btn-custom w-100">
								Create
							</button>
						</form>
					</div>

					<div className="col-12 col-md-6">
						<form className=" p-3 border shadow-sm bg-white">
							<p className="text-muted">
								select a category then add a sub category with expected time in minutes{' '}
							</p>
							<div className="form-group">
								<label htmlFor="category">select category</label>
								<select className="form-control" name="" id="">
									<option value="1" defaultValue>
										test
									</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="category">new subCategory</label>
								<input
									type="text"
									className="form-control"
									name="category"
									placeholder="Ex: Beauty"
									value={this.state.category}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="category">Time </label>
								<input
									type="number"
									min="10"
									className="form-control"
									name="category"
									placeholder="20(time by minutes)"
									value={this.state.category}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							<button type="submit" className="btn btn-custom w-100 ">
								Add sub category
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AdminDashboard;
