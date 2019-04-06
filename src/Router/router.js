import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/globalComponents/Header';
import Navbar from '../components/globalComponents/Navbar';

import Landing from '../components/Landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';

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
						<section className="vbox">
							{/* <section className="scrollable padder"> */}
							<section className="scrollable">
								<Route exact path="/" component={Landing} />
								<Route path="/dashboard" component={requireAuth(Dashboard)} />
								<Route path="/category/new-category" component={requireAuth(CreateCategory)} />
								<Route exact path="/business/create" component={requireAuth(CreateBusiness)} />
								<Route path="/business/:id" component={requireAuth(ClientView)} />
							</section>
						</section>
					</section>
				</section>
			</div>
		</React.Fragment>
	);
};
export default ReactRouter;
