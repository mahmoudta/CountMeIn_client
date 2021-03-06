import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { API } from "../../../consts";
import SweetAlert from "react-bootstrap-sweetalert";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { zeroPad } from "../../../utils/padding";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import Loading from "../../globalComponents/LoadingSmall";



// core components
import withStyles from '@material-ui/core/styles/withStyles';
//import grey from '@material-ui/core/colors/grey';
import { Grid } from '@material-ui/core';


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
import dashboardStyle from "../../Interface/Assets/dashboardStyle";
import Success from "../../Interface/Typography/Success"
import Warning from "../../Interface/Typography/Warning"
import Danger from "../../Interface/Typography/Danger"
import CustomDropdown from '../../Interface/CustomDropdown/CustomDropdown.jsx';


// icons
import Assignment from '@material-ui/icons/Assignment';
import Person from '@material-ui/icons/Person';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
//import { addListener } from "cluster";
//import Axios from 'axios';
// import Check from '@material-ui/icons/Check';
// import Remove from '@material-ui/icons/Remove';
// import Add from '@material-ui/icons/Add';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import isEmpty from 'lodash/isEmpty';


//const grey1 = grey['700'];

class Upcomming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      tableContent: [],
      alert: null,
      show: false,
      loading: false,
      Options: [],
      selectedOptions: [],
      Allowedtime: 0,
      FreeTimeAfter: 0,
      FreeTimeBefore: 0,
      twoButtons: true
    };
    //	this.handleToggle = this.handleToggle.bind(this);
    this.getSmart = this.getSmart.bind(this);

  }

  hideAlert() {
    //console.log("HideAlert")
    this.setState({
      alert: null
    });
  }


  showbusiness(id, name) {
    const { classes } = this.props;

    this.context.router.history.push(`/business/view/${id}`);
  }

  getSmart = async (e, appointment) => {
    const { business, setFlashMessage } = this.props;
    const timescope = await e.currentTarget.dataset.timescope

    const Services = this.state.selectedOptions.map(service => { return service.value })
    // console.log(
    //   "businessId",
    //   appointment[0],
    //   "servicesArr",
    //   Services,
    //   "customerId",
    //   this.props.Id,
    //   "timeScop",
    //   timescope
    // );

    axios
      .post(`${API}/algorithms/smart`, {
        businessId: appointment[0],
        servicesArr: Services,
        customerId: this.props.Id,
        timeScope: Number(timescope)
      })
      .then(response => {
        this.setState({ Smartdata: response.data });
        // console.log(this.state);
      })
      .then(() => {
        this.editAppointmentStep3();
      })
      .catch(err => {
        console.log(err);
        // this.props.setFlashMessage({
        //   type: "error",
        //   text: "Some error accured , Please try later",
        //   action: { next: "REDIRECT_TO_DASHBAORD" }
        // });
      });
  };

  editAppointment(appointment) {


    this.setState({
      alert: (
        <GridContainer>
          <SweetAlert
            style={{
              display: "block",
              marginTop: "-230px",
              paddingTop: " 30px",
              overflow: 'visible'
            }}
            title=""
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            confirmBtnText="Close"
          >
            <GridItem xs={12} sm={12} md={12}>
              <Loading></Loading>
            </GridItem>
          </SweetAlert>
        </GridContainer>
      )
    });

    appointment[6].map(service => {
      this.setState({ selectedOptions: [{ value: service._id, label: service.title, cost: service.cost, time: service.time }] }) //FIX

    })

    axios
      .get(`${API}/business/services/${appointment[0]}`)
      .then(response => {
        const Opt = response.data.ids.map(service => {
          return { label: service.title, value: service.id, time: service.time, cost: service.cost };
        })
        this.setState({ Options: Opt })
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {

        axios
          .get(`${API}/appointments/CheckEdit/${appointment[1]}`)
          .then(response => {
            const hoursBeforeTmp = Math.floor(response.data.FreeTimeBefore / 60);
            const minutesBeforeTmp = response.data.FreeTimeBefore % 60;

            this.setState({ Allowedtime: response.data.FreeTimeTotal, FreeTimeAfter: response.data.FreeTimeAfter, FreeTimeBefore: response.data.FreeTimeBefore, hoursBefore: hoursBeforeTmp, minutesBefore: minutesBeforeTmp, oldNeededTime: response.data.oldNeededTime })
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => { this.editAppointmentStep2(appointment) });
      });

  }
  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions }, () => { this.editAppointmentStep2(this.state.selectedAppointment) });
  }
  handleButtons = () => {
    this.setState({ twoButtons: false }, () => { this.editAppointmentStep2() });
  }

  editAppointmentStep2(appointment) {
    const { selectedOptions } = this.state;
    this.setState({ selectedAppointment: appointment });//here
    const { classes } = this.props
    var sumTime = 0;
    var sumCost = 0;
    var sumHours = 0;
    var sumMinutes = 0;
    const ChangeTime = <div><Button onClick={e => this.getSmart(e, appointment)} data-timescope={0} >Morning</Button> <Button data-timescope={1} onClick={e => this.getSmart(e, appointment)}>Afternoon</Button> <Button data-timescope={2} onClick={e => this.getSmart(e, appointment)}>Evening</Button></div>
    //const YesNo = (!this.state.twoButtons) ? <div><Button onClick={this.getSmart} timeScope={0} >Yes Rescudule</Button> <Button onClick={this.handleButtons()}>No,Show more</Button></div> : <div> {ChangeTime}</div>

    selectedOptions.map(selectd => {
      sumTime = sumTime + selectd.time;
      sumHours = Math.floor(sumTime / 60);
      sumMinutes = sumTime % 60;

      sumCost = sumCost + selectd.cost;
    })
    this.setState({
      alert: (
        <GridContainer>
          <SweetAlert
            style={{
              display: "block",
              marginTop: "-230px",
              paddingTop: " 30px",
              overflow: 'visible',
            }}
            title=""
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            showConfirm={false}
          // disableButtons
          //confirmBtnText="Cancel!"




          >

            <GridItem xs={12} sm={12} md={12} style={{
              minHeight: "200px",
            }}>
              <h3 className={`${classes.cardTitle} text-muted`}>Edit Appointment</h3>
              <div className={`col-12 my-3`}>

                {(sumTime < this.state.FreeTimeAfter) ?
                  <Grid container justify="center"><Success>Time Needed:{sumHours}:{sumMinutes}</Success> </Grid> :
                  (sumTime < this.state.Allowedtime) ?
                    <Grid container justify="center"> <Danger>Time Needed:{sumHours}:{sumMinutes}</Danger>
                      <Warning>We dont have enough time to serve these services ,<Success>fortunately you can rescudule {ChangeTime}
                      </Success></Warning> </Grid> :
                    <Warning>Unfortunately we dont have time , would yout like to rescudule?<br /> {ChangeTime} </Warning>}


                <label className="text-uppercase" htmlFor="purposes">
                  Modify Services
							<span className="form-required" />
                </label>
                <Select
                  options={this.state.Options}
                  value={selectedOptions}
                  isMulti
                  name="services"
                  components={makeAnimated()}
                  closeMenuOnSelect={false}
                  onChange={this.handleChange}
                />
                <br />
                Price : {sumCost} ₪<br />
                {(sumTime < this.state.FreeTimeAfter) ?
                  <Grid container justify="center"><Button onClick={(e) => this.UpdateAppointment(e)} color="success"> Update Appointment </Button></Grid> :
                  null}

              </div>
            </GridItem>
          </SweetAlert>
        </GridContainer>
      )
    });
  }
  setAppointment = e => {
    const Services = this.state.selectedOptions.map(service => {
      return service.value
    })
    const shour = e.currentTarget.getAttribute("shour");
    const date = e.currentTarget.getAttribute("date");
    const sminute = e.currentTarget.getAttribute("sminute");
    const ehour = e.currentTarget.getAttribute("ehour");
    const eminute = e.currentTarget.getAttribute("emminute");
    //console.log(shour, date, sminute, ehour, eminute, Services);
    axios
      .post(`${API}/appointments/setAppointmentAndDelete/`, {
        businessId: this.state.selectedAppointment[0],
        costumerId: this.props.Id,
        service: Services,
        date: date,
        shour: shour, //need,
        sminute: sminute, //need,
        ehour: ehour,
        eminute: eminute,
        appointmentId: this.state.selectedAppointment[1],
      })
      .then(() => {
        this.setState({
          alert: (
            <SweetAlert
              success
              style={{ display: 'block', marginTop: '-100px' }}
              title="Successfuly Updated"
              onConfirm={() => this.hideAlert()}
              onCancel={() => this.hideAlert()}
              confirmBtnCssClass={this.props.classes.button + ' ' + this.props.classes.success}
            >
              Your appointment has been updated, dont worry about the business we will notify them for you
      </SweetAlert>
          )
        })
      })
      .catch(err => {
        this.setState({
          alert: (
            <SweetAlert
              danger
              style={{ display: 'block', marginTop: '-100px' }}
              title="Error"
              onConfirm={() => this.hideAlert()}
              onCancel={() => this.hideAlert()}
              confirmBtnCssClass={this.props.classes.button + ' ' + this.props.classes.success}
            >
              Error occured
            </SweetAlert>
          )
        });
        console.log(err);
      });

  }


  UpdateAppointment = e => {
    var totalTime = null;
    const Services = this.state.selectedOptions.map(service => {
      totalTime = totalTime + service.time;
      return service.value
    })

    console.log("services", Services)
    if (totalTime) {
      axios
        .post(`${API}/appointments/updateAppointmentTime/`, {
          appointmentId: this.state.selectedAppointment[1],
          newServices: Services,
          duration: totalTime,
          businessId: this.state.selectedAppointment[0]
        })
        .then((response) => {
          this.setState({
            alert: (
              <SweetAlert
                success
                style={{ display: 'block', marginTop: '-100px' }}
                title="Successfuly Updated"
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnCssClass={this.props.classes.button + ' ' + this.props.classes.success}
              >
                Your appointment has been updated, dont worry about the business we will notify them for you
				</SweetAlert>
            )
          })
        })
        .catch(err => {
          this.setState({
            alert: (
              <SweetAlert
                danger
                style={{ display: 'block', marginTop: '-100px' }}
                title="Error"
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnCssClass={this.props.classes.button + ' ' + this.props.classes.success}
              >
                Error occured
              </SweetAlert>
            )
          });
          console.log(err);
        });
    }
  }


  editAppointmentStep3() {
    const { classes } = this.props;
    this.setState({
      alert: (
        <GridContainer>
          <SweetAlert
            style={{
              display: "block",
              marginTop: "-230px",
              paddingTop: " 30px",
              overflow: 'visible'
            }}
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            title=""
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            confirmBtnText="Cancel!"
          >
            <GridItem xs={12} sm={12} md={12}>
              <h3 className={`${classes.cardTitle} text-muted`}>What time fits you the best ?</h3>
              {this.state.Smartdata.smartData.map((smart, m) => {
                const Content = smart.Free.map((free, i) => {
                  return (
                    <Button
                      color="CMI"
                      simple
                      block
                      onClick={this.setAppointment}
                      date={smart.Date}
                      shour={free._start._hour}
                      sminute={free._start._minute}
                      ehour={free._end._hour}
                      emminute={free._end._minute}
                    >
                      {free._start._hour}:
                          {zeroPad(free._start._minute, 2)} {" - "}
                      {free._end._hour}:
                          {zeroPad(free._end._minute, 2)}
                    </Button>
                  );
                })
                return (
                  <CustomDropdown
                    key={m}
                    buttonText={(new Date(smart.Date) + " ").slice(0, 15)}
                    dropdownList={Content}
                    buttonProps={{
                      color: "success"
                    }}
                  />)
              })}
            </GridItem>
          </SweetAlert>
        </GridContainer>
      )
    });
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
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => { });


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
    this.setState({ loading: true })

    axios.get(`${API}/users/getUpcommingAppointments`).then((response) => {
      //console.log(response.data.QueryRes);
      // this.setState({ appointments: response.data.QueryRes });
      // this.setState({Appointments : dsa});

      // console.log('response upcomming', response.data);

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
            function: this.editAppointment.bind(this, appointment)
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

        const services = appointment[6].map(service => {
          return `${service.title}, `
        })

        //this.setState({tableContent : response});
        this.setState(prevState => ({
          tableContent: [
            ...prevState.tableContent,
            [
              appointment[2],
              <Link to={`/business/view/${appointment[0]}`}>
                {appointment[3]}
              </Link>,
              appointment[4],
              (new Date(appointment[5]) + " ").slice(0, 15),
              services,
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
    this.setState({ loading: false })
  }

  render() {
    //console.log('tableContent', this.state.tableContent);
    //console.log(this.props.Id);
    const { classes } = this.props;
    //console.log(this.state.tableContent);
    if (this.state.loading) {
      return <Loading></Loading>
    }

    return (
      <div>
        {this.state.alert}
        <GridContainer>
          <GridItem xs={12}>
            <Card >
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
                    "Time",
                    "Date",
                    "Services",
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
    )
  }
}

const mapStateToProps = state => ({
  Id: state.auth.user.sub
});

Upcomming.propTypes = {
  classes: PropTypes.object.isRequired,
};
Upcomming.contextTypes = {
  router: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(
  withStyles(
    (theme) => ({
      ...sweetAlertStyle,
      ...extendedTablesStyle,
      ...userProfileStyles,
      ...dashboardStyle
    })
  )(Upcomming)

);
