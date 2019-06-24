import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusinessById } from "../../../actions/businessActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { API } from "../../../consts";
import axios from "axios";

import SelectRange from "./SelectRange.jsx";
import SelectServices from "./SelectServices.jsx";
import SmartOutPut from "./SmartOutPut.jsx";
import GridContainer from "../../Interface/Grid/GridContainer"
import GridItem from "../../Interface/Grid/GridItem"
import Card from "../../Interface/Card/Card"
import CardHeader from "../../Interface/Card/CardBody"
import CardFooter from '../../Interface/Card/CardFooter';
import CardBody from '../../Interface/Card/CardBody';


class NewAppointmentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            Options: [],
            selectedOptions: [],

        };
        this.handleSelectChange = this.handleSelectChange.bind(this);

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
        const shour = e.target.getAttribute("shour");
        const date = e.target.getAttribute("date");
        const sminute = e.target.getAttribute("sminute");
        const ehour = e.target.getAttribute("ehour");
        const eminute = e.target.getAttribute("emminute");
        console.log(shour, date, sminute, ehour, eminute);
        axios
            .post(`${API}/appointments/setAppointment/`, {
                businessId: business._id,
                costumerId: this.props.auth.user.sub,
                service: this.state.selectedOptions,
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

    handleSelectChange = (selectedOptions) => {
        this.setState({ selectedOptions }, () => { console.log(this.state.selectedOptions) });
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
                this.setState({ step: 1 })
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

        return (<GridItem xs={12} sm={6} md={5} lg={5}> <Card> <CardHeader xs={12}>top </CardHeader> <CardBody>
            {(() => {
                switch (this.state.step) {
                    case 0:
                        return (<GridItem xs={12}>
                            <SelectServices values={this.state} handleSelectChange={this.handleSelectChange} />
                            <br />
                            <SelectRange getSmart={this.getSmart} />
                        </GridItem>)

                    case 1:
                        return (<GridItem xs={12}>
                            <SelectServices values={this.state} handleSelectChange={this.handleSelectChange} />
                            <br />
                            <SelectRange getSmart={this.getSmart} />
                            <br />
                            <SmartOutPut values={this.state} setAppointment={this.setAppointment} />
                        </GridItem>)
                    default:
                        return (<GridItem xs={12}>"Default"</GridItem>)
                }
            })()}
        </CardBody><CardFooter>bot</CardFooter></Card></GridItem>)
    }
}

NewAppointmentContainer.propTypes = {
    auth: PropTypes.object.isRequired,
    business: PropTypes.object.isRequired,
    getBusinessById: PropTypes.func.isRequired,
    setFlashMessage: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
    auth: state.auth,
    business: state.business.business
});

export default connect(
    mapStatetoProps,
    { getBusinessById, setFlashMessage }
)(NewAppointmentContainer);
