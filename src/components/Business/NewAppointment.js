import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusinessById } from "../../actions/businessActions";
import isEmpty from "lodash/isEmpty";

import SetFStep from "./SetFStep";
import SetSecStep from "./SetSecStep";
import SetThirdStep from "./SetThirdStep";

import { convertToUtcTime } from "../../utils/date";
import axios from "axios";
import { API } from "../../consts";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
import { FaDivide } from "react-icons/fa";

class NewAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      pickedService: "NULL",
      date_from: "",
      date_until: "",
      services: [],
      onBusiness: { profile: { services: [] } },
      Dates: "",
      date: "",
      shour: "",
      sminute: "",
      ehour: "", //{free._start}
      eminute: "" //{free._end}
    };
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePickedService = this.handlePickedService.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (isEmpty(this.props.services)) {
      this.props.getBusinessById(id).then(result => {
        if (!result.payload.error) this.setState({ business: true });
        this.setState({ onBusiness: result.payload });
      });
    }
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  preSetAppointment = e => {
    console.log("here");
  };
  handlePickedService = e => {
    //	var pickedService = this.state.pickedService;
    console.log("pick Service handler called");
    this.setState({ pickedService: e.target.value });
  };
  setAppointment = e => {
    console.log("set appointment");
    const { step } = this.state;
    //request
    const shour = e.target.getAttribute("shour");
    const date = e.target.getAttribute("date");
    const sminute = e.target.getAttribute("sminute");
    const ehour = e.target.getAttribute("ehour");
    const eminute = e.target.getAttribute("emminute");
    console.log(shour, date, sminute, ehour, eminute);
    axios
      .post(`${API}/appointments/setAppointment/`, {
        businessId: this.state.onBusiness._id,
        costumerId: this.props.auth.user.sub,
        service: [this.state.pickedService],
        date: date,
        shour: shour, //need,
        sminute: sminute, //need,
        ehour: ehour,
        eminute: eminute
      })
      .then(response => {
        //	this.setState({ dates: response.data });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.setState({ step: step + 1 });
      });
  };
  getFreeTime = e => {
    const { step } = this.state;
    axios
      .post(`${API}/algorithms/freetime`, {
        business: this.state.onBusiness._id,
        services: [this.state.pickedService],
        date_from: this.state.date_from,
        date_until: this.state.date_until
      })
      .then(response => {
        this.setState({ dates: response.data });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.setState({ step: step + 1 });
      });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("set appointment");
  };

  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <SetFStep
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handlePickedService={this.handlePickedService}
            values={this.state}
          />
        );
      case 2:
        return (
          <SetSecStep
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            freeTime={this.getFreeTime}
            values={this.state}
          />
        );
      case 3:
        return (
          <SetThirdStep
            values={this.state}
            handleSubmit={this.handleSubmit}
            prevStep={this.prevStep}
            setAppointment={this.setAppointment}
            preSetAppointment={this.preSetAppointment}
          />
        );
      case 4:
        return <div>hey</div>;
    }
  }
}
NewAppointment.propTypes = {
  auth: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
  getBusinessById: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  business: state.business.business
});

export default connect(
  mapStatetoProps,
  { getBusinessById }
)(NewAppointment);
