import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../../../actions/categoryActions';

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
			loading: props.loading
		};
		this.eachCategory = this.eachCategory.bind(this);
		this.eachSubCategory = this.eachSubCategory.bind(this);
		this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
	}
	Alert = async (redirect, text) => {
		Swal.fire({
			title: redirect ? 'Success' : 'Error!',
			text: text,
			type: redirect ? 'success' : 'error',
			focusConfirm: false,
			confirmButtonText: redirect ? 'done' : 'back',
			confirmButtonColor: redirect ? '#5eba00' : '#495057'
		}).then((res) => {
			if (redirect) this.context.router.history.push('/dashboard');
		});
	};
	componentDidMount() {
		this.props.getAllCategories();
	}

	handleDeleteCategory = (e, category_id) => {
		e.stopPropagation();
		e.preventDefault();
		console.log(category_id);
		this.props.deleteCategory(category_id);
	};
	eachSubCategory(parent, category, i) {
		return (
			<tr>
				<td>
					<span>category.sub</span>
				</td>
				<td>
					<span>parent</span>
				</td>
				<td>
					{/* <button value={category._id} className="btn btn-sm btn-danger">
						<FaTrashAlt />
					</button>
					<button value={category._id} className="btn btn-sm btn-primary mx-2">
						<FaEdit />
					</button> */}
				</td>
			</tr>
		);
	}

	eachCategory(category, i) {
		return (
			<tr key={i + category._id}>
				<td>
					<span>{category.name}</span>
				</td>
				<td>
					<span>{category.services.length > 0 ? category.services.length : '-'}</span>
				</td>

				<td>
					<button
						name={category._id}
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
								<th>managment</th>
							</tr>
						</thead>
						<tbody>
							{categories.length > 0 ? (
								categories.map(this.eachCategory)
							) : (
								<tr>
									<td colSpan="3">no categories to show</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

CategoryList.propTypes = {
	getAllCategories: PropTypes.func.isRequired,
	deleteCategory: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired
};
CategoryList.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	categories: state.category.categories,
	loading: state.category.loading
});
export default connect(mapStatetoProps, { getAllCategories, deleteCategory })(CategoryList);
