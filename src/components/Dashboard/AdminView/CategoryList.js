import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategories, deleteCategory, deleteService } from '../../../actions/categoryActions';

/* Icons */
import { FaPlusCircle } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
// import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

class CategoryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading : props.loading
		};
		this.eachCategory = this.eachCategory.bind(this);
		this.eachService = this.eachService.bind(this);
		this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
	}

	componentDidMount() {
		this.props.getAllCategories();
	}

	handleDeleteService = (e, service_id) => {
		e.stopPropagation();
		e.preventDefault();
		this.props.deleteService(service_id);
	};

	handleDeleteCategory = (e, category_id) => {
		e.stopPropagation();
		e.preventDefault();
		this.props.deleteCategory(category_id);
	};
	eachService(parent, service, i) {
		return (
			<tr key={service._id}>
				<td>
					<span>{service.title}</span>
				</td>
				<td>
					<span>
						<strong>{parent}</strong>
					</span>
				</td>
				<td>
					<span>{service.time} Mins</span>
				</td>
				<td>{service.cost} NIS</td>
				<td>
					<button className="btn btn-sm btn-danger" onClick={(e) => this.handleDeleteService(e, service._id)}>
						<FaTrashAlt />
					</button>
					<button name={service._id} className="btn btn-sm btn-primary mx-2">
						<FaEdit />
					</button>
				</td>
			</tr>
		);
	}

	eachCategory(category, i) {
		return (
			<tr key={i + category._id} className="bg-light">
				<td>
					<span>{category.name}</span>
				</td>
				<td>
					<span>-</span>
				</td>
				<td>-</td>
				<td>-</td>

				<td>
					<button
						className="btn btn-sm btn-danger"
						onClick={(e) => this.handleDeleteCategory(e, category._id)}
					>
						<FaTrashAlt />
					</button>
					<button name={category._id} className="btn btn-sm btn-primary mx-2">
						<FaEdit />
					</button>
				</td>
			</tr>
		);
	}
	render() {
		const { categories } = this.props;
		return (
			<div className="card">
				<div className="card-header">
					<h3 className="card-title">category list</h3>
					<div className="card-options">
						<Link className="btn btn-sm btn-success" to="/category/new-category">
							<FaPlusCircle /> create
						</Link>
					</div>
					{this.props.loading && 'loading'}
				</div>
				<div className="table-responsive">
					<table className="table card-table mb-0 table-vcenter text-nowrap listTable">
						<thead>
							<tr>
								<th>name</th>
								<th>parent</th>
								<th>time</th>
								<th>cost</th>
								<th>managment</th>
							</tr>
						</thead>

						{categories.length > 0 ? (
							categories.map((category, i) => {
								return (
									<tbody key={category._id} className="border-top-0 border-bottom">
										{this.eachCategory(category, i)}
										{category.services.map((service, i) => {
											return this.eachService(category.name, service, i);
										})}
									</tbody>
								);
							})
						) : (
							<tbody>
								<tr>
									<td colSpan="3">no categories to show</td>
								</tr>
							</tbody>
						)}
					</table>
				</div>
			</div>
		);
	}
}

CategoryList.propTypes = {
	getAllCategories : PropTypes.func.isRequired,
	deleteCategory   : PropTypes.func.isRequired,
	categories       : PropTypes.array.isRequired
};
CategoryList.contextTypes = {
	router : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	categories : state.category.categories,
	loading    : state.category.loading
});
export default connect(mapStatetoProps, { getAllCategories, deleteCategory, deleteService })(CategoryList);
