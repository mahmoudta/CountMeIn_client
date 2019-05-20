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
import Schedule from '../components/Business/Schedule/Schedule';
import NewAppointment from '../components/Business/NewAppointment';

import BnewAppointment from '../components/Business/Schedule/BnewAppointment';
import EditBusiness from '../components/Business/EditBusiness/EditBusiness';

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
								<Route exact path="/business/pages/create" component={requireAuth(CreateBusiness)} />
								<Route path="/business/view/:id" component={requireAuth(ClientView)} />
								<Route excat path="/business/pages/mySchedule/:id" component={requireAuth(Schedule)} />
								<Route
									path="/business/mySchedule/new-appointment"
									component={requireAuth(BnewAppointment)}
								/>
								<Route path="/business/edit" component={requireAuth(EditBusiness)} />

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
