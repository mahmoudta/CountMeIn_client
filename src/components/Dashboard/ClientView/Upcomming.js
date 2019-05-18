import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { API } from "../../../consts";
import SweetAlert from "react-bootstrap-sweetalert";
import PropTypes from "prop-types";

// core components
import withStyles from "@material-ui/core/styles/withStyles";
//import grey from '@material-ui/core/colors/grey';

import GridContainer from "../../Interface/Grid/GridContainer.jsx";
import GridItem from "../../Interface/Grid/GridItem.jsx";
import Table from "../../Interface/Table/Table.jsx";
import Button from "../../Interface/CustomButtons/Button";
import Card from "../../Interface/Card/Card.jsx";
import CardBody from "../../Interface/Card/CardBody.jsx";
import CardIcon from "../../Interface/Card/CardIcon.jsx";
import CardHeader from "../../Interface/Card/CardHeader.jsx";
import extendedTablesStyle from "../../Interface/Assets/extendedTablesStyle";
import sweetAlertStyle from "../../Interface/Assets/sweetAlertStyle.jsx";
import userProfileStyles from "../../Interface/Assets/userProfileStyles";
import CardAvatar from "../../Interface/Card/CardAvatar.jsx";
import avatar from "../../Interface/marc.jpg";

// icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
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

  showbusiness(id, name) {
    const { classes } = this.props;

    this.setState({
      alert: (
        <GridContainer>
          <SweetAlert
            style={{
              display: "block",
              marginTop: "-230px",
              paddingTop: " 30px"
            }}
            title=""
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
          >
            <GridItem xs={12} sm={12} md={12}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={avatar} alt="..." />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <Button color="secondary" round>
                    Follow
                  </Button>
                  <h4 className={classes.cardTitle}>{name}</h4>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Optio sunt veniam libero ut iste? Inventore, aspernatur aut
                    repellendus corporis voluptas consequatur,
                  </p>
                </CardBody>
                <h6 className={classes.cardCategory}>{id}</h6>
              </Card>
            </GridItem>
          </SweetAlert>
        </GridContainer>
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
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(id)}
          onCancel={() => this.cancelDetele()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, Delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          This will Delete your appointment!
        </SweetAlert>
      )
    });
  }
  successDelete(id) {
    axios
      .post(`${API}/appointments/deleteAppointment/`, {
        appointmentId: id
      })
      .then(response => {
        //	this.setState({ dates: response.data });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {});

    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Deleted!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Your appointment has been deleted, dont worry about the business we
          will notify them for you
        </SweetAlert>
      )
    });
  }

  cancelDetele() {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
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

    axios.get(`${API}/users/getUpcommingAppointments`).then(response => {
      //console.log(response.data.QueryRes);
      // this.setState({ appointments: response.data.QueryRes });
      // this.setState({Appointments : dsa});

      console.log(response);

      response.data.map(appointment => {
        const fillButtons = [
          {
            color: "info",
            icon: Person,
            function: this.showbusiness.bind(
              this,
              appointment[0],
              appointment[3]
            )
          },
          {
            color: "success",
            icon: Edit,
            function: this.editAppointment.bind(this, appointment[1])
          },
          {
            color: "danger",
            icon: Close,
            function: this.deleteAppointment.bind(this, appointment[1])
          }
        ].map((prop, key) => {
          return (
            <Button
              color={prop.color}
              className={classes.actionButton}
              key={key}
              onClick={prop.function}
            >
              <prop.icon className={classes.icon} />
            </Button>
          );
        });
        appointment.push(fillButtons);
        //this.setState({tableContent : response});
        this.setState(prevState => ({
          tableContent: [
            ...prevState.tableContent,
            [
              appointment[2],
              appointment[3],
              appointment[4],
              appointment[5],
              appointment[6],
              appointment[7]
            ]
          ]
        }));
      });

      // -----------------------------
      // console.log(response.data.QueryRes);
      // response.data.QueryRes.map((appointment, i) => {
      // 	const fillButtons = [
      // 		{ color: 'info', icon: Person, function: this.showbusiness.bind(this, appointment.business_id) },
      // 		{ color: 'success', icon: Edit, function: this.editAppointment.bind(this, appointment._id) },
      // 		{ color: 'danger', icon: Close, function: this.deleteAppointment.bind(this, appointment._id) }
      // 	].map((prop, key) => {
      // 		return (
      // 			<Button color={prop.color} className={classes.actionButton} key={key} onClick={prop.function}>
      // 				<prop.icon className={classes.icon} />
      // 			</Button>
      // 		);
      // 	});
      // });
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
                <h4 className={classes.cardIconTitle}>
                  Upcomming Appointments
                </h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHead={[
                    "#",
                    "Business",
                    "Start Time",
                    "Date",
                    "Service Id",
                    "Actions"
                  ]}
                  tableData={this.state.tableContent}
                  customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                  ]}
                  customClassesForCells={[0, 4, 5]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                  ]}
                  customHeadClassesForCells={[0, 4, 5]}
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
const mapStateToProps = state => ({
  Id: state.auth.user.sub
});

Upcomming.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(
  withStyles(extendedTablesStyle, sweetAlertStyle, userProfileStyles)(Upcomming)
);
