import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/globalComponents/Header';
import Navbar from '../components/globalComponents/Navbar';

import Landing from '../components/Landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';

import requireAuth from '../utils/requireAuth';
import CreateCategory from '../components/Dashboard/AdminView/CreateCategory';
// import CreateBusiness from '../components/Business/CreateBusiness';
import ClientView from '../components/Business/ClientView';
import Schedule from '../components/Business/Schedule/Schedule';
import NewAppointment from '../components/Business/NewAppointment';

import BnewAppointment from '../components/Business/Schedule/BnewAppointment';
import BusinessCD from '../components/Business/BusinessCD/BusinessCD';

import FlashMessage from '../components/FlashMessages/FlashMessage';
import Businesses from '../components/Businesses/Businesses';

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
								<FlashMessage />
								<Route exact path="/" component={Landing} />
								{/* <Route exact path="/" render=({}})=>{ */}

								<Route path="/dashboard" component={requireAuth(Dashboard)} />
								<Route path="/businesses" component={requireAuth(Businesses)} />
								<Route path="/category/new-category" component={requireAuth(CreateCategory)} />
								<Route exact path="/business/pages/create" component={requireAuth(BusinessCD)} />
								<Route path="/business/view/:id" component={requireAuth(ClientView)} />
								<Route excat path="/business/pages/mySchedule/:id" component={requireAuth(Schedule)} />
								<Route
									path="/business/mySchedule/new-appointment"
									component={requireAuth(BnewAppointment)}
								/>
								<Route path="/business/edit" component={requireAuth(BusinessCD)} />
								{/* route related to new appointment button on client view */}
								<Route path="/business/new-appointment/:id" component={requireAuth(NewAppointment)} />
							</section>
						</section>
					</section>
				</section>
			</div>
		</React.Fragment>
	);
};

export default ReactRouter;
