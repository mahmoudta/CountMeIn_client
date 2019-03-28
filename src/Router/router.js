import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/globalComponents/Header';
import Navbar from '../components/globalComponents/Navbar';

import Landing from '../components/Landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';
// import NewDebatePage from "../Components/NewDebatePage";
// import MyDebatesPage from "../Components/MyDebatesPage";
// import MyNotification from "../Components/MyNotification";

import requireAuth from '../utils/requireAuth';
import CreateCategory from '../components/Dashboard/AdminView/CreateCategory';
import CreateBusiness from '../components/Business/CreateBusiness';
import ClientView from '../components/Business/ClientView';

const ReactRouter = () => {
	return (
		<React.Fragment>
			<div className="wrapper">
				<Header />

				<section id="main">
					<Navbar />
					<section id="content">
						<Route exact path="/" component={Landing} />
						<Route path="/dashboard" component={requireAuth(Dashboard)} />
						<Route path="/category/new-category" component={requireAuth(CreateCategory)} />
						<Route path="/business/create" component={requireAuth(CreateBusiness)} />
						<Route path="/business/view" component={requireAuth(ClientView)} />
					</section>
				</section>
			</div>
		</React.Fragment>
	);
};
export default ReactRouter;
