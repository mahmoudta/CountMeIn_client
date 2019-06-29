import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusinessById } from "../../../actions/businessActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { withStyles } from "@material-ui/core/styles";

import { API } from "../../../consts";
import axios from "axios";

import Success from "../../Interface/Typography/Success"

import SelectRange from "./SelectRange.jsx";
import SelectServices from "./SelectServices.jsx";
import SmartOutPut from "./SmartOutPut.jsx";
import GridContainer from "../../Interface/Grid/GridContainer"
import GridItem from "../../Interface/Grid/GridItem"
import Card from "../../Interface/Card/Card"
import CardHeader from "../../Interface/Card/CardBody"
import CardFooter from '../../Interface/Card/CardFooter';
import CardBody from '../../Interface/Card/CardBody';
import styles from '../../Interface/Assets/loginPageStyle';
import Warning from '../../Interface/Typography/Warning';
import { Grid } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';


class NewAppointmentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            Options: [],
            selectedOptions: [],

        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.setAppointment = this.setAppointment.bind(this);

    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.getBusinessById(id);

        const Opt = this.props.business.services.map(service => {
            return { label: service.service_id.title, value: service.service_id._id, time: service.time, cost: service.cost };
        })
        this.setState({ Options: Opt })


    }
    setAppointment = e => {
        const { business } = this.props;
        //request

        const Services = this.state.selectedOptions.map(service => {
            return service.value
        })


        console.log("here")
        const shour = e.currentTarget.getAttribute("shour");
        const date = e.currentTarget.getAttribute("date");
        const sminute = e.currentTarget.getAttribute("sminute");
        const ehour = e.currentTarget.getAttribute("ehour");
        const eminute = e.currentTarget.getAttribute("emminute");
        console.log(shour, date, sminute, ehour, eminute);
        axios
            .post(`${API}/appointments/setAppointment/`, {
                businessId: business._id,
                costumerId: this.props.auth.user.sub,
                service: Services,
                date: date,
                shour: shour, //need,
                sminute: sminute, //need,
                ehour: ehour,
                eminute: eminute
            })
            .then(response => {
                console.log(response);
            })
            .then(() => {
                this.props.setFlashMessage({
                    type: "success",
                    text: "Appointment is ready",
                    action: { next: "REDIRECT_TO_DASHBAORD" }
                });
            })
            .catch(err => {
                console.log(err);
                this.props.setFlashMessage({
                    type: "error",
                    text: "Some error accured , Please try later",
                    action: { next: "REDIRECT_TO_DASHBAORD" }
                });
            });
    };

    handleSelectChange = async (selectedOptions) => {
        await this.setState({ selectedOptions }, () => { this.StepManger() })

    }

    StepManger = async () => {
        if (isEmpty(this.state.selectedOptions)) {
            this.setState({ step: 0 })
        } else {
            this.setState({ step: 1 })
        }

    }

    getSmart = async (e) => {
        const { business } = this.props;
        const timescope = await e.currentTarget.dataset.timescope
        const Services = this.state.selectedOptions.map(service => { return service.value })

        console.log(
            "businessId",
            business._id,
            "servicesArr",
            Services,
            "customerId",
            this.props.auth.user.sub,
            "timeScop",
            timescope
        );

        axios
            .post(`${API}/algorithms/smart`, {
                businessId: business._id,
                servicesArr: Services,
                customerId: this.props.auth.user.sub,
                timeScope: Number(timescope)
            })
            .then(response => {
                this.setState({ Smartdata: response.data });
                console.log(this.state);
            })
            .then(() => {
                this.setState({ step: 2 })
            })
            .catch(err => {
                console.log(err);
                this.props.setFlashMessage({
                    type: "error",
                    text: "Some error accured , Please try later",
                    action: { next: "REDIRECT_TO_DASHBAORD" }
                });
            });

    };

    render() {
        const { classes } = this.props;
        return (<div className={classes.container}><GridContainer justify="center"><GridItem xs={12} sm={6} md={5} lg={5}> <Card> <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} ><h3 className={`${classes.cardTitle} text-muted`}>Set appointment</h3></CardHeader> <CardBody>
            {(() => {
                switch (this.state.step) {
                    case 0:
                        return (<GridItem xs={12}>
                            <Grid container direction="row" justify="center"><small className={"text-muted"}>Please choose services: (multiple options is available)</small></Grid>
                            <SelectServices values={this.state} handleSelectChange={this.handleSelectChange} />
                            <Grid container direction="row" justify="center"><Warning>the page will load as soon as u choose the service</Warning></Grid>
                        </GridItem>)
                    case 1:
                        return (<GridItem xs={12}>
                            <Grid container direction="row" justify="center"><small className={"text-muted"}>Please choose services: (you can still change it)</small></Grid>
                            <SelectServices values={this.state} handleSelectChange={this.handleSelectChange} />
                            <br />

                            <SelectRange getSmart={this.getSmart} />
                            <Grid container direction="row" justify="center"><Warning>Hint, There is no right answer, :)</Warning></Grid>

                        </GridItem>)

                    case 2:
                        return (<GridItem xs={12}>
                            <Grid container direction="row" justify="center"><small className={"text-muted"}>Please choose services: (you can still change it)</small></Grid>
                            <SelectServices values={this.state} handleSelectChange={this.handleSelectChange} />
                            <br />
                            <SelectRange getSmart={this.getSmart} />
                            <br />
                            <Grid container direction="row" justify="center"><small className={"text-muted"}><Success>Relax we did all the work,</Success></small></Grid><Grid container direction="row" justify="center"><small className={"text-muted"}>just click what time most comfortable for you</small></Grid>
                            <SmartOutPut values={this.state} setAppointment={this.setAppointment} />
                            <Grid container direction="row" justify="center"><Warning>You can always change the fields :)</Warning></Grid>
                        </GridItem>)
                    default:
                        return (<GridItem xs={12}>"Default"</GridItem>)
                }
            })()}
        </CardBody></Card></GridItem></GridContainer></div>)
    }
}

NewAppointmentContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    business: PropTypes.object.isRequired,
    getBusinessById: PropTypes.func.isRequired,
    setFlashMessage: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
    auth: state.auth,
    business: state.business.business,

});

export default connect(
    mapStatetoProps,
    { getBusinessById, setFlashMessage }
)(withStyles(styles)(NewAppointmentContainer));
