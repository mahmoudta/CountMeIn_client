import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/globalComponents/Header';
import Navbar from '../components/globalComponents/Navbar';

import Landing from '../components/Landing/Landing';
import Dashboard from '../components/Dashboard/Dashboard';

import requireAuth from '../utils/requireAuth';
import CreateCategory from '../components/Dashboard/AdminView/CreateCategory';
// import CreateBusiness from '../components/Business/CreateBusiness';
import Schedule from '../components/Business/Schedule/Schedule';
import NewAppointment from '../components/Business/NewAppointment';

import BusinessCD from '../components/Business/BusinessCD/BusinessCD';

import FlashMessage from '../components/FlashMessages/FlashMessage';
import Businesses from '../components/Businesses/Businesses';
import BusinessProfile from '../components/Business/Profile/BusinessProfile';
import SmartSettings from '../components/Business/Schedule/SmartSettings';
import BappointmentReview from '../components/Business/Schedule/BappointmentReview';
import ReviewsMain from '../components/Reviews/ReviewsMain';
import StatisticsMain from '../components/Business/Statistics/StatisticsMain';

import SignUpForm from '../components/Landing/SignUpForm/SignUpForm';

// import ClientView from '../components/Business/ClientView';
// import HeatmapChart from '../components/Business/Statistics/AppointmentsStatsMain';
import ReviewForm from '../components/globalComponents/ReviewForm.jsx';
import NewAppointmentContainer from '../components/Business/NewAppointment/NewAppointmentContainer';
import SetRemider from '../components/Business/SetRemider';

const ReactRouter = () => {
	return (
		<React.Fragment>
			<div className="wrapper">
				<Header />

				<section id="main">
					<Navbar />
					<section id="content">
						<Route path="/SignUp" component={SignUpForm} />
						<Route exact path="/" component={Landing} />
						<section className="vbox">
							{/* <section className="scrollable padder"> */}
							<section className="scrollable">
								<FlashMessage />

								{/* <Route exact path="/" render=({}})=>{ */}

								<Route exact path="/dashboard" component={requireAuth(Dashboard)} />
								<Route path="/businesses" component={requireAuth(Businesses)} />
								<Route path="/appointments-review" component={requireAuth(ReviewsMain)} />
								<Route path="/category/new-category" component={requireAuth(CreateCategory)} />
								<Route path="/business/pages/create" component={requireAuth(BusinessCD)} />
								<Route exact path="/business/view/:id" component={requireAuth(BusinessProfile)} />
								<Route
									exact
									path="/business/advanced/smart-algorithms-settings"
									component={requireAuth(SmartSettings)}
								/>

								<Route path="/business/setreminder/:id" component={requireAuth(SetRemider)} />
								<Route
									path="/business/appointment-review/:appointment_id-:page"
									component={requireAuth(BappointmentReview)}
								/>

								<Route excat path="/business/pages/mySchedule" component={requireAuth(Schedule)} />
								<Route path="/business/edit" component={requireAuth(BusinessCD)} />
								{/* route related to new appointment button on client view */}
								<Route path="/business/new-appointment/:id" component={requireAuth(NewAppointmentContainer)} />
								{/* <Route
									path="/business/new/new-appointment/:id"
									component={requireAuth(NewAppointmentContainer)}
								/> */}
								<Route path="/SignUp" component={SignUpForm} />
								<Route
									exact
									path="/sms/CustomerReview/:appointment_id"
									component={requireAuth(ReviewForm)}
								/>
								<Route path="/ReviewForm" component={ReviewForm} />
								<Route path="/Search" component={Businesses} />


								{/* Statistics */}
								<Route path="/insights" component={requireAuth(StatisticsMain)} />
							</section>
						</section>
					</section>
				</section>
			</div>
		</React.Fragment>
	);
};

export default ReactRouter;
