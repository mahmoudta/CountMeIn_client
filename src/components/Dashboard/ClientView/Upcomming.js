import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API } from '../../../consts';
import SweetAlert from 'react-bootstrap-sweetalert';

// core components
import withStyles from '@material-ui/core/styles/withStyles';
//import grey from '@material-ui/core/colors/grey';

import GridContainer from '../../Interface/Grid/GridContainer.jsx';
import GridItem from '../../Interface/Grid/GridItem.jsx';
import Table from '../../Interface/Table/Table.jsx';
import Button from '../../Interface/CustomButtons/Button';
import Card from '../../Interface/Card/Card.jsx';
import CardBody from '../../Interface/Card/CardBody.jsx';
import CardIcon from '../../Interface/Card/CardIcon.jsx';
import CardHeader from '../../Interface/Card/CardHeader.jsx';
import extendedTablesStyle from '../../Interface/Assets/extendedTablesStyle';
import sweetAlertStyle from '../../Interface/Assets/sweetAlertStyle.jsx';

// icons
import Assignment from '@material-ui/icons/Assignment';
import Person from '@material-ui/icons/Person';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
//import Axios from 'axios';
// import Check from '@material-ui/icons/Check';
// import Remove from '@material-ui/icons/Remove';
// import Add from '@material-ui/icons/Add';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

//const grey1 = grey['700'];

class Upcomming extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: [],
			tableContent: [],
			alert: null,
			show: false
		};
		//	this.handleToggle = this.handleToggle.bind(this);
	}

	hideAlert() {
		this.setState({
			alert: null
		});
	}

	showbusiness(id) {
		this.setState({
			alert: (
				<SweetAlert
					style={{ display: 'block', marginTop: '-100px' }}
					title="Business Profile"
					onConfirm={() => this.hideAlert()}
					onCancel={() => this.hideAlert()}
					confirmBtnCssClass={this.props.classes.button + ' ' + this.props.classes.success}
				>
					Business Id: <b>{id}</b>
				</SweetAlert>
			)
		});
	}

	editAppointment(id) {
		console.log(id);
	}
	deleteAppointment(id) {
		this.setState({
			alert: (
				<SweetAlert
					warning
					style={{ display: 'block', marginTop: '-100px' }}
					title="Are you sure?"
					onConfirm={() => this.successDelete()}
					onCancel={() => this.cancelDetele()}
					confirmBtnCssClass={this.props.classes.button + ' ' + this.props.classes.success}
					cancelBtnCssClass={this.props.classes.button + ' ' + this.props.classes.danger}
					confirmBtnText="Yes, delete it!"
					cancelBtnText="Cancel"
					showCancel
				>
					This will delete your appointment!
				</SweetAlert>
			)
		});
	}
	successDelete() {
		this.setState({
			alert: (
				<SweetAlert
					success
					style={{ display: 'block', marginTop: '-100px' }}
					title="Deleted!"
					onConfirm={() => this.hideAlert()}
					onCancel={() => this.hideAlert()}
					confirmBtnCssClass={this.props.classes.button + ' ' + this.props.classes.success}
				>
					Your appointment has been deleted, dont worry about the business we will notify them for you
				</SweetAlert>
			)
		});
	}
	cancelDetele() {
		this.setState({
			alert: (
				<SweetAlert
					danger
					style={{ display: 'block', marginTop: '-100px' }}
					title="Cancelled"
					onConfirm={() => this.hideAlert()}
					onCancel={() => this.hideAlert()}
					confirmBtnCssClass={this.props.classes.button + ' ' + this.props.classes.success}
				>
					Nothing happend :)
				</SweetAlert>
			)
		});
	}

	componentDidMount() {
		//const tableContent = 0;
		const { classes } = this.props;
		const id = this.props.Id;

		axios.get(`${API}/appointments/getClientsAppointments/${id}`).then((response) => {
			console.log(response.data.QueryRes);
			// this.setState({ appointments: response.data.QueryRes });
			// this.setState({Appointments : dsa});
			console.log(response.data.QueryRes);
			response.data.QueryRes.map((appointment, i) => {
				const fillButtons = [
					{ color: 'info', icon: Person, function: this.showbusiness.bind(this, appointment.business_id) },
					{ color: 'success', icon: Edit, function: this.editAppointment.bind(this, appointment._id) },
					{ color: 'danger', icon: Close, function: this.deleteAppointment.bind(this, appointment._id) }
				].map((prop, key) => {
					return (
						<Button color={prop.color} className={classes.actionButton} key={key} onClick={prop.function}>
							<prop.icon className={classes.icon} />
						</Button>
					);
				});

				this.setState((prevState) => ({
					tableContent: [
						...prevState.tableContent,
						[
							i + 1,
							appointment.business_id,
							appointment.time.date,
							appointment.time.date,
							appointment.porpouses,
							fillButtons
						]
					]
				}));
			});
		});
	}

	render() {
		//console.log('tableContent', this.state.tableContent);
		//console.log(this.props.Id);
		const { classes } = this.props;
		return (
			<div>
				{this.state.alert}
				<GridContainer>
					<GridItem xs={12}>
						<Card>
							<CardHeader color="success" icon>
								<CardIcon color="success">
									<Assignment />
								</CardIcon>
								<h4 className={classes.cardIconTitle}>Upcomming Appointments</h4>
							</CardHeader>
							<CardBody>
								<Table
									tableHead={[ '#', 'Business', 'Start Time', 'Date', 'Purpose', 'Actions' ]}
									tableData={this.state.tableContent}
									customCellClasses={[ classes.center, classes.right, classes.right ]}
									customClassesForCells={[ 0, 4, 5 ]}
									customHeadCellClasses={[ classes.center, classes.right, classes.right ]}
									customHeadClassesForCells={[ 0, 4, 5 ]}
								/>
							</CardBody>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

//export default withStyles(extendedTablesStyle)(Upcomming);
const mapStateToProps = (state) => ({
	Id: state.auth.user.sub
});

export default connect(mapStateToProps)(withStyles(extendedTablesStyle, sweetAlertStyle)(Upcomming));
